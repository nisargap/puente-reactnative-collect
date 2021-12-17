import {
  StyleSheet
} from 'react-native';

import { theme } from '../../../modules/theme';

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    flexShrink: 1,
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginVertical: 7,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  mediumHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
