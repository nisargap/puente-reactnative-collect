import { Platform } from 'react-native';

import surveyingUserFailsafe from '../../../domains/DataCollection/Forms/utils';
import { deleteData, getData } from '../../async-storage';
import { isEmpty } from '../../utils';
import checkOnlineStatus from '..';
import { uploadOfflineForms } from '../../../services/parse/crud';

const cleanupPostedOfflineForms = async () => {
  await deleteData('offlineIDForms');
  await deleteData('offlineSupForms');
  await deleteData('offlineAssetIDForms');
  await deleteData('offlineAssetSupForms');
  await deleteData('offlineHouseholds');
  await deleteData('offlineHouseholdsRelation');
};

const postOfflineForms = async () => {
  const user = await getData('currentUser');

  const surveyUser = await surveyingUserFailsafe(user, undefined, isEmpty);
  const { organization } = user;
  const appVersion = await getData('appVersion') || '';
  const phoneOS = Platform.OS || '';

  const idFormsAsync = await getData('offlineIDForms');
  const supplementaryFormsAsync = await getData('offlineSupForms');
  const assetIdFormsAsync = await getData('offlineAssetIDForms');
  const assetSupFormsAsync = await getData('offlineAssetSupForms');
  const householdsAsync = await getData('offlineHouseholds');
  const householdRelationsAsync = await getData('offlineHouseholdsRelation');

  const offlineForms = {
    surveyData: idFormsAsync,
    supForms: supplementaryFormsAsync,
    households: householdsAsync,
    householdRelations: householdRelationsAsync,
    assetIdForms: assetIdFormsAsync,
    assetSupForms: assetSupFormsAsync,
    surveyingUser: surveyUser,
    surveyingOrganization: organization,
    parseUser: user.objectId,
    appVersion,
    phoneOS
  };

  const isConnected = await checkOnlineStatus();

  if (isConnected) {
    const uploadedForms = await uploadOfflineForms(offlineForms)
    return {
      offlineForms,
      uploadedForms 
    }
  }
};

export { postOfflineForms }
