import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';

import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import { postSupplementaryAssetForm } from '../../../../../modules/cached-resources';
import I18n from '../../../../../modules/i18n';
import { layout } from '../../../../../modules/theme';
import { addSelectTextInputs } from '../../../Forms/SupplementaryForm/utils';
import SelectedAsset from '../../ViewAssets/SelectedAsset';
import AssetFormSelect from './AssetFormSelect';
import styles from './index.styles';

const AssetSupplementary = ({ selectedAsset, surveyingOrganization }) => {
  const [viewSupplementaryForms, setViewSupplementaryForms] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [photoFile, setPhotoFile] = useState('State Photo String');
  return (
    <ScrollView vertical>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          setPhotoFile('Submitted Photo String');

          const formObject = values;

          const formObjectUpdated = addSelectTextInputs(values, formObject);

          const postParams = {
            parseParentClassID: selectedAsset.objectId,
            parseParentClass: 'Assets',
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
          };

          const submitAction = () => {
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
            setSelectedForm('');
          };

          postSupplementaryAssetForm(postParams)
            .then(() => {
              submitAction();
              setSelectedForm({});
            })
            .catch((e) => console.log(e)); //eslint-disable-line
        }}
      >
        {(formikProps) => (
          <View style={styles.assetContainer}>
            <View>
              <Button compact mode="contained" onPress={() => setViewSupplementaryForms(!viewSupplementaryForms)}>Show Available Asset Forms</Button>
              {viewSupplementaryForms === true
                && (
                  <AssetFormSelect
                    setViewSupplementaryForms={setViewSupplementaryForms}
                    setSelectedForm={setSelectedForm}
                  />
                )}
            </View>
            <View>
              {selectedAsset
                && (
                  <SelectedAsset
                    selectedMarker={selectedAsset}
                  />
                )}
            </View>
            <View>
              <View style={layout.formContainer}>
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
                  <Button
                    disabled={!selectedAsset?.objectId}
                    onPress={formikProps.handleSubmit}
                  >
                    {selectedAsset?.objectId && <Text>{I18n.t('global.submit')}</Text>}
                    {!selectedAsset?.objectId && <Text>{I18n.t('assetForms.attachForm')}</Text>}
                  </Button>
                )}
              </View>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};
export default AssetSupplementary;
