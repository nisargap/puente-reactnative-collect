import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import AssetSearchbar from '../../../../../components/AssetSearchBar/index';
import PaperButton from '../../../../../components/Button';
import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import { getData } from '../../../../../modules/async-storage';
import { postSupplementaryAssetForm } from '../../../../../modules/cached-resources';
import I18n from '../../../../../modules/i18n';
import { isEmpty } from '../../../../../modules/utils';
import { addSelectTextInputs } from '../../../Forms/SupplementaryForm/utils';
import surveyingUserFailsafe from '../../../Forms/utils';
import SelectedAsset from '../../ViewAssets/SelectedAsset';
import AssetFormSelect from './AssetFormSelect';
import styles from './index.styles';

const AssetSupplementary = ({
  selectedAsset, setSelectedAsset, surveyingOrganization, surveyingUser
}) => {
  const [selectedForm, setSelectedForm] = useState();
  const [photoFile, setPhotoFile] = useState('State Photo String');

  return (
    <ScrollView>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          setPhotoFile('Submitted Photo String');

          const formObject = values;
          const user = await getData('currentUser');

          const surveyUserFailSafe = await surveyingUserFailsafe(user, surveyingUser, isEmpty);
          const appVersion = await getData('appVersion');

          const formObjectUpdated = addSelectTextInputs(values, formObject);

          const postParams = {
            parseParentClassID: selectedAsset.objectId,
            parseParentClass: 'Assets',
            parseUser: user.objectId,
            parseClass: 'FormAssetResults',
            photoFile,
            localObject: formObjectUpdated,
            typeOfForm: 'Asset'
          };

          const fieldsArray = Object.entries(formObject).map((obj) => ({
            title: obj[0],
            answer: obj[1]
          }));

          postParams.localObject = {
            title: selectedForm.name || '',
            description: selectedForm.description || '',
            formSpecificationsId: selectedForm.objectId,
            fields: fieldsArray,
            surveyingOrganization,
            surveyingUser: surveyUserFailSafe,
            appVersion
          };

          const submitAction = () => {
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
            setSelectedForm({});
          };

          postSupplementaryAssetForm(postParams)
            .then(() => {
              submitAction();
            })
            .then(() => actions.resetForm())
            .catch((e) => console.log(e)); //eslint-disable-line
        }}
      >
        {(formikProps) => (
          <TouchableWithoutFeedback>
            <View
              style={styles.assetContainer}
            >
              <AssetFormSelect
                setSelectedForm={setSelectedForm}
                surveyingOrganization={surveyingOrganization}
              />

              <AssetSearchbar
                selectedAsset={selectedAsset}
                setSelectedAsset={setSelectedAsset}
                surveyingOrganization={surveyingOrganization}
              />
              {Object.keys(selectedAsset).length !== 0 && (
              <SelectedAsset
                selectedMarker={selectedAsset}
              />
              )}
              <View>
                {selectedForm?.fields?.length && selectedForm.fields.map((result) => (
                  <View key={result.formikKey}>
                    <PaperInputPicker
                      data={result}
                      formikProps={formikProps}
                      customForm
                    />
                  </View>
                ))}
                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <PaperButton
                    style={{ backgroundColor: selectedForm?.objectId ? 'green' : 'red' }}
                    onPressEvent={() => formikProps.handleSubmit()}
                    icon={selectedForm?.objectId ? 'plus' : 'alert-octagon'}
                    buttonText={selectedForm?.objectId ? I18n.t('global.submit') : I18n.t('assetForms.attachForm')}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Formik>
    </ScrollView>
  );
};
export default AssetSupplementary;
