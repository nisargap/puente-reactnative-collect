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
import { cacheResidentData } from '../../../../../modules/cached-resources';
import { layout } from '../../../../../modules/theme';
import configArray from './config/config';

const OfflineData = ({ surveyingOrganization, scrollViewScroll, setScrollViewScroll }) => {
  const [inputs, setInputs] = useState({});
  //   const [loopsAdded, setLoopsAdded] = useState(0);

  useEffect(() => {
    setInputs(configArray);
    // console.log(this.data)
    // let communityList = []
    // customQueryService(0, 10000, 'SurveyData', 'surveyingOrganization', surveyingOrganization)
    // .then(async (forms) => {
    //     // await storeData(forms, 'assetData');

    //     JSON.parse(JSON.stringify(forms)).forEach(form => {
    //         if(!communityList.includes(form.communityname)){
    //             communityList.push(form.communityname)
    //         }
    //     });
    //     // console.log(communityList)
    //     // await storeData(forms, 'CommunitiesComplete')
    //   }, (error) => {
    //     reject(error);
    //   });

    // cacheAutofillData('Communities')
    // .then(async () => {
    //     const data = await getData('autofill_information');
    //     data['CommunitiesComplete'] = communityList;
    //     console.log("DATA: " + Object.keys(data));
    //     await storeData(data, 'autofill_information');
    //     let test = await getData('autofill_information')
    //     console.log("TEST: " + Object.keys(test))
    // });

    // communitiesComplete = communityList.concat(communities)
    // console.log("Complete: "+communitiesComplete)
  }, [configArray]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Formik
          initialValues={{}}
          onSubmit={async (values) => {
            const queryParams = {
              skip: 0,
              offset: 0,
              limit: 1000,
              parseColumn: 'communityname',
              parseParam: values,
            };
            cacheResidentData(queryParams);
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
            </View>
          )}
        </Formik>
      </TouchableWithoutFeedback>
    </View>
  );
};
export default OfflineData;
