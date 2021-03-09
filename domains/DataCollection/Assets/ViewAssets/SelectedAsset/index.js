import React from 'react';
import {
  Dimensions, StyleSheet, Text, View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SelectedAsset = ({ selectedMarker, setSelectedAsset }) => (
  <TouchableWithoutFeedback
    onPress={setSelectedAsset ? () => setSelectedAsset(selectedMarker) : (e) => e}
    style={styles.view}
  >
    <Text style={styles.text}>{selectedMarker.name || selectedMarker.Name}</Text>
    <Text style={styles.text}>{selectedMarker.communityName || ''}</Text>
    {selectedMarker?.relatedPeople[0]?.firstName !== ''
      && selectedMarker.relatedPeople.map((person) => (
        <View>
          <Text>Related People</Text>
          <Text>
            {person.firstName}
            ,
            {' '}
            {person.lastName}
            {' '}
          </Text>
        </View>
      ))}
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    borderWidth: 0.3,
    borderColor: '#ccc',
    borderRadius: 10,
    borderStyle: 'solid',
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.5
    },
    margin: 5,
    backgroundColor: 'white',
    height: 100,
    padding: 20,
    width: Dimensions.get('window').width * 0.80,
  },
  text: {
    fontSize: 20,
    textAlignVertical: 'center',
    color: '#3d80fc'
  }
});

export default SelectedAsset;
