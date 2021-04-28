import React, { useState } from 'react';
import {
  View
} from 'react-native';
import email from 'react-native-email';
import * as MailComposer from 'expo-mail-composer';
import {
  Button, Headline, Text, TextInput
} from 'react-native-paper';

import I18n from '../../../../../modules/i18n';
import styles from '../../../index.styles';

const Feedback = () => {
  const handleEmail = async () => {
    await MailComposer.isAvailableAsync().then((mailAvailable) => {
      if (mailAvailable) {
        MailComposer.composeAsync({
          recipients: ['info@puente-dr.org'],
          subject: 'User Feedback',
          body: emailBody
        })
      }
    })

    // const to = ['info@puente-dr.org']; // string or array of email addresses
    // email(to, {
    //   // Optional additional arguments
    //   cc: [], // string or array of email addresses
    //   bcc: [], // string or array of email addresses
    //   subject: 'User Feedback',
    //   body: emailBody
    // }).catch(console.error); // eslint-disable-line
  };

  const [emailBody, setEmailBody] = useState('');

  return (
    <View style={styles.mainContainer}>
      <Headline>{I18n.t('feedback.feedback')}</Headline>
      <View style={styles.horizontalLinePrimary} />
      <Text>{I18n.t('feedback.enterFeedback')}</Text>
      <View style={styles.horizontalLinePrimary} />
      <TextInput
        multiline
        onChangeText={(text) => setEmailBody(text)}
        placeholder={I18n.t('feedback.typeFeedback')}
      />
      <View style={styles.languageContainer}>
        <Button mode="contained" onPress={() => handleEmail()}>{I18n.t('feedback.sendMail')}</Button>
      </View>
    </View>
  );
};

export default Feedback;
