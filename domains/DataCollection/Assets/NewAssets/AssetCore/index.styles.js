import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  assetContainer: {
    // flex: 1,
    width: Dimensions.get('window').width * 0.90,
    // height: Dimensions.get('window').height * .80,
    margin: 20,
    padding: 10,
    textAlign: 'left',
    backgroundColor: 'white',
    borderColor: '#eaeaea',
    borderRadius: 10,
    borderWidth: 1,
    // justifyContent: 'center',
  }
});

export default styles;
