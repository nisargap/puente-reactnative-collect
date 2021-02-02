import { cacheAutofillData, cacheResidentData, customFormsQuery } from './read';
import { retrieveCurrentUserAsyncFunction } from '../../services/parse/auth';
import { getData, storeData } from '../async-storage';

export default function populateCache(user) {
  // communities called since we need a paramter, all data would be cached in the
  // cacheAutofillData function
  cacheAutofillData('Communities')
    .then(() => {

    })
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
            }
          });
      }
    })
    .then(() => {
      // store ID forms
      const queryParams = {
        skip: 0,
        offset: 0,
        limit: 100000,
        parseColumn: 'surveyingOrganization',
        parseParam: user.get('organization'),
      };
      cacheResidentData(queryParams);
    })
    .then(() => {
      customFormsQuery(user.get('organization'));
    });
}
