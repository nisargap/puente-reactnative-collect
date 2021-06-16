import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import PagerView from 'react-native-pager-view';

import AssetCore from './AssetCore';
import AssetSupplementary from './AssetSupplementary';

const NewAsset = ({
  selectedAsset, setSelectedAsset, surveyingOrganization, assetPageIndex,
  surveyingUser
}) => (
  <View>
    <PagerView style={styles.viewPager} initialPage={assetPageIndex}>
      <View key="1" style={styles.page}>
        <AssetCore
          setSelectedAsset={setSelectedAsset}
          selectedAsset={selectedAsset}
          surveyingOrganization={surveyingOrganization}
          surveyingUser={surveyingUser}
        />
      </View>
      <View key="2" style={styles.page}>
        <AssetSupplementary
          setSelectedAsset={setSelectedAsset}
          selectedAsset={selectedAsset}
          surveyingOrganization={surveyingOrganization}
          surveyingUser={surveyingUser}
        />
      </View>
    </PagerView>
  </View>
);

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.65,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewAsset;
