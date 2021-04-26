import React, { useState } from 'react';
import {
  View
} from 'react-native';

import SettingsHome from './SettingsHome';
import SupportHome from './SupportHome';

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
          <SupportHome
            settingsView={settingsView}
            setSettingsView={setSettingsView}
            setView={setView}
            prevView={prevView}
            logOut={logOut}
          />
        )}
      </View>
    </View>
  );
};

export default SettingsView;
