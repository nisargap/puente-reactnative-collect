import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, Text, TextInput
} from 'react-native-paper';

import email from 'react-native-email'

import styles from '../../../index.styles';

const Feedback = () => {
  const handleEmail = () => {
    const to = ['info@puente-dr.org'] // string or array of email addresses
    email(to, {
      // Optional additional arguments
      cc: [], // string or array of email addresses
      bcc: [], // string or array of email addresses
      subject: 'User Feedback',
      body: emailBody
    }).catch(console.error)
  }

  const [emailBody, setEmailBody] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Headline>Feedback</Headline>
      <View style={styles.horizontalLinePrimary} />
      <Text>Please enter your feedback in the input below and press the "Send Feedback" button. This will redirect you to your email where you can send your feedback.</Text>
      <View style={styles.horizontalLinePrimary} />
      <TextInput multiline={true} onChangeText={(text) => setEmailBody(text)}
        placeholder={"Type your feedback here..."}>

      </TextInput>
      <View style={styles.languageContainer}>
        <Button mode="contained" onPress={() => handleEmail()}>Send Mail</Button>
      </View>
    </View>
  )
};

export default Feedback;