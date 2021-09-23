import { Spinner } from 'native-base';
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import {
  Headline,
} from 'react-native-paper';

import getLocation from '../../../../modules/geolocation';
import I18n from '../../../../modules/i18n';
import { theme } from '../../../../modules/theme';
import { fulfillWithTimeLimit } from '../../../../modules/utils';
import PaperButton from '../../../Button';

const Geolocation = ({ errors, formikKey, setFieldValue }) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, altitude: 0 });
  const [locationLoading, setLocationLoading] = useState(false);

  const handleLocation = async () => {
    setLocationLoading(true);

    const locationPromise = new Promise((resolve, reject) => {
      try {
        return getLocation().then((value) => resolve(value));
      } catch (e) {
        return reject(e);
      }
    });

    const currentLocation = await fulfillWithTimeLimit(5000, locationPromise, null);

    const { latitude, longitude, altitude } = currentLocation.coords;

    setFieldValue('location', { latitude, longitude, altitude });
    setLocation({ latitude, longitude, altitude });
    setTimeout(() => {
      setLocationLoading(false);
    }, 1000);
  };
  return (
    <View key={formikKey}>
      {location === null && (
      <PaperButton
        onPressEvent={handleLocation}
        buttonText={I18n.t('paperButton.getLocation')}
      />
      )}
      {location !== null && (
      <View>
        <PaperButton
          onPressEvent={handleLocation}
          buttonText={I18n.t('paperButton.getLocationAgain')}
        />
        <View style={{ marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row' }}>
          {
            locationLoading === true
            && <Spinner color={theme.colors.primary} />
          }
          {locationLoading === false
            && (
              <View>
                <Headline>
                  {`(${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})`}
                </Headline>
              </View>
            )}
        </View>
        <Text style={{ color: 'red' }}>
          {errors[formikKey]}
        </Text>
      </View>
      )}
    </View>
  );
};

export default Geolocation;
