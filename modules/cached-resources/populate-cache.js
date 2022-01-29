import Constants from 'expo-constants';

import { retrieveCurrentUserAsyncFunction } from '../../services/parse/auth';
import { getData, storeData } from '../async-storage';
import {
  assetDataQuery, assetFormsQuery, cacheAutofillData, customFormsQuery
} from './read';

const storeOrganization = async (user, enteredUsrOrg) => {
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
};

const storeAppVersion = async () => {
  const appVersion = Constants.manifest.version;
  await getData('appVersion').then(async (currentAppVersion) => {
    if (appVersion !== currentAppVersion && appVersion) {
      await storeData(appVersion, 'appVersion');
    }
  });
};

const populateCache = async (user) => {
  const enteredUsrOrg = user.organization;

  return Promise.all([
    cacheAutofillData(enteredUsrOrg),
    storeOrganization(user, enteredUsrOrg),
    customFormsQuery(enteredUsrOrg),
    storeAppVersion(),
    assetDataQuery(enteredUsrOrg).then(() => assetFormsQuery(enteredUsrOrg))
  ]);
};

export default populateCache;
