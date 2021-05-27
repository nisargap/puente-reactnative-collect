import React from 'react';
import {
  Dimensions, StyleSheet, View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Text, Title
} from 'react-native-paper';

import I18n from '../../../../../modules/i18n';
import { layout } from '../../../../../modules/theme';

const SelectedAsset = ({ selectedMarker, setSelectedAsset }) => (
  <TouchableWithoutFeedback
    onPress={setSelectedAsset ? () => setSelectedAsset(selectedMarker) : (e) => e}
    style={layout.resCardContainer}
  >
    <View
      style={layout.resCardNameContainer}
    >
      <Title style={layout.resCardName}>{selectedMarker.name || selectedMarker.Name}</Title>
    </View>

    <View style={layout.resCardCityLicenseContainer}>
      {/* <View style={layout.resCardCityContainer}>
            <Text style={layout.resCardFont}>{I18n.t('findResident.residentCard.city')}</Text>
            <Text style={layout.resCardFont}>{city}</Text>
          </View> */}
      <View style={layout.resCardLicenseContainer}>
        <Text style={layout.resCardFont}>{I18n.t('findResident.residentCard.community')}</Text>
        <Text style={layout.resCardLicense}>{selectedMarker.communityName}</Text>
      </View>
      {selectedMarker.relatedPeople && selectedMarker.relatedPeople.map((person) => (
        <View style={layout.resCardLicenseContainer}>
          <Text style={layout.resCardFont}>Related People</Text>
          <Text style={layout.resCardFont}>
            {person.firstName}
            ,
            {' '}
            {person.lastName}
            {' '}
          </Text>
        </View>
      ))}
    </View>
  </TouchableWithoutFeedback>
);

export default SelectedAsset;
