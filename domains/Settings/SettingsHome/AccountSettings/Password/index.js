import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Headline, IconButton, Text, TextInput } from 'react-native-paper';
import { getData, storeData } from '../../../../../modules/async-storage';
import { theme } from '../../../../../modules/theme'

import { Parse } from 'parse/react-native';
import I18n from '../../../../../modules/i18n';

export default Password = ({
  settingsView, setSettingsView, accountSettingsView, setAccountSettingsView
}) => {

  const [submitting, setSubmitting] = useState(false);
  const [currentState, setCurrentState] = useState('');
  const [newState, setNewState] = useState('');

  const wrongCredentials = () => {
    Alert.alert(
      I18n.t('global.error'),
      I18n.t('passwordSettings.wrongCreds'), [
      { text: 'OK' }
    ],
      { cancelable: true }
    );
  };

  const handleFailedAttempt = () => {
    Alert.alert(
      I18n.t('global.error'),
      I18n.t('passwordSettings.errorMessage'), [
      { text: 'OK' }
    ],
      { cancelable: true }
    );
  };

  const handleSucccessfullAttempt = () => {
    Alert.alert(
      I18n.t('global.success'),
      I18n.t('passwordSettings.successMessage'), [
      { text: 'OK' }
    ],
      { cancelable: true }
    );
  };

  const changePassword = async () => {
    console.log('1')
    setSubmitting(true);
    const credentials = await getData('credentials');

    if (currentState !== credentials.password) {
      setSubmitting(false);
      wrongCredentials();
    }
    else {
      const user = await Parse.User.logIn(credentials.username, credentials.password);
      user.set('password', newState);

      const submitAction = () => {
        setTimeout(() => {
          setSubmitting(false);
          handleSucccessfullAttempt();
        }, 1000);
      };

      await user.save().then(async () => {
        credentials['password'] = newState;
        await storeData(credentials, 'credentials').then(() => {
          submitAction();
        }, (error) => {
          console.log(error);
          setSubmitting(false);
          handleFailedAttempt();
        })
      }, (error) => {
        console.log(error);
        setSubmitting(false);
        handleFailedAttempt();
      })
    }
  }

  return (
    <View>
      <Headline>{I18n.t('passwordSettings.changePassword')}</Headline>
      <View style={styles.horizontalLinePrimary} />
      <View style={styles.lineContainer}>
        <Text style={styles.text}>{I18n.t('passwordSettings.currentPassword')}</Text>
        <TextInput mode='outlined' onChangeText={text => setCurrentState(text)}></TextInput>
      </View>
      <View style={styles.lineContainer}>
        <Text style={styles.text}>{I18n.t('passwordSettings.newPassword')}</Text>
        <TextInput mode='outlined' onChangeText={text => setNewState(text)}></TextInput>
      </View>
      {submitting ? (
        <ActivityIndicator
          size="large"
          color={theme.colors.primary}
        />
      ) : (
          <Button mode='contained' onPress={() => changePassword()}>{I18n.t('passwordSettings.newPassword')}</Button>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  textContainer: {
    flexDirection: 'row'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    flex: 1
  },
  lineContainer: {
    marginBottom: 30,
  },
  svg: {
    marginLeft: 'auto',
    marginTop: -3,
    marginBottom: -5
  },
  text: {
    flexShrink: 1,
    // fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginVertical: 7,
  },
  horizontalLineGray: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  horizontalLinePrimary: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  }
});