import * as React from 'react';
import {
  Text, View
} from 'react-native';

import Header from '../../impacto-design-system/Header';
import { layout } from '../../modules/theme';

export default function DataAnalysis() {
  return (
    <View style={layout.screenContainer}>
      <Header />
      <Text>Welcome to the data analysis page.</Text>
    </View>
  );
}
