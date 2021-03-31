import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import SupportSettings from './SupportSettings';
import I18n from '../../../modules/i18n';
import { theme } from '../../../modules/theme';

import styles from '../index.styles'

const SupportHome = ({
  setView, prevView, logOut, settingsView, setSettingsView
}) => {
  const [supportView, setSupportView] = useState('');

  const inputs = [
    {
      key: 'whatsNew',
      label: 'What\'s New?',
      button: true
    },
    {
      key: 'aboutUs',
      label: 'About us',
      button: true
    },
    {
      key: 'feedback',
      label: 'Contact us / Feedback?',
      button: true
    },
    {
      key: 'rateApp',
      label: 'Rate our app',
      button: false
    }
  ];
  return (
    <View>
      {settingsView === 'Support' && supportView === '' && (
        <View>
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={{ paddingRight: '5%' }}>
              <Button onPress={() => setSettingsView('Settings')}>{I18n.t('accountSettings.settings')}</Button>
            </View>
            <View style={{ paddingLeft: '5%' }}>
              <Button mode="contained">
                {I18n.t('accountSettings.support')}
              </Button>
            </View>
          </View>
          <View style={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: 20 }}>
            <Headline style={{ fontWeight: 'bold' }}>Help Center</Headline>
            <View style={styles.horizontalLineGray} />
            {inputs.length > 0 && inputs.map((input) => (
              <View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>{input.label}</Text>
                  {input.button && (
                    <IconButton
                      icon="chevron-right"
                      size={30}
                      color={theme.colors.primary}
                      style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
                      onPress={() => {
                        setSupportView(input.key);
                      }}
                    />
                  )}
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
      {supportView !== '' && (
        <View>
          <SupportSettings
            settingsView={settingsView}
            setSettingsView={setSettingsView}
            supportView={supportView}
            setSupportView={setSupportView}
          />
        </View>
      )}
    </View>
  );
};

export default SupportHome;
