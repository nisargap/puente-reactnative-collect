import React, { useState } from 'react';
import {
  Keyboard, ScrollView, TouchableWithoutFeedback, View, StyleSheet, Dimensions
} from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useEffect } from 'react/cjs/react.development';

import { countService } from '../../../services/parse/crud';
import { getData } from '../../../modules/async-storage';
import styles from '../index.styles';

const FormCounts = ({ setShowCounts }) => {

  const [surveyCount, setSurveyCount] = useState(0);
  const [envHealthCount, setEnvHealthCount] = useState(0)
  const [vitalsCount, setVitalsCount] = useState(0)
  const [customCount, setCustomCount] = useState(0);
  const [userName, setUserName] = useState(' ');



  useEffect(() => {
    getData('currentUser').then((user) => {
      const userName = `${user.firstname || ''} ${user.lastname || ''}`;
      setUserName(userName);
    })
  }, [])

  useEffect(() => {
    const postParamsSurvey = {
      ParseClass: 'SurveyData',
      parseColumn: 'surveyingUser',
      parseParam: userName
    };
    countService(postParamsSurvey).then((surveyCount) => {
      setSurveyCount(surveyCount);
    })
  }, [userName])

  useEffect(() => {
    const postParamsEnvHealth = {
      ParseClass: 'HistoryEnvironmentalHealth',
      parseColumn: 'surveyingUser',
      parseParam: userName
    }
    countService(postParamsEnvHealth).then((envHhealthCount) => {
      setEnvHealthCount(envHhealthCount);
    })
  }, [userName])

  useEffect(() => {
    const postParamsVitals = {
      ParseClass: 'Vitals',
      parseColumn: 'surveyingUser',
      parseParam: userName
    }
    countService(postParamsVitals).then((vitalsCount) => {
      setVitalsCount(vitalsCount);
    })
  }, [userName])

  useEffect(() => {
    const postParamsCustomForms = {
      ParseClass: 'FormResults',
      parseColumn: 'surveyingUser',
      parseParam: userName
    }
    countService(postParamsCustomForms).then((customCount) => {
      setCustomCount(customCount);
    })
  }, [userName])

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
  )
}

export default FormCounts;