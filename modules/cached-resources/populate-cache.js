import Constants from 'expo-constants';

import { retrievAddUserPushToken, retrieveCurrentUserAsyncFunction } from '../../services/parse/auth';
import { getData, storeData } from '../async-storage';
import {
  assetDataQuery, assetFormsQuery, cacheAutofillData, cacheResidentData, customFormsQuery
} from './read';

export default function populateCache(user, expoToken) {
  // communities called since we need a paramter, all data would be cached in the
  // cacheAutofillData function
  cacheAutofillData('Communities')
    .then(async () => {
      const currentUserAsync = await getData('currentUser');
      const currentOrgAsync = await getData('organization');
      // store information after sign up/sign in
      if (user) {
        if (user !== currentUserAsync) {
          await storeData(user, 'currentUser');
        }
        if (user.get('organization') !== currentOrgAsync) {
          await storeData(user.get('organization'), 'organization');
        }
        if (user.get('expoPushToken') !== expoToken || user.get('expoPushToken') === undefined) {
          // add push token to user object
          const postParams = {
            userId: user.id,
            expoPushToken: expoToken
          };
          retrievAddUserPushToken(postParams).then(() => {
          }, () => {
            // error adding push token
          });
        }
      } else {
        // fail safe in case no user is passed in for some reason
        await retrieveCurrentUserAsyncFunction()
          .then(async (currentUser) => {
            if (currentUser !== null && currentUser !== undefined) {
              if (currentUser !== currentUserAsync) {
                await storeData(currentUser, 'currentUser');
              }
              if (currentUser.organization !== currentOrgAsync) {
                await storeData(currentUser.organization, 'organization');
              }
              if (currentUser.expoPushToken !== expoToken
                 || currentUser.expoPushToken === undefined) {
                // add push token to user object
                const postParams = {
                  userId: user.id,
                  expoPushToken: expoToken
                };
                retrievAddUserPushToken(postParams).then(() => {
                }, () => {
                  // error adding push token
                });
              }
            }
          });
      }
    })
    .then(async () => {
      const localLimit = await getData('findRecordsLimit');
      const limit = localLimit === null || localLimit === undefined ? 2000 : localLimit;

      // store ID forms
      const queryParams = {
        skip: 0,
        offset: 0,
        limit,
        parseColumn: 'surveyingOrganization',
        parseParam: user.get('organization'),
      };
      cacheResidentData(queryParams);
    })
    .then(async () => {
      await customFormsQuery(user.get('organization'));
    })
    .then(async () => {
      // store current app version
      const appVersion = Constants.manifest.version;
      await getData('appVersion').then(async (currentAppVersion) => {
        if (appVersion !== currentAppVersion && appVersion !== null && appVersion !== undefined) {
          await storeData(appVersion, 'appVersion');
        }
      });
    })
    .then(() => {
      // Asset data/Asset forms
      assetDataQuery(user.get('organization')).then(() => {
        assetFormsQuery(user.get('organization')).then(() => {
        }, () => {
          // error
        });
      }, () => {
        // error
      });
    });
}
