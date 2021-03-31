import React, { useState } from 'react';
import {
  View
} from 'react-native';
import {
  Button, Headline, IconButton, Text
} from 'react-native-paper';

import styles from '../../../index.styles';

const WhatsNew = ({
  settingsView, setSettingsView, supportView, setSupportView
}) => (
    <View style={styles.mainContainer}>
      <Text>Whats new</Text>
    </View>
  );

export default WhatsNew;