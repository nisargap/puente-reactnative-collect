import Constants from 'expo-constants';

import { retrieveCurrentUserAsyncFunction } from '../../services/parse/auth';
import { getData, storeData } from '../async-storage';
import {
  assetDataQuery, assetFormsQuery, cacheAutofillData, cacheResidentData, customFormsQuery
} from './read';

export default function populateCache(user) {
  const enteredUsrOrg = user.organization;
  cacheAutofillData(enteredUsrOrg)
    .then(async () => {
      const currentOrgAsync = await getData('currentUser').then((currentUser) => currentUser.organization);
      // store information after sign up/sign in
      if (user) {
        if (enteredUsrOrg !== currentOrgAsync) {
          await storeData(enteredUsrOrg, 'organization');
        }
      } else {
        // fail safe in case no user is passed in for some reason
        await retrieveCurrentUserAsyncFunction()
          .then(async (currentUser) => {
            if (currentUser !== null && currentUser !== undefined) {
              if (currentUser.organization !== currentOrgAsync) {
                await storeData(currentUser.organization, 'organization');
              }
            }
          });
      }
    })
    /** THIS NEEDS TO BE MODIFIED OR REMOVED */
    .then(async () => {
      const localLimit = await getData('findRecordsLimit');
      const limit = localLimit === null || localLimit === undefined ? 2000 : localLimit;

      // store ID forms
      const queryParams = {
        skip: 0,
        offset: 0,
        limit,
        parseColumn: 'surveyingOrganization',
        parseParam: enteredUsrOrg,
      };
      cacheResidentData(queryParams);
    })
    .then(async () => {
      await customFormsQuery(enteredUsrOrg);
    })
    .then(async () => {
      // store current app version
      const appVersion = Constants.manifest.version;
      await getData('appVersion').then(async (currentAppVersion) => {
        if (appVersion !== currentAppVersion && appVersion) {
          await storeData(appVersion, 'appVersion');
        }
      });
    })
    .then(() => {
      // Asset data/Asset forms
      assetDataQuery(enteredUsrOrg).then(() => {
        assetFormsQuery(enteredUsrOrg).then(() => {
        }, () => {
          // error
        });
      }, () => {
        // error
      });
    })
    .catch((error)=> console.log(error)); //eslint-disable-line
}
