import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Headline, IconButton, Text, TextInput } from 'react-native-paper';
import { getData } from '../../../../modules/async-storage';
import { theme } from '../../../../modules/theme'

export default AccountSettings = ({
  settingsView, setSettingsView, accountSettingsView, setAccountSettingsView
}) => {

  useEffect(() => {
    async function setUserInformation() {
      const currentUser = await getData('currentUser');
      console.log(currentUser);
      setFirstName(currentUser['firstname'])
      setLastName(currentUser['lastname']);
      currentUser['phonenumber'] ? setPhoneNumber(currentUser['phonenumber']) : setPhoneNumber('N/A')
      currentUser['email'] ? setEmail(currentUser['email']) : setEmail('N/A');
    }
    setUserInformation();
  }, [])

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [edit, setEdit] = useState('');

  return (
    <View style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      {accountSettingsView === 'NamePhoneEmail' && (
        <View>
          <View>
            <Text style={styles.text}>First Name</Text>
            <View>
              {edit !== 'firstName' && (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>{firstName}</Text>
                  <Button style={{ marginLeft: 'auto' }} onPress={() => {
                    setEdit('firstName')
                  }}>Edit</Button>
                </View>
              )}
              {edit === 'firstName' && (
                <View>
                  <TextInput
                    placeholder={firstName}
                  ></TextInput>
                  <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
                    <IconButton
                      icon='check'
                      size={25}
                      color={theme.colors.primary}
                      style={{ marginLeft: 'auto', marginTop: -3, marginBottom: -5 }}
                      onPress={() => {
                        setEdit('');
                      }}
                    />
                    <IconButton
                      icon='window-close'
                      size={25}
                      color={theme.colors.primary}
                      style={{ marginLeft: 'auto', marginTop: -3, marginBottom: -5 }}
                      onPress={() => {
                        setEdit('')
                      }}
                    />
                  </View>
                </View>
              )}
            </View>
            <View style={styles.horizontalLineGray} />
          </View>
          <View>
            <Text style={styles.text}>Last Name</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{lastName}</Text>
              <Button style={{ marginLeft: 'auto' }} onPress={() => {
                setEdit('lastName')
              }}>Edit</Button>
            </View>
            <View style={styles.horizontalLineGray} />
          </View>
          <View>
            <Text style={styles.text}>Phone</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{phoneNumber}</Text>
              <Button style={{ marginLeft: 'auto' }}>Edit</Button>
            </View>
            <View style={styles.horizontalLineGray} />
          </View>
          <View>
            <Text style={styles.text}>Email</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>{email}</Text>
              <Button style={{ marginLeft: 'auto' }}>Edit</Button>
            </View>
            <View style={styles.horizontalLineGray} />
          </View>
        </View>
      )}
      {accountSettingsView === 'ChangePassword' && (
        <Text>Change password</Text>
      )}
      {accountSettingsView === 'FindRecords' && (
        <Text>Find records</Text>
      )}
      {accountSettingsView === 'Language' && (
        <Text>Language</Text>
      )}
      <Button onPress={() => {
        setAccountSettingsView('')
      }}>Back</Button>

    </View>
  )
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
  },
  horizontalLineGray: {
    borderBottomColor: '#D0D0D0',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  }
});