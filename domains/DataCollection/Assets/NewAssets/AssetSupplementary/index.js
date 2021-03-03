import { Formik } from 'formik';
import React, { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Headline, Text } from 'react-native-paper';

import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import { postSupplementaryForm } from '../../../../../modules/cached-resources';
import I18n from '../../../../../modules/i18n';
import { layout } from '../../../../../modules/theme';
import { addSelectTextInputs } from '../../../Forms/SupplementaryForm/utils';
import AssetFormSelect from './AssetFormSelect';
import styles from './index.styles';

const AssetSupplementary = ({ selectedAsset, surveyingOrganization }) => {
  const [viewSupplementaryForms, setViewSupplementaryForms] = useState(false);
  const [selectedForm, setSelectedForm] = useState();
  const [photoFile, setPhotoFile] = useState('State Photo String');
  return (
    <ScrollView>
      <Formik
        initialValues={{}}
        onSubmit={async (values, actions) => {
          setPhotoFile('Submitted Photo String');

          const formObject = values;
          // formObject.latitude = values.location?.latitude || 0;
          // formObject.longitude = values.location?.longitude || 0;
          // formObject.altitude = values.location?.altitude || 0;

          let formObjectUpdated = addSelectTextInputs(values, formObject);

          const fieldsArray = Object.entries(formObject).map((obj) => ({
            title: obj[0],
            answer: obj[1]
          }));

          formObjectUpdated = {
            title: selectedForm.name || '',
            description: selectedForm.description || '',
            formSpecificationsId: selectedForm.objectId,
            fields: fieldsArray,
            // surveyingUser: formObject.surveyingUser,
            surveyingOrganization,
          };

          const postParams = {
            parseParentClass: 'FormResults',
            parseClass: selectedForm.class,
            photoFile,
            localObject: formObjectUpdated,
            typeOfForm: 'Asset'

          };
          const submitAction = () => {
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
            setSelectedForm('');
          };

          postSupplementaryForm(postParams)
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
                && <Headline>{selectedAsset.Name}</Headline>}
            </View>
            <View>
              <View style={layout.formContainer}>
                {selectedForm?.fields.length && selectedForm.fields.map((result) => (
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
                    disabled={!selectedAsset?.id}
                    onPress={formikProps.handleSubmit}
                  >
                    {selectedAsset?.id && <Text>{I18n.t('global.submit')}</Text>}
                    {!selectedAsset?.id && <Text>{I18n.t('assetForms.attachForm')}</Text>}
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
