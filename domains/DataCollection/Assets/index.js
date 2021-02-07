import React from 'react';
import { View } from 'react-native';

import NewAssets from './NewAssets';
import ViewAssets from './ViewAssets';

const Assets = ({
  selectedAsset, setSelectedAsset, surveyingOrganization
  //  navigateToNewAssets, navigateToViewAllAssets
}) => (
  <View>
    {selectedAsset && (
      <NewAssets
        setSelectedAsset={setSelectedAsset}
        selectedAsset={selectedAsset}
        surveyingOrganization={surveyingOrganization}
      />
    )}
    {selectedAsset === null && (
      <ViewAssets />
    )}
  </View>
);

export default Assets;
