import React from 'react';
import {
  StyleSheet, View
} from 'react-native';
import {
  Button
} from 'react-native-paper';

import FindRecords from './FindRecords';
import Language from './Language';
import NamePhoneEmail from './NamePhoneEmail';
import Password from './Password';

const AccountSettings = ({
  accountSettingsView, setAccountSettingsView
}) => (
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
        <FindRecords />
      )
    }
    {
      accountSettingsView === 'Language' && (
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

export default AccountSettings;
