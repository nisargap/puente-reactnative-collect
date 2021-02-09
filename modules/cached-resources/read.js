import { residentIDQuery, customQueryService } from '../../services/parse/crud';
import retrievePuenteAutofillData from '../../services/aws';
import checkOnlineStatus from '../offline';
import { getData, storeData } from '../async-storage';
import getTasks from '../../services/tasky';

async function residentQuery(queryParams) {
  let records = await residentIDQuery(queryParams);
  records = JSON.parse(JSON.stringify(records));
  return records;
}

async function cacheResidentData(queryParams) {
  const records = await residentQuery(queryParams);
  if (records !== null && records !== undefined && records !== '') {
    storeData(records, 'residentData');
  }
}

async function cacheAutofillData(parameter) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected) {
        retrievePuenteAutofillData('all').then((result) => {
          // cache organizations tied to all users
          customQueryService(0, 500, 'User', 'adminVerified', true).then((users) => {
            const orgsCapitalized = [];
            const orgResults = [];
            users.forEach((user) => {
              console.log(user.get("organization"))
              const org = user.get("organization")
              if (org !== null && org !== undefined && org !== '') {
                const orgCapitalized = org.toUpperCase().trim() || '';
                if (!orgsCapitalized.includes(orgCapitalized) && org !== '') {
                  orgsCapitalized.push(orgCapitalized);
                  orgResults.push(org);
                }
              }
            });
            const autofillData = result;
            autofillData["organization"] = orgResults;
            storeData(autofillData, 'autofill_information')
            resolve(autofillData[parameter]);
          }, () => {
            storeData(result, 'autofill_information');
            resolve(result[parameter]);
          })
        }, (error) => {
          reject(error);
        });
      } else {
        resolve(getData('autofill_information')[parameter]);
      }
    }, (error) => {
      reject(error);
    });
  });
}

function customFormsQuery(surveyingOrganization) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((online) => {
      if (online) {
        customQueryService(0, 5000, 'FormSpecificationsV2', 'organizations', surveyingOrganization).then(async (forms) => {
          if (forms !== null && forms !== undefined && forms !== '') {
            await storeData(forms, 'customForms');
            resolve(JSON.parse(JSON.stringify(forms)));
          } else {
            getData('customForms').then((customForms) => {
              resolve(customForms);
            }, (error) => {
              reject(error);
            });
          }
        }, (error) => {
          reject(error);
        });
      } else {
        getData('customForms').then((forms) => {
          resolve(forms);
        }, (error) => {
          reject(error);
        });
      }
    }, (error) => {
      reject(error);
    });
  });
}

function getTasksAsync() {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then(async (online) => {
      if (online) {
        await getTasks().then(async (result) => {
          await storeData(result, 'tasks');
          resolve(result);
        }, (error) => {
          reject(error);
        });
      } else {
        getData('tasks').then((tasks) => {
          resolve(tasks);
        }, (error) => {
          reject(error);
        });
      }
    }, (error) => {
      reject(error);
    });
  });
}

export {
  residentQuery,
  cacheResidentData,
  cacheAutofillData,
  customFormsQuery,
  getTasksAsync
};