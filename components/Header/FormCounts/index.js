import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import {
  View
} from 'react-native';
import { Button, Text } from 'react-native-paper';

import { getData } from '../../../modules/async-storage';
import { countService } from '../../../services/parse/crud';
import styles from '../index.styles';

const FormCounts = ({ setShowCounts }) => {
  const [surveyCount, setSurveyCount] = useState(0);
  const [envHealthCount, setEnvHealthCount] = useState(0);
  const [vitalsCount, setVitalsCount] = useState(0);
  const [customCount, setCustomCount] = useState(0);
  const [userName, setUserName] = useState(' ');

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
    countService(postParamsSurvey).then((surveyCounts) => {
      setSurveyCount(surveyCounts);
    });
  }, [userName]);

  useEffect(() => {
    const postParamsEnvHealth = {
      ParseClass: 'HistoryEnvironmentalHealth',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    countService(postParamsEnvHealth).then((envHealthCounts) => {
      setEnvHealthCount(envHealthCounts);
    });
  }, [userName]);

  useEffect(() => {
    const postParamsVitals = {
      ParseClass: 'Vitals',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    countService(postParamsVitals).then((vitalsCounts) => {
      setVitalsCount(vitalsCounts);
    });
  }, [userName]);

  useEffect(() => {
    const postParamsCustomForms = {
      ParseClass: 'FormResults',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    countService(postParamsCustomForms).then((customCounts) => {
      setCustomCount(customCounts);
    });
  }, [userName]);

  return (
    <View>
      <Text style={styles.headerFormText}>Survey Collected</Text>
      <View style={styles.horizontalLineGray} />
      <View style={styles.countContainer}>
        <Text style={styles.label}>ID Forms</Text>
        <Text style={styles.count}>{surveyCount}</Text>
      </View>
      <View style={styles.horizontalLineGray} />
      <View style={styles.countContainer}>
        <Text style={styles.label}>Environmental Health</Text>
        <Text style={styles.count}>{envHealthCount}</Text>
      </View>
      <View style={styles.horizontalLineGray} />
      <View style={styles.countContainer}>
        <Text style={styles.label}>Vitals</Text>
        <Text style={styles.count}>{vitalsCount}</Text>
      </View>
      <View style={styles.horizontalLineGray} />
      <View style={styles.countContainer}>
        <Text style={styles.label}>Custom Forms</Text>
        <Text style={styles.count}>{customCount}</Text>
      </View>
      <View style={styles.horizontalLineGray} />
      <Button onPress={() => setShowCounts(false)}>Back</Button>
    </View>
  );
};

export default FormCounts;
