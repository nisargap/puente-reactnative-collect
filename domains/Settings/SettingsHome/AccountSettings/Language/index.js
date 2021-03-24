import React, { useState, useEffect } from 'react';
import { Keyboard, TouchableWithoutFeedback, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Button, Headline, IconButton, Text, TextInput, RadioButton } from 'react-native-paper';
import { getData, storeData } from '../../../../../modules/async-storage';
import { theme } from '../../../../../modules/theme'

import { Parse } from 'parse/react-native';
import { Radio } from 'native-base';

import I18n from '../../../../../modules/i18n';


export default Language = ({
  settingsView, setSettingsView, accountSettingsView, setAccountSettingsView
}) => {
  useEffect(() => {
    async function setUserInformation() {
      const currentLocale = await getData('locale');
      setLanguage(currentLocale);
    }
    setUserInformation();
  }, [updated])

  const [language, setLanguage] = useState('');
  const [updated, setUpdated] = useState(false)

  const handleLanguage = async (lang) => {
    setLanguage(lang);
    await storeData(lang, 'locale')
    setUpdated(true);
    I18n.locale = lang;
  };

  return (
    <View>
      <Headline>{I18n.t('languageSettings.chooseLanguage')}</Headline>
      <View style={styles.buttonContainer}>
        {language === 'en' && (
          <Button mode="contained">{I18n.t('languagePicker.english')}</Button>
        )}
        {language !== 'en' && (
          <Button mode="outlined" onPress={() => { handleLanguage('en') }}>{I18n.t('languagePicker.english')}</Button>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {language === 'es' && (
          <Button mode="contained">{I18n.t('languagePicker.spanish')}</Button>
        )}
        {language !== 'es' && (
          <Button mode="outlined" onPress={() => { handleLanguage('es') }}>{I18n.t('languagePicker.spanish')}</Button>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 10
  }
});