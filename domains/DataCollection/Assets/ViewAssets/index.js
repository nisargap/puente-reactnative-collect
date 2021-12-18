import { Spinner } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, View
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import { getData, storeData } from '../../../../modules/async-storage';
import { assetDataQuery } from '../../../../modules/cached-resources/read';
import getLocation from '../../../../modules/geolocation';
import { theme } from '../../../../modules/theme';
import SelectedAsset from './SelectedAsset';

const ViewAssets = ({ organization, switchAssetPage }) => {
  useEffect(() => {
    let isSubscribed = true;

    async function fetchRegion() {
      await getData('assetMapRegion').then((data) => {
        if (isSubscribed) {
          if (!data) {
            setRegion({
              latitude: 18.4861,
              longitude: -69.9312,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } else {
            setRegion(data);
          }
        }
      });
    }

    fetchRegion();

    return () => { isSubscribed = false; };
  }, []);

  const [region, setRegion] = useState();
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState();

  const handleLocation = async () => {
    setLoading(true);
    await getLocation().then((location) => {
      const { latitude, longitude } = location.coords;
      setRegion({
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        latitude,
        longitude,
      });
      storeData({
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        latitude,
        longitude,
      }, 'assetMapRegion');
    }).catch((e) => {
      console.log(e) //eslint-disable-line
    });
    setLoading(false);
  };

  const retrieveMarkers = () => {
    setLoading(true);
    assetDataQuery(organization).then((records) => {
      const sanitizedRecords = JSON.parse(JSON.stringify(records));
      setMarkers(sanitizedRecords);
      setLoading(false);
    }).catch((e) => {
      setLoading(false);
      console.log(e); //eslint-disable-line
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          region={region}
        >
          {markers && markers.map((marker) => (
            marker.location && (
              <Marker
                key={marker.objectId}
                coordinate={marker.location}
                title={`${marker.name || ''}`}
                // description={`Collector: ${marker.surveyingOr}`}
                onPress={() => setSelectedMarker(marker)}
              />
            )
          ))}

        </MapView>
        <View style={styles.buttonStyle}>
          <IconButton
            icon="crosshairs-gps"
            onPress={handleLocation}
            color={theme.colors.primary}
            style={{ backgroundColor: theme.colors.background, opacity: 0.8 }}
          />
          <IconButton
            icon="refresh"
            onPress={retrieveMarkers}
            color={theme.colors.primary}
            style={{ backgroundColor: theme.colors.background, opacity: 0.8 }}
          />
        </View>
        {loading
          && <Spinner style={styles.loading} color={theme.colors.primary} />}

      </View>
      <View style={styles.container}>
        {selectedMarker
          && (
            <SelectedAsset
              selectedMarker={selectedMarker}
              style={{ position: 'absolute' }}
              switchAssetPage={switchAssetPage}
            />
          )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width * 0.95,
    height: Dimensions.get('window').height * 0.60,
    marginTop: 10,
    borderRadius: 10
  },
  buttonStyle: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: '0%',
    right: '0%',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  }
});

export default ViewAssets;
