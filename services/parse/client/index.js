// import AsyncStorage from '@react-native-async-storage/async-storage';

// const client = (isTest) => {
//   if (isTest) {
//     const { Parse } =  import ('parse/node');
//     return Parse
//   };
//   const { Parse } = import('parse/react-native');

//   Parse.setAsyncStorage(AsyncStorage);
//   return Parse;
// };

// export default client;

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Parse } from 'parse/react-native';

const client = () => {
  Parse.setAsyncStorage(AsyncStorage);
  return Parse;
};

export default client;
