import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Headline, IconButton, Text, TextInput } from 'react-native-paper';
import { getData, storeData } from '../../../../modules/async-storage';
import { theme } from '../../../../modules/theme'

import { Parse } from 'parse/react-native';

import NamePhoneEmail from './NamePhoneEmail';
import Password from './Password';

export default AccountSettings = ({
  settingsView, setSettingsView, accountSettingsView, setAccountSettingsView
}) => {

  return (
    <View style={styles.mainContainer}>
      <View>
        {accountSettingsView === 'NamePhoneEmail' && (
          <NamePhoneEmail />
        )}
      </View>
      {
        accountSettingsView === 'ChangePassword' && (
          <Password />
        )
      }
      {
        accountSettingsView === 'FindRecords' && (
          <Text>Find records</Text>
        )
      }
      {
        accountSettingsView === 'Language' && (
          <Text>Language</Text>
        )
      }
      <Button onPress={() => {
        setAccountSettingsView('')
      }}>Back</Button>

    </View >
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
  }
});