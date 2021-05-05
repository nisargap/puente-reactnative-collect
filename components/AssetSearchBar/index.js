import { Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button, Headline, Searchbar } from 'react-native-paper';

//import { getData } from '../../modules/async-storage';
import I18n from '../../modules/i18n';
import checkOnlineStatus from '../../modules/offline';

import styles from './index.styles';
// import SelectedAsset from '../../domains/DataCollection/Assets/ViewAssets/SelectedAsset';
import SelectedAsset from '../../domains/DataCollection/Assets/ViewAssets/SelectedAsset';
// import AssetFormSelect from '../../domains/DataCollection/Assets/NewAssets/AssetSupplementary/AssetFormSelect'
import customQueryService from '../../services/parse/crud/custom-queries';

const AssetSearchbar = ({ selectedAsset, setSelectedAsset, surveyingOrganization }) => {
  const [query, setQuery] = useState('');
  const [assetData, setAssetData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [online, setOnline] = useState(true);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    
    checkOnlineStatus().then(async (connected) => {
      if (connected) {
        
        fetchData(true, '');
        
      }
      if (!connected) fetchData(false, '');
    });
  }, [surveyingOrganization]);

  // remove this offline portion if he says no offline
  // const fetchOfflineData = async () => {
  //   setOnline(false);

  //   getData('assetData').then((assetData) => {
  //     if (assetData) {
  //       let offlineData = [];
  //       getData('offlineIDForms').then((offlineAssetData) => {
  //         if (offlineAssetData !== null) {
  //           Object.entries(offlineAssetData).forEach(([key, value]) => { //eslint-disable-line
  //             offlineData = offlineData.concat(value.localObject);
  //           });
  //         }
  //         const allData = assetData.concat(offlineData);
  //         setAssetData(allData.slice() || []);
  //       });
  //     }
  //     setLoading(false);
  //   });
  // }; 

  const fetchOnlineData = async () => {
    setOnline(true);
    
    customQueryService(0, 2500, 'Assets', 'surveyingOrganization', surveyingOrganization ).then((records) => {
      // console.log("ASsets", records);
      // here and 
      const allData = records;
      
      setAssetData(allData.slice());
      filterOfflineList(assetData);
      setLoading(false);
    })
    //console.log("Post query")

    // check with hope to see if we want to store offline assets
    // if yes, check back with me, ootherwise remove everything but 72/73 Move them inside of your ^^
    // let offlineData = [];

    // await getData('offlineIDForms').then((offlineAssetData) => {
    //   if (offlineAssetData !== null) {
    //     Object.entries(offlineAssetData).forEach(([key, value]) => { //eslint-disable-line
    //       offlineData = offlineData.concat(value.localObject);
    //     });
    //   }
    // });

    // const allData = assets.concat(offlineData);

  };

  const fetchData = (qry) => {
    // remove this line if no offline too - 82
    // if (!onLine) fetchOfflineData();
    fetchOnlineData(qry);
  };

  // probably not needed, this is all specific to the id form
  const filterOfflineList = () => assetData.filter(
    (listItem) => {
      const name = listItem.name || ' ';
      return name.toLowerCase().includes(query.toLowerCase())
    }
  );

  const onChangeSearch = (input) => {
    setLoading(true);

    if (input === '') setLoading(false);
    clearTimeout(searchTimeout);
    setQuery(input);
    setSearchTimeout(setTimeout(() => {
      fetchData(online, input);
    }, 1000));
  };

  const onSelectAsset = (listItem) => {
    setSelectedAsset(listItem);
    setQuery('');
    console.log("Selected Asset: ", selectedAsset)
  };

  const renderItem = ({ item }) => (
    <View>
      <Button onPress={() => onSelectAsset(item)} contentStyle={{ marginRight: 5 }}>
        <Text style={{ marginRight: 10 }}>{item.get('name')}</Text>
        
        <View style={{
          backgroundColor: '#f8380e',
          width: 1,
          height: 10,
          paddingLeft: 10,
          marginTop: 'auto',
          marginBottom: 'auto',
          borderRadius: 20
        }}
        />

      </Button>
    </View>
  );

  return (
    <View>
      <Headline style={styles.header}>{I18n.t('assetSearchbar.searchIndividual')}</Headline>
      <Searchbar
        placeholder="Type Here..."
        onChangeText={onChangeSearch}
        value={query}
      />
      {!online
        && <Button onPress={() => fetchData(false, '')}>{I18n.t('global.refresh')}</Button>}
      {loading
        && <Spinner color="blue" />}

      {query !== '' && (
        <FlatList
          data={assetData}
          renderItem={renderItem}
          keyExtractor={(item) => {
            item.get('name')
          }}
        />
      )}
      {selectedAsset
        &&  (
          <SelectedAsset
            selectedMarker={selectedAsset}
          />
        )}
        
    </View>
  );
};

export default AssetSearchbar;