import { Formik } from 'formik';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  TouchableWithoutFeedback, View
} from 'react-native';

import PaperButton from '../../../../components/Button';
import ErrorPicker from '../../../../components/FormikFields/ErrorPicker';
import PaperInputPicker from '../../../../components/FormikFields/PaperInputPicker';
import yupValidationPicker from '../../../../components/FormikFields/YupValidation';
import PopupError from '../../../../components/PopupError';
import { getData } from '../../../../modules/async-storage';
import { postIdentificationForm } from '../../../../modules/cached-resources';
import { storeAppVersion } from '../../../../modules/cached-resources/populate-cache';
import I18n from '../../../../modules/i18n';
import { layout, theme } from '../../../../modules/theme';
import { isEmpty } from '../../../../modules/utils';
import surveyingUserFailsafe from '../utils';
import configArray from './config/config';

const IdentificationForm = ({
  scrollViewScroll, setScrollViewScroll,
  setSelectedForm, setSurveyee, surveyingUser, surveyingOrganization
}) => {
  useEffect(() => {
    setValidationSchema(yupValidationPicker(configArray));
  }, []);

  const [inputs, setInputs] = useState({});
  const [validationSchema, setValidationSchema] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  useEffect(() => {
    setInputs(configArray);
  }, [setInputs, configArray]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{}}
          onSubmit={async (values,) => {
            setSubmitting(true);
            const { photoFile } = values;

            const formObject = values;
            const user = await getData('currentUser');

            formObject.surveyingOrganization = surveyingOrganization || user.organization;
            formObject.surveyingUser = await surveyingUserFailsafe(user, surveyingUser, isEmpty);

            formObject.appVersion = await storeAppVersion() || '';
            formObject.phoneOS = Platform.OS || '';

            formObject.latitude = values.location?.latitude || 0;
            formObject.longitude = values.location?.longitude || 0;
            formObject.altitude = values.location?.altitude || 0;

            formObject.dob = `${values.Month || '00'}/${values.Day || '00'}/${values.Year || '0000'}`;

            formObject.searchIndex = [
              values.fname,
              values.lname,
              values.nickname,
              values.communityname
            ]
              .filter((result) => result)
              .map((result) => result.toLowerCase().trim());

            formObject.fullTextSearchIndex = formObject.searchIndex.join(' ');

            const valuesToPrune = ['Month', 'Day', 'Year', 'location', 'photoFile'];
            valuesToPrune.forEach((value) => {
              delete formObject[value];
            });

            const submitAction = () => {
              setTimeout(() => {
                setSelectedForm('');
                setSubmitting(false);
              }, 1000);
            };
            const postParams = {
              parseClass: 'SurveyData',
              parseUser: user.objectId,
              photoFile,
              localObject: formObject
            };
            postIdentificationForm(postParams).then((surveyee) => {
              setSurveyee(surveyee);
              submitAction();
            }, () => {
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
              {inputs.length && inputs.map((result) => (
                <View key={result.formikKey}>
                  <PaperInputPicker
                    data={result}
                    formikProps={formikProps}
                    surveyingOrganization={surveyingOrganization}
                    scrollViewScroll={scrollViewScroll}
                    setScrollViewScroll={setScrollViewScroll}
                    customForm={false}
                  />
                </View>
              ))}
              <ErrorPicker
                formikProps={formikProps}
                inputs={inputs}
              />
              {submitting ? (
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                />
              ) : (
                <PaperButton
                  onPress={formikProps.handleSubmit}
                  buttonText={_.isEmpty(formikProps.values) ? I18n.t('global.emptyForm') : I18n.t('global.submit')}
                  icon={_.isEmpty(formikProps.values) ? 'alert-octagon' : 'plus'}
                  style={{ backgroundColor: _.isEmpty(formikProps.values) ? 'red' : 'green' }}
                />
              )}
              <PopupError
                error={submissionError}
                setError={setSubmissionError}
                errorMessage="submissionError.error"
              />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default IdentificationForm;
