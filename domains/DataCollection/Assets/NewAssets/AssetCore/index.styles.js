import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  assetContainer: {
    width: Dimensions.get('window').width * 0.90,
    margin: 20,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'white',
    borderColor: '#eaeaea',
    borderRadius: 10,
    borderWidth: 1,
  }
});

export default styles;
