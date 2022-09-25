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
    return postObjectsToClass(postParams).then((surveyee) => {
      const surveyeeSanitized = JSON.parse(JSON.stringify(surveyee));
      return surveyeeSanitized;
    }).catch((error) => error);
  }

  return getData('offlineIDForms').then(async (offlineIDForms) => {
    const offlineResidentIdForms = offlineIDForms;

    const idParams = postParams;
    const { localObject } = idParams;

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

const postSupplementaryForm = async (postParams) => {
  const isConnected = await checkOnlineStatus();

  if (isConnected && !postParams.parseParentClassID.includes('PatientID-')) {
    return postObjectsToClassWithRelation(postParams);
  }

  return getData('offlineSupForms').then(async (supForms) => {
    if (supForms) {
      const forms = supForms.concat(postParams);
      await storeData(forms, 'offlineSupForms');
      return postParams;
    }
    const supData = [postParams];
    await storeData(supData, 'offlineSupForms');
    return postParams;
  });
};

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

/**
 * Function to post household form. Used for creating a new household
 * @param {*} postParams
 * @returns Househould object
 */
const postHousehold = async (postParams) => {
  const isConnected = await checkOnlineStatus();

  if (isConnected) {
    return postObjectsToClass(postParams).then((result) => result.id).catch((error) => error);
  }

  return getData('offlineHouseholds').then(async (offlineHouseholds) => {
    const households = offlineHouseholds;
    const householdParams = postParams;

    const { localObject } = householdParams;
    localObject.objectId = `Household-${generateRandomID()}`;

    if (households) {
      const forms = households.concat(householdParams);
      await storeData(forms, 'offlineHouseholds');
      return localObject;
    }

    const householdData = [householdParams];
    await storeData(householdData, 'offlineHouseholds');
    return localObject;
  });
};

const postHouseholdWithRelation = async (postParams) => {
  const isConnected = await checkOnlineStatus();

  if (isConnected) {
    return postObjectsToClassWithRelation(postParams).then((result) => result.id).catch((er) => er);
  }

  return getData('offlineHouseholdsRelation').then(async (householdsRelation) => {
    const allOfflineHouseholdsWithRelationships = householdsRelation;
    const householdParams = postParams;
    const { localObject } = householdParams;
    localObject.objectId = `Household-${generateRandomID()}`;

    if (allOfflineHouseholdsWithRelationships) {
      const forms = allOfflineHouseholdsWithRelationships.concat(householdParams);
      await storeData(forms, 'offlineHouseholdsRelation');
      return localObject;
    }

    const householdData = [householdParams];
    await storeData(householdData, 'offlineHouseholdsRelation');
    return localObject;
  });
};

export {
  postAssetForm,
  postHousehold,
  postHouseholdWithRelation,
  postIdentificationForm,
  postSupplementaryAssetForm,
  postSupplementaryForm
};
