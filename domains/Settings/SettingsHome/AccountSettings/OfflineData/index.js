import { Formik } from 'formik';
import I18n from 'i18n-js';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  TouchableWithoutFeedback, View
} from 'react-native';

import PaperButton from '../../../../../components/Button';
import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import PopupSuccess from '../../../../../components/PopupSuccess';
import { OfflineContext } from '../../../../../context/offline.context';
import { deleteData, getData } from '../../../../../modules/async-storage';
import { cacheResidentDataMulti } from '../../../../../modules/cached-resources';
import { layout } from '../../../../../modules/theme';
import configArray from './config/config';

const OfflineData = ({ surveyingOrganization, scrollViewScroll, setScrollViewScroll }) => {
  const [inputs, setInputs] = useState({});
  const [cacheSuccess, setCacheSuccess] = useState(false);
  const [submittedForms, setSubmittedForms] = useState(0);
  const { populateResidentDataCache, isLoading } = useContext(OfflineContext);

  useEffect(() => {
    setInputs(configArray);
  }, [configArray]);

  const repopulateAllData = async () => populateResidentDataCache().then((records) => {
    setSubmittedForms(records.length);
    setCacheSuccess(true);
  });

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            await cacheResidentDataMulti(values.communityname);
            await getData('residentData').then((forms) => {
              setSubmittedForms(Object.keys(forms).length);
              setCacheSuccess(true);
            });
          }}
        >
          {(formikProps) => (
            <View style={layout.formContainer}>
              <PaperButton
                onPressEvent={repopulateAllData}
                buttonText="Populate all ID Forms"
                loading={!!isLoading}
                style={{ backgroundColor: 'blue' }}
              />
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
                disabled={!!_.isEmpty(formikProps.values)}
                icon={_.isEmpty(formikProps.values) ? 'alert-octagon' : 'plus'}
                style={{ backgroundColor: _.isEmpty(formikProps.values) ? '#FFDDDD' : 'green' }}
              />
              <PaperButton
                onPressEvent={() => deleteData('residentData')}
                buttonText="Clear Cached ID Forms"
                icon="delete"
                style={{ backgroundColor: 'red' }}
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
