import { Spinner } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
  View
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import { getData } from '../../../modules/async-storage';
import { theme } from '../../../modules/theme';
import { countService } from '../../../services/parse/crud';
import styles from '../index.styles';

const FormCounts = ({ setShowCounts }) => {
  const [surveyCount, setSurveyCount] = useState(0);
  const [envHealthCount, setEnvHealthCount] = useState(0);
  const [vitalsCount, setVitalsCount] = useState(0);
  const [customCount, setCustomCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [userName, setUserName] = useState(' ');

  const [queryDone, setQueryDone] = useState(false);


  useEffect(() => {
    getData('currentUser').then((user) => {
      const username = `${user.firstname || ''} ${user.lastname || ''}`;
      setUserName(username);
    });
  }, []);

  useEffect(() => {
    const postParamsSurvey = {
      ParseClass: 'SurveyData',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    const postParamsEnvHealth = {
      ParseClass: 'HistoryEnvironmentalHealth',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    const postParamsVitals = {
      ParseClass: 'Vitals',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    const postParamsCustomForms = {
      ParseClass: 'FormResults',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    const postParamsAssets = {
      ParseClass: 'FormResults',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };

    const idPromise = countService(postParamsSurvey);
    const envHealthPromise = countService(postParamsEnvHealth);
    const vitalsPromise = countService(postParamsVitals);
    const customFormsPromise = countService(postParamsCustomForms);
    const assetPromise = countService(postParamsAssets);

    Promise.all([idPromise, envHealthPromise, vitalsPromise, customFormsPromise, assetPromise]).then((values) => {
      setSurveyCount(values[0]);
      setEnvHealthCount(values[1]);
      setVitalsCount(values[2]);
      setCustomCount(values[3]);
      setAssetCount(values[4])
      setQueryDone(true);
  })
}, [userName]);

  return (
    <View>
      <Text style={styles.headerFormText}>Surveys Collected</Text>
      <View style={styles.horizontalLineGray} />
      {queryDone ? (
        <View>
          <View style={styles.countContainer}>
            <Text style={styles.label}>ID Forms</Text>
            <Text style={styles.count}>{surveyCount}</Text>
          </View>
          <View style={styles.horizontalLineGray} />
          <View style={styles.countContainer}>
            <Text style={styles.label}>Environmental Health Forms</Text>
            <Text style={styles.count}>{envHealthCount}</Text>
          </View>
          <View style={styles.horizontalLineGray} />
          <View style={styles.countContainer}>
            <Text style={styles.label}>Vitals Forms</Text>
            <Text style={styles.count}>{vitalsCount}</Text>
          </View>
          <View style={styles.horizontalLineGray} />
          <View style={styles.countContainer}>
            <Text style={styles.label}>Custom Forms</Text>
            <Text style={styles.count}>{customCount}</Text>
          </View>
          <View style={styles.horizontalLineGray} />
          <View style={styles.countContainer}>
            <Text style={styles.label}>Asset Forms</Text>
            <Text style={styles.count}>{assetCount}</Text>
          </View>
          <View style={styles.horizontalLineGray} />
        </View>
      ) : (
        <Spinner color={theme.colors.primary} />
      )}
      <Button onPress={() => setShowCounts(false)}>Back</Button>
    </View>
  );
};

export default FormCounts;
