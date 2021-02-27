import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Headline, IconButton, Text } from 'react-native-paper';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { theme } from '../../modules/theme'

export default SettingsView = ({ setView, prevView, logOut }) => {

  const [settingsView, setSettingsView] = useState('Settings')
  return (
    <View>
      <View style={{ paddingTop: '7%' }}>
        {settingsView === 'Settings' && (
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
                  size='30'
                  color={theme.colors.primary}
                  style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Change Password</Text>
                <IconButton
                  icon='chevron-right'
                  size='30'
                  color={theme.colors.primary}
                  style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Find Records</Text>
                <IconButton
                  icon='chevron-right'
                  size='30'
                  color={theme.colors.primary}
                  style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>Language</Text>
                <IconButton
                  icon='chevron-right'
                  size='30'
                  color={theme.colors.primary}
                  style={{ marginLeft: 'auto', marginTop: -5, marginBottom: -10 }}
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
          </View>
        )}
        {settingsView === 'Support' && (
          <View style={{ flexDirection: 'row', marginLeft: 'auto', marginRight: 'auto' }}>
            <View style={{ paddingRight: '5%' }}>
              <Button onPress={() => setSettingsView('Settings')}>Settings</Button>
            </View>
            <View style={{ paddingLeft: '5%' }}>
              <Button mode="contained">Support</Button>
            </View>

          </View>
        )}
      </View>





      <Button onPress={() => {
        setView(prevView)
      }}>Back</Button>
      <Button onPress={logOut}>Logout</Button>
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