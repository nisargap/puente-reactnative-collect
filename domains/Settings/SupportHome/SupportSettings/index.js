import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import AboutUs from './AboutUs';
import Feedback from './Feedback';
import RateOurApp from './RateOurApp';
import WhatsNew from './WhatsNew';

import styles from '../../index.styles';

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
      >Back</Button>

    </View>
  );

export default SupportSettings;
