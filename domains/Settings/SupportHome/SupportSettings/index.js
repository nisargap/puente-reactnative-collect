import React from 'react';
import {
  View
} from 'react-native';
import {
  Button
} from 'react-native-paper';

import I18n from '../../../../modules/i18n';
import styles from '../../index.styles';
import Feedback from './Feedback';

const SupportSettings = ({
  supportView, setSupportView
}) => (
  <View style={styles.mainContainer}>

    {supportView === 'feedback' && (
    <Feedback />
    )}
    <Button onPress={() => {
      setSupportView('');
    }}
    >
      {I18n.t('supportHome.back')}
    </Button>

  </View>
);

export default SupportSettings;
