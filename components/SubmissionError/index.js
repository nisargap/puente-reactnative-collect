import React, { useEffect, useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { Snackbar } from 'react-native-paper';

import I18n from '../../modules/i18n';

const SubmissionError = ({ error, setError }) => {
  useEffect(() => {
    setVisible(error);
  }, [error]);

  const [visible, setVisible] = useState(false);

  const dismissSnackBar = () => {
    setVisible(false);
    setError(false);
  };

  return (
    <View>
      <Snackbar
        visible={visible}
        onDismiss={dismissSnackBar}
        duration={6000}
        style={{
          backgroundColor: 'red',
          fontSize: 130
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          {I18n.t('submissionError.error')}
        </Text>
      </Snackbar>
    </View>
  );
};

export default SubmissionError;
