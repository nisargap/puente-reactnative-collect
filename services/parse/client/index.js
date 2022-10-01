import { Parse as ParseRN } from 'parse/react-native';
import { Parse as ParseNode } from 'parse/node';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default client = (isTest) => {
    if (isTest) return ParseNode
    ParseRN.setAsyncStorage(AsyncStorage);
    return ParseRN
}