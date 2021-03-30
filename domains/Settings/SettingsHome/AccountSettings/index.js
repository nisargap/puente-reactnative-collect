import React from 'react';
import {
  View
} from 'react-native';
import {
  Button
} from 'react-native-paper';

import FindRecords from './FindRecords';
import Language from './Language';
import NamePhoneEmail from './NamePhoneEmail';
import Password from './Password';

import styles from '../../index.styles';

const AccountSettings = ({
  accountSettingsView, setAccountSettingsView
}) => (
    <View style={styles.mainContainer}>
      {accountSettingsView === 'NamePhoneEmail' && (
        <NamePhoneEmail />
      )}
      {accountSettingsView === 'ChangePassword' && (
        <Password />
      )
      }
      {accountSettingsView === 'FindRecords' && (
        <FindRecords />
      )
      }
      {accountSettingsView === 'Language' && (
        <Language />
      )
      }
      <Button onPress={() => {
        setAccountSettingsView('');
      }}
      >
        Back
    </Button>

    </View>
  );

export default AccountSettings;
