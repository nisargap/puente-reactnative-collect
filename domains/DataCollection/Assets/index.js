import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import NewAssets from './NewAssets';
import ViewAssets from './ViewAssets';

const Assets = ({
  selectedAsset, setSelectedAsset, surveyingOrganization
}) => {
  const [page, setPage] = useState(0);

  const switchAssetPage = (pageIndex, asset) => {
    setPage(pageIndex);
    setSelectedAsset(asset);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        {selectedAsset && (
        <NewAssets
          setSelectedAsset={setSelectedAsset}
          selectedAsset={selectedAsset}
          surveyingOrganization={surveyingOrganization}
          assetPageIndex={page}
        />
        )}
        {selectedAsset === null && (
        <ViewAssets
          organization={surveyingOrganization}
          switchAssetPage={switchAssetPage}
        />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Assets;
