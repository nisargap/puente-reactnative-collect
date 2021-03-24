import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Headline, IconButton, Text } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { theme } from '../../../modules/theme'

import AccountSettings from './AccountSettings'
import I18n from '../../../modules/i18n';

export default SettingsHome = ({
  setView, prevView, logOut, settingsView, setSettingsView
}) => {

  const [accountSettingsView, setAccountSettingsView] = useState('');

  return (
    <View>
      {settingsView === 'Settings' && accountSettingsView === '' && (
        <View>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={{ paddingRight: '0%' }}>
              <Button mode="contained">{I18n.t('accountSettings.settings')}</Button>
            </View>
            {/* <View style={{ paddingLeft: '5%' }}>
              <Button onPress={() => setSettingsView('Support')}>{I18n.t('accountSettings.support')}</Button>
            </View> */}
          </View>
          <View style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: 20 }}>
            <Headline style={{ fontWeight: 'bold' }}>{I18n.t('accountSettings.accountSettings')}</Headline>
            <View style={styles.horizontalLineGray} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{I18n.t('accountSettings.namePhoneEmail')}</Text>
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
            <View style={styles.horizontalLineGray} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{I18n.t('accountSettings.changePassword')}</Text>
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
            <View style={styles.horizontalLineGray} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{I18n.t('accountSettings.findRecords')}</Text>
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
            <View style={styles.horizontalLineGray} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{I18n.t('accountSettings.language')}</Text>
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
            <View style={styles.horizontalLineGray} />
          </View>
          <Button onPress={() => {
            setView(prevView)
          }}>{I18n.t('accountSettings.back')}</Button>
          <Button mode="contained" onPress={logOut} style={{ marginTop: 20 }}>{I18n.t('accountSettings.logout')}</Button>
        </View>
      )}
      {accountSettingsView !== '' && (
        <View>
          <AccountSettings
            settingsView={settingsView}
            setSettingsView={setSettingsView}
            accountSettingsView={accountSettingsView}
            setAccountSettingsView={setAccountSettingsView}
          />
        </View>
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
  },
  horizontalLineGray: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});