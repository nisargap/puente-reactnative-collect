import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Headline, IconButton, Text } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { theme } from '../../modules/theme'

import SettingsHome from './SettingsHome';
import AccountSettings from './SettingsHome/AccountSettings'

export default SettingsView = ({ setView, prevView, logOut }) => {

  const [settingsView, setSettingsView] = useState('Settings')
  return (
    <View>
      <View style={{ paddingTop: '7%' }}>
        {settingsView === 'Settings' && (
          <SettingsHome
            setView={setView}
            prevView={prevView}
            logOut={logOut}
            settingsView={settingsView}
            setSettingsView={setSettingsView}
          />
        )}
        {settingsView === 'Support' && (
          <View>
            <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
              <View style={{ paddingRight: '5%' }}>
                <Button onPress={() => setSettingsView('Settings')}>Settings</Button>
              </View>
              <View style={{ paddingLeft: '5%' }}>
                <Button mode="contained">Support</Button>
              </View>
            </View>
            <Button onPress={() => {
              setView(prsevView)
            }}>Back</Button>
            <Button onPress={logOut}>Logout</Button>
          </View>
        )}
      </View>
    </View >
  );
}

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