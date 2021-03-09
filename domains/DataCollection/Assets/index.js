import React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import NewAssets from './NewAssets';
import ViewAssets from './ViewAssets';

const Assets = ({
  selectedAsset, setSelectedAsset, surveyingOrganization
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View>
      {selectedAsset && (
        <NewAssets
          setSelectedAsset={setSelectedAsset}
          selectedAsset={selectedAsset}
          surveyingOrganization={surveyingOrganization}
        />
      )}
      {selectedAsset === null && (
        <ViewAssets
          organization={surveyingOrganization}
          setSelectedAsset={setSelectedAsset}
        />
      )}
    </View>
  </TouchableWithoutFeedback>
);

export default Assets;
