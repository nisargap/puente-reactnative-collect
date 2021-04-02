import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import Feedback from './Feedback';

import styles from '../../index.styles';
import I18n from '../../../../modules/i18n';

const SupportSettings = ({
  settingsView, setSettingsView, supportView, setSupportView
}) => (
    <View style={styles.mainContainer}>
      {supportView === 'aboutUs' && (
        <AboutUs
        />
      )}
      {supportView === 'feedback' && (
        <Feedback />
      )}
      {supportView === 'rateApp' && (
        <RateOurApp />
      )}
      {supportView === 'whatsNew' && (
        <WhatsNew />
      )}
      <Button onPress={() => {
        setSupportView('');
      }}
      >{I18n.t('supportHome.back')}</Button>

    </View>
  );

export default SupportSettings;
