import { Spinner } from 'native-base';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
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

  const [queriesDone, setQueriesDone] = useState(0);
  const [surveyDone, setSurveyDone] = useState(false);
  const [envHealthDone, setEnvHealthDone] = useState(false);
  const [vitalsDone, setVitalsDone] = useState(false);
  const [customDone, setCustomDone] = useState(false);
  const [assetDone, setAssetDone] = useState(false);

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

    // update all queries to ensure each is done, other useEffect used
    // to ensure all have completed before rendering
    countService(postParamsSurvey).then((surveyCounts) => {
      setSurveyCount(surveyCounts);
      setSurveyDone(true);
    });
    countService(postParamsEnvHealth).then((envHealthCounts) => {
      setEnvHealthCount(envHealthCounts);
      setEnvHealthDone(true);
    });
    countService(postParamsVitals).then((vitalsCounts) => {
      setVitalsCount(vitalsCounts);
      setVitalsDone(true);
    });
    countService(postParamsCustomForms).then((customCounts) => {
      setCustomCount(customCounts);
      setCustomDone(true);
    });
    countService(postParamsAssets).then((assetCounts) => {
      setAssetCount(assetCounts);
      setAssetDone(true);
    });
  }, [userName]);

  useEffect(() => {
    if (surveyDone === true && envHealthDone === true
      && vitalsDone === true && customDone === true
      && assetDone === true) {
      setQueriesDone(true);
    }
  }, [surveyDone, envHealthDone, vitalsDone, customDone, assetDone]);

  return (
    <View>
      <Text style={styles.headerFormText}>Surveys Collected</Text>
      <View style={styles.horizontalLineGray} />
      {queriesDone ? (
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
