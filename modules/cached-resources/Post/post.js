import { postObjectsToClass, postObjectsToClassWithRelation } from '../../../services/parse/crud';
import {
  getData,
  storeData
} from '../../async-storage';
import checkOnlineStatus from '../../offline';
import { generateRandomID } from '../../utils';

const postIdentificationForm = async (postParams) => {
  const isConnected = await checkOnlineStatus();
  if (isConnected) {
    postObjectsToClass(postParams).then((surveyee) => {
      const surveyeeSanitized = JSON.parse(JSON.stringify(surveyee));
      return surveyeeSanitized
    }).
    catch(()=>error);
  }

  return getData('offlineIDForms').then(async offlineIDForms => {
    const offlineResidentIdForms = offlineIDForms
    const idParams = postParams;
    const { localObject } = idParams
    
    localObject.objectId = `PatientID-${generateRandomID()}`;

    if (offlineResidentIdForms) {
      const forms = offlineResidentIdForms.concat(idParams);
      await storeData(forms, 'offlineIDForms');
      return localObject;
    } 

    const idData = [idParams];
    await storeData(idData, 'offlineIDForms');
    return localObject;
    
  });
};

/** ***********************************************
 * Function to post asset id form offline offline
 * @name postForms
 * @example
 * postAssetForm(postParam);
 *
 * @param {Object} postParam Object normally configirued for for Parse-server
 *
 *********************************************** */

function postAssetForm(postParams) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected) {
        postObjectsToClass(postParams).then((asset) => {
          const assetSanitized = JSON.parse(JSON.stringify(asset));
          resolve(assetSanitized);
        }, (error) => {
          reject(error);
        });
      } else {
        getData('offlineAssetIDForms').then(async (assetIdForms) => {
          const id = `AssetID-${generateRandomID()}`;
          const assetIdParams = postParams;
          assetIdParams.localObject.objectId = id;
          if (assetIdForms !== null || assetIdForms === []) {
            const forms = assetIdForms.concat(assetIdParams);
            await storeData(forms, 'offlineAssetIDForms');
            resolve(assetIdParams.localObject);
          } else {
            const idData = [assetIdParams];
            await storeData(idData, 'offlineAssetIDForms');
            resolve(assetIdParams.localObject);
          }
        });
      }
    });
  });
}

function postSupplementaryForm(postParams) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected && !postParams.parseParentClassID.includes('PatientID-')) {
        postObjectsToClassWithRelation(postParams).then(() => {
          resolve('success');
        }, (error) => {
          reject(error);
        });
      } else {
        getData('offlineSupForms').then(async (supForms) => {
          if (supForms !== null) {
            const forms = supForms.concat(postParams);
            await storeData(forms, 'offlineSupForms');
            resolve('success');
          } else {
            const supData = [postParams];
            await storeData(supData, 'offlineSupForms');
            resolve('success');
          }
        });
      }
    });
  });
}

/** ***********************************************
 * Function to post asset supplementary form offline
 * @name postForms
 * @example
 * postSupplementaryAssetForm(postParam);
 *
 * @param {Object} postParams Object normally configured for for Parse-Server Cloud Code
 *
 *********************************************** */
function postSupplementaryAssetForm(postParams) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected && !postParams.parseParentClassID.includes('AssetID-')) {
        postObjectsToClassWithRelation(postParams).then(() => {
          resolve('success');
        }, (error) => {
          reject(error);
        });
      } else {
        getData('offlineAssetSupForms').then(async (supForms) => {
          if (supForms !== null) {
            const forms = supForms.concat(postParams);
            await storeData(forms, 'offlineAssetSupForms');
            resolve('success');
          } else {
            const supData = [postParams];
            await storeData(supData, 'offlineAssetSupForms');
            resolve('success');
          }
        });
      }
    });
  });
}

function postHousehold(postParams) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected) {
        postObjectsToClass(postParams).then((result) => {
          resolve(result.id);
        }, (error) => {
          reject(error);
        });
      } else {
        getData('offlineHouseholds').then(async (households) => {
          const id = `Household-${generateRandomID()}`;
          const householdParams = postParams;
          householdParams.localObject.objectId = id;
          if (households !== null || households === []) {
            const forms = households.concat(householdParams);
            await storeData(forms, 'offlineHouseholds');
            resolve(id);
          } else {
            const householdData = [householdParams];
            // idData[id] = postParams;
            await storeData(householdData, 'offlineHouseholds');
            resolve(id);
          }
        });
      }
    });
  });
}

function postHouseholdWithRelation(postParams) {
  return new Promise((resolve, reject) => {
    checkOnlineStatus().then((connected) => {
      if (connected) {
        postObjectsToClassWithRelation(postParams).then((result) => {
          resolve(result.id);
        }, (error) => {
          reject(error);
        });
      } else {
        getData('offlineHouseholdsRelation').then(async (householdsRelation) => {
          const id = `Household-${generateRandomID()}`;
          const householdParams = postParams;
          householdParams.localObject.objectId = id;
          if (householdsRelation !== null || householdsRelation === []) {
            const forms = householdsRelation.concat(householdParams);
            await storeData(forms, 'offlineHouseholdsRelation');
            resolve(id);
          } else {
            const householdData = [householdParams];
            // idData[id] = postParams;
            await storeData(householdData, 'offlineHouseholdsRelation');
            resolve(id);
          }
        });
      }
    });
  });
}

export {
  postAssetForm,
  postHousehold,
  postHouseholdWithRelation,
  postIdentificationForm,
  postSupplementaryAssetForm,
  postSupplementaryForm
};
