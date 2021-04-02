import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, Text, TextInput
} from 'react-native-paper';

import email from 'react-native-email'

import styles from '../../../index.styles';
import I18n from '../../../../../modules/i18n';

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
      <Headline>{I18n.t('feedback.feedback')}</Headline>
      <View style={styles.horizontalLinePrimary} />
      <Text>{I18n.t('feedback.enterFeedback')}</Text>
      <View style={styles.horizontalLinePrimary} />
      <TextInput multiline={true} onChangeText={(text) => setEmailBody(text)}
        placeholder={I18n.t('feedback.typeFeedback')}>

      </TextInput>
      <View style={styles.languageContainer}>
        <Button mode="contained" onPress={() => handleEmail()}>{I18n.t('feedback.sendMail')}</Button>
      </View>
    </View>
  )
};

export default Feedback;