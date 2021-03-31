import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import styles from '../../../index.styles';

const RateOurApp = ({
  settingsView, setSettingsView, supportView, setSupportView
}) => (
    <View style={styles.mainContainer}>
      <Text>Rate our app</Text>

    </View>
  );

export default RateOurApp;