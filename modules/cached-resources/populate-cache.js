import Constants from 'expo-constants';

import { getData, storeData } from '../async-storage';
import {
  assetDataQuery, assetFormsQuery, cacheAutofillData, customFormsQuery
} from './read';

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
    customFormsQuery(enteredUsrOrg),
    storeAppVersion(),
    assetDataQuery(enteredUsrOrg).then(() => assetFormsQuery(enteredUsrOrg))
  ]);
};

export default populateCache;
