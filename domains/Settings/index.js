import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button
} from 'react-native-paper';

import SettingsHome from './SettingsHome';

const SettingsView = ({ setView, prevView, logOut }) => {
  const [settingsView, setSettingsView] = useState('Settings');
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
              setView(prevView);
            }}
            >
              Back
            </Button>
            <Button onPress={logOut}>Logout</Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default SettingsView;
