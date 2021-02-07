import { Spinner } from 'native-base';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from 'react-native-paper';

import { getData } from '../../modules/async-storage';
import getLocation from '../../modules/geolocation';
import checkOnlineStatus from '../../modules/offline';
import { theme } from '../../modules/theme';
import { residentIDQuery } from '../../services/parse/crud';

const Maps = ({ organization }) => {
  const [region, setRegion] = useState({
    latitude: 18.4861,
    longitude: -69.9312,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLocation = async () => {
    const currentLocation = await getLocation().then().catch((e) => e);
    const { latitude, longitude } = currentLocation.coords;
    setRegion({
      ...region,
      latitude,
      longitude,
    });
  };

  const retriveAsyncMarkers = () => {
    setLoading(true);
    getData('residentData').then((residentData) => {
      if (residentData) {
        setMarkers(residentData);
      }
      setLoading(false);
    });
  };

  const retrieveOnlineMarkers = () => {
    setLoading(true);
    const queryParams = {
      skip: 0,
      offset: 0,
      limit: 10000,
      parseColumn: 'surveyingOrganization',
      parseParam: organization,
    };

    residentIDQuery(queryParams).then((recs) => {
      const records = JSON.parse(JSON.stringify(recs));
      setMarkers(records);
      setLoading(false);
    });
  };

  const retrieveMarkers = () => {
    checkOnlineStatus().then(async (online) => {
      if (online) {
        retrieveOnlineMarkers();
      } else {
        retriveAsyncMarkers();
      }
    });
  };

  return (
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
              title={`${marker.fname || ''} ${marker.lname || ''}`}
              description={`Collector: ${marker.surveyingUser}`}
            />
          )
        ))}
      </MapView>
      {loading
        && <Spinner style={styles.loading} color={theme.colors.primary} />}
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
    height: Dimensions.get('window').height / 2,
    marginTop: 10,
    borderRadius: 10
  },
  buttonStyle: {
    position: 'absolute', // use absolute position to show button on top of the map
    bottom: '0%',
    alignSelf: 'flex-end', // for align to right,
    right: 10,
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  }
});

export default Maps;
