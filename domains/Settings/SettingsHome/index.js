import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Headline, IconButton, Text } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { theme } from '../../../modules/theme'

import AccountSettings from './AccountSettings'

export default SettingsHome = ({
  setView, prevView, logOut, settingsView, setSettingsView
}) => {

  const [accountSettingsView, setAccountSettingsView] = useState('');

  return (
    <View>
      {settingsView === 'Settings' && accountSettingsView === '' && (
        <View>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={{ paddingRight: '5%' }}>
              <Button mode="contained">Settings</Button>
            </View>
            <View style={{ paddingLeft: '5%' }}>
              <Button onPress={() => setSettingsView('Support')}>Support</Button>
            </View>
          </View>
          <View style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: 20 }}>
            <Headline style={{ fontWeight: 'bold' }}>Account Settings</Headline>
            <View
              style={{
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Name, Phone, Email</Text>
              <IconButton
                icon='chevron-right'
                size={30}
                color={theme.colors.primary}
                style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                onPress={() => {
                  setAccountSettingsView('NamePhoneEmail')
                }}
              />
            </View>
            <View
              style={{
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Change Password</Text>
              <IconButton
                icon='chevron-right'
                size={30}
                color={theme.colors.primary}
                style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                onPress={() => {
                  setAccountSettingsView('ChangePassword')
                }}
              />
            </View>
            <View
              style={{
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Find Records</Text>
              <IconButton
                icon='chevron-right'
                size={30}
                color={theme.colors.primary}
                style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                onPress={() => {
                  setAccountSettingsView('FindRecords')
                }}
              />
            </View>
            <View
              style={{
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Language</Text>
              <IconButton
                icon='chevron-right'
                size={30}
                color={theme.colors.primary}
                style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                onPress={() => {
                  setAccountSettingsView('Language')
                }}
              />
            </View>
            <View
              style={{
                borderBottomColor: '#D0D0D0',
                borderBottomWidth: 1,
                marginTop: 10,
                marginBottom: 10,
              }}
            />
          </View>
          <Button onPress={() => {
            setView(prevView)
          }}>Back</Button>
          <Button onPress={logOut}>Logout</Button>
        </View>
      )}
      {accountSettingsView !== '' && (
        <AccountSettings
          settingsView={settingsView}
          setSettingsView={setSettingsView}
          accountSettingsView={accountSettingsView}
          setAccountSettingsView={setAccountSettingsView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardSmallStyle: {
    height: 110,
    width: 150,
    marginHorizontal: 7,
    marginVertical: 7,
  },
  svg: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardContainer: {
    alignItems: 'center',
    marginHorizontal: 14,
    marginVertical: 14,
  },
  textContainer: {
    flexDirection: 'row'
  },
  text: {
    flexShrink: 1,
    // fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
    marginVertical: 7,
  }
});