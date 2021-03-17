import ViewPager from '@react-native-community/viewpager';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import AssetCore from './AssetCore';
import AssetSupplementary from './AssetSupplementary';

const NewAsset = ({ selectedAsset, setSelectedAsset, surveyingOrganization }) => (
  <ViewPager style={styles.viewPager} initialPage={0}>
    <View key="1" style={styles.page}>
      <AssetCore
        setSelectedAsset={setSelectedAsset}
        selectedAsset={selectedAsset}
        surveyingOrganization={surveyingOrganization}
      />
    </View>
    <View key="2" style={styles.page}>
      <AssetSupplementary
        selectedAsset={selectedAsset}
        surveyingOrganization={surveyingOrganization}
      />
    </View>
  </ViewPager>
);

const styles = StyleSheet.create({
  viewPager: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.80,
    // height: 450,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default NewAsset;
