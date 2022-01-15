import React, { useEffect, useState } from 'react';
import {
    TouchableWithoutFeedback, View, Keyboard
} from 'react-native';
import { getData, storeData } from '../../../../../modules/async-storage';
import { layout, theme } from '../../../../../modules/theme';
import PaperInputPicker from '../../../../../components/FormikFields/PaperInputPicker';
import { Formik } from 'formik';
import configArray from './config/config';
import { customQueryService } from '../../../../../services/parse/crud';
import { cacheAutofillData } from '../../../../../modules/cached-resources';

const OfflineData = ({surveyingOrganization, scrollViewScroll, setScrollViewScroll}) => {
    const [inputs, setInputs] = useState({});
    const [loopsAdded, setLoopsAdded] = useState(0);

    useEffect(() => {
        setInputs(configArray);
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

    return(
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Formik
                    initialValues={{}}
                    // onSubmit={
                    //     console.log("I submitted")
                    // }
                    // // only validate on submit, errors persist after fixing
                    // validateOnBlur={false}
                    // validateOnChange={false}
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
            </View>
          )}
                </Formik>
            </TouchableWithoutFeedback>
        </ View>
    );
};
export default OfflineData