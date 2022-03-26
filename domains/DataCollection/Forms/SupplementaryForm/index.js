// Make this render but switch between forms
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  View
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import ErrorPicker from '../../../../components/FormikFields/ErrorPicker';
import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';
import yupValidationPicker from '../../../../components/FormikFields/YupValidation';
import PopupError from '../../../../components/PopupError';
import { getData } from '../../../../modules/async-storage';
import { postSupplementaryForm } from '../../../../modules/cached-resources';
import I18n from '../../../../modules/i18n';
import { layout, theme } from '../../../../modules/theme';
import { isEmpty } from '../../../../modules/utils';
import surveyingUserFailsafe from '../utils';
import envConfig from './configs/envhealth.config';
import medConfig from './configs/medical-evaluation.config';
import vitalsConfig from './configs/vitals.config';
import { addSelectTextInputs, cleanLoopSubmissions, vitalsBloodPressue } from './utils';

const SupplementaryForm = ({
  navigation, selectedForm, setSelectedForm, surveyee, surveyingUser, surveyingOrganization,
  customForm
}) => {
  const [config, setConfig] = useState({});
  const [photoFile, setPhotoFile] = useState('State Photo String');
  const [validationSchema, setValidationSchema] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [loopsAdded, setLoopsAdded] = useState(0);
  const [submissionError, setSubmissionError] = useState(false);

  const toRoot = () => {
    navigation.navigate('Root');
    setSelectedForm('');
  };

  useEffect(() => {
    if (selectedForm === 'env') {
      setConfig(envConfig);
      setValidationSchema(yupValidationPicker(envConfig.fields));
    }
    if (selectedForm === 'med-eval') {
      setConfig(medConfig);
      setValidationSchema(yupValidationPicker(medConfig.fields));
    }
    if (selectedForm === 'vitals') {
      setConfig(vitalsConfig);
    }
    if (selectedForm === 'custom') {
      setConfig(customForm);
    }
  }, [selectedForm, config]);

  return (
    <Formik
      initialValues={{}}
      onSubmit={async (values) => {
        setSubmitting(true);
        setPhotoFile('Submitted Photo String');

        const formObject = values;
        const user = await getData('currentUser');

        formObject.surveyingUser = await surveyingUserFailsafe(user, surveyingUser, isEmpty);
        formObject.surveyingOrganization = surveyingOrganization || user.organization;
        formObject.appVersion = await getData('appVersion') || '';
        formObject.phoneOS = Platform.OS || '';

        let formObjectUpdated = addSelectTextInputs(values, formObject);
        if (selectedForm === 'vitals') {
          formObjectUpdated = vitalsBloodPressue(values, formObjectUpdated);
        }

        // clean looped form questions
        formObjectUpdated = cleanLoopSubmissions(values, formObjectUpdated);

        const postParams = {
          parseParentClassID: surveyee.objectId,
          parseParentClass: 'SurveyData',
          parseUser: user.objectId,
          parseClass: config.class,
          photoFile,
          localObject: formObjectUpdated,
          loop: loopsAdded !== 0
        };

        if (selectedForm === 'custom') {
          postParams.parseClass = 'FormResults';

          const fieldsArray = Object.entries(formObjectUpdated).map((obj) => ({
            title: obj[0],
            answer: obj[1]
          }));

          postParams.localObject = {
            title: customForm.name || '',
            description: customForm.description || '',
            formSpecificationsId: customForm.objectId,
            fields: fieldsArray,
            surveyingUser: formObject.surveyingUser,
            surveyingOrganization: formObject.surveyingOrganization
          };
        }

        const submitAction = () => {
          setTimeout(() => {
            setSubmitting(false);
            toRoot();
          }, 1000);
        };

        postSupplementaryForm(postParams).then(() => {
          submitAction();
        }, (error) => {
          console.log(error); // eslint-disable-line
          // perhaps an alert to let the user know there was an error
          setSubmitting(false);
          setSubmissionError(true);
        });
      }}
      validationSchema={validationSchema}
      // only validate on submit, errors persist after fixing
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(formikProps) => (
        <View style={layout.formContainer}>
          {config.fields && config.fields.map((result) => (
            <View key={result.formikKey}>
              <PaperInputPicker
                data={result}
                formikProps={formikProps}
                customForm={config.customForm}
                config={config}
                loopsAdded={loopsAdded}
                setLoopsAdded={setLoopsAdded}
              />
            </View>
          ))}

          <ErrorPicker
            // data={result}
            formikProps={formikProps}
            inputs={config.fields}
          />

          {submitting ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
            />
          ) : (
            <Button
              disabled={!surveyee.objectId}
              onPress={formikProps.handleSubmit}
            >
              {surveyee.objectId && <Text>{I18n.t('global.submit')}</Text>}
              {!surveyee.objectId && <Text>{I18n.t('supplementaryForms.attachResident')}</Text>}
            </Button>
          )}
          <PopupError
            error={submissionError}
            setError={setSubmissionError}
            errorMessage="submissionError.error"
          />
        </View>
      )}
    </Formik>
  );
};

export default SupplementaryForm;
