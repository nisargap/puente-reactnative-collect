import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import I18n from '../../../modules/i18n';
import { theme } from '../../../modules/theme';
import AccountSettings from './AccountSettings';

import styles from '../index.styles';

const SettingsHome = ({
  setView, prevView, logOut, settingsView, setSettingsView
}) => {
  const [accountSettingsView, setAccountSettingsView] = useState('');
  const inputs = [
    {
      key: 'NamePhoneEmail',
      label: I18n.t('accountSettings.namePhoneEmail')
    },
    {
      key: 'ChangePassword',
      label: I18n.t('accountSettings.changePassword')
    },
    {
      key: 'FindRecords',
      label: I18n.t('accountSettings.findRecords')
    },
    {
      key: 'Language',
      label: I18n.t('accountSettings.language')
    }
  ];

  return (
    <View>
      {settingsView === 'Settings' && accountSettingsView === '' && (
        <View>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={{ paddingRight: '0%' }}>
              <Button mode="contained">{I18n.t('accountSettings.settings')}</Button>
            </View>
            {/* <View style={{ paddingLeft: '5%' }}>
              <Button onPress={() => setSettingsView('Support')}>
                {I18n.t('accountSettings.support')}</Button>
            </View> */}
          </View>
          <View style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: 20 }}>
            <Headline style={{ fontWeight: 'bold' }}>{I18n.t('accountSettings.accountSettings')}</Headline>
            <View style={styles.horizontalLineGray} />
            {inputs.length && inputs.map((input) => (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>{input.label}</Text>
                  <IconButton
                    icon="chevron-right"
                    size={30}
                    color={theme.colors.primary}
                    style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                    onPress={() => {
                      setAccountSettingsView(input.key);
                    }}
                  />
                </View>
                <View style={styles.horizontalLineGray} />
              </View>
            ))}
          </View>
          <Button onPress={() => {
            setView(prevView);
          }}
          >
            {I18n.t('accountSettings.back')}
          </Button>
          <Button mode="contained" onPress={logOut} style={{ marginTop: 20, marginLeft: '5%', marginRight: '5%' }}>{I18n.t('accountSettings.logout')}</Button>
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

export default SettingsHome;
