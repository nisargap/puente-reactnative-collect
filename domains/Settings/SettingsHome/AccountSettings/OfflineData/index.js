import { Formik } from 'formik';
import I18n from 'i18n-js';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback, View
} from 'react-native';

import PaperButton from '../../../../../components/Button';
import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import PopupSuccess from '../../../../../components/PopupSuccess';
import { deleteData, getData } from '../../../../../modules/async-storage';
import { cacheResidentData } from '../../../../../modules/cached-resources';
import { layout } from '../../../../../modules/theme';
import configArray from './config/config';

const OfflineData = ({ surveyingOrganization, scrollViewScroll, setScrollViewScroll }) => {
  const [inputs, setInputs] = useState({});
  const [cacheSuccess, setCacheSuccess] = useState(false);
  const [submittedForms, setSubmittedForms] = useState(0);

  useEffect(() => {
    setInputs(configArray);
  }, [configArray]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            //   console.log(values)
            const queryParams = {
              skip: 0,
              offset: 0,
              limit: 2000,
              parseColumn: 'communityname',
              parseParam: values.communityname,
            };
            cacheResidentData(queryParams);
            await getData('residentData').then((forms) => {
              setSubmittedForms(Object.keys(forms).length);
            //    let keys = []
            //    keys = Object.keys(forms)
            //    console.log("KEYS length: " + Object.keys(forms).length)
            });

            setCacheSuccess(true);
          }}
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
              <PaperButton
                onPressEvent={formikProps.handleSubmit}
                buttonText={_.isEmpty(formikProps.values) ? I18n.t('global.emptyForm') : I18n.t('global.submit')}
                icon={_.isEmpty(formikProps.values) ? 'alert-octagon' : 'plus'}
                style={{ backgroundColor: _.isEmpty(formikProps.values) ? 'red' : 'green' }}
              />
              <PaperButton
                onPressEvent={() => {
                  deleteData('residentData');
                }}
                buttonText="Clear Cached Forms"
                icon="delete"
                style={{ backgroundColor: 'gray' }}
              />
              <PopupSuccess
                success={cacheSuccess}
                setSuccess={setCacheSuccess}
                submittedForms={submittedForms}
              />
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default OfflineData;
