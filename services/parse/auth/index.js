import AsyncStorage from '@react-native-async-storage/async-storage';
import { Parse } from 'parse/react-native';

import selectedENV from '../../../environment';
import { getData } from '../../../modules/async-storage';

function initialize() {
  const { parseAppId, parseJavascriptKey, parseServerUrl } = selectedENV;

  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(parseAppId, parseJavascriptKey);
  Parse.serverURL = parseServerUrl;
  console.log(`Initialize Parse with App ID:${parseAppId}, Javascript Key: ${parseJavascriptKey}`); // eslint-disable-line
}

function retrieveSignUpFunction(params) {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('signup', params).then((u) => {
      const user = {
        ...u,
        id: u.id,
        name: u.get('username'),
        firstname: u.get('firstname') || '',
        lastname: u.get('lastname') || '',
        email: u.get('email'),
        organization: u.get('organization'),
        role: u.get('role'),
        createdAt: `${u.get('createdAt')}`,
        password: params.password
      };
      resolve(user);
    }, (error) => {
      reject(error);
    });
  });
}

async function retrieveSignInFunction(usrn, pswd) {
  const password = await getData('password');
  return new Promise((resolve, reject) => Parse.User.logIn(String(usrn), String(pswd)).then((u) => {
    console.log(`User logged in successful with username: ${u.get('username')}`); // eslint-disable-line
    const user = {
      ...u,
      id: u.id,
      name: u.get('username'),
      firstname: u.get('firstname') || '',
      lastname: u.get('lastname') || '',
      email: u.get('email'),
      organization: u.get('organization'),
      role: u.get('role'),
      createdAt: `${u.get('createdAt')}`,
      password
    };
    resolve(user);
  }, (error) => {
      console.log(`Error: ${error.code} ${error.message}`); // eslint-disable-line
    reject(error);
  }));
}

async function retrieveSignOutFunction() {
  return Parse.User.logOut()
    .catch((error) => {
      console.log(error.message); //eslint-disable-line
    });
}

function retrieveForgotPasswordFunction(params) {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('forgotPassword', params).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

async function retrieveCurrentUserAsyncFunction() {
  const password = await getData('password');
  return Parse.User.currentAsync().then((u) => {
    const user = {
      ...u,
      id: u.id,
      name: u.get('username'),
      firstname: u.get('firstname') || '',
      lastname: u.get('lastname') || '',
      email: u.get('email'),
      organization: u.get('organization'),
      role: u.get('role'),
      createdAt: `${u.get('createdAt')}`,
      password
    };
    return user;
  }).catch(() => undefined);
}

function retrieveDeleteUserFunction(params) {
  Parse.Cloud.run('deleteUser', params).then((result) => result);
}

function retrievAddUserPushToken(params) {
  return new Promise((resolve, reject) => {
    Parse.Cloud.run('addUserPushToken', params).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

export {
  initialize,
  retrievAddUserPushToken,
  retrieveCurrentUserAsyncFunction,
  retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction
};
