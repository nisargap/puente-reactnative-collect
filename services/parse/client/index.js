import AsyncStorage from '@react-native-async-storage/async-storage';
import { Parse as ParseNode } from 'parse/node';
import { Parse as ParseRN } from 'parse/react-native';

const client = (isTest) => {
  if (isTest) return ParseNode;
  ParseRN.setAsyncStorage(AsyncStorage);
  return ParseRN;
};

export default client;
