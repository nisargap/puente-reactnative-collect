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
    Parse.Cloud.run('signup', params).then((result) => {
      resolve(result);
    }, (error) => {
      reject(error);
    });
  });
}

async function retrieveSignInFunction(username, password) {
  const pswdOffline = await getData('password');
  return new Promise((resolve, reject) => Parse.User.logIn(String(username), String(password)).then((usr) => {
    console.log(`User logged in successful with username: ${usr.get('username')}`); // eslint-disable-line
    const user = { password: pswdOffline, ...usr };
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

/**
 * Deprecated
 */
function retrieveCurrentUserFunction() {
  const u = Parse.User.current();
  if (u) {
    const user = new Parse.User();
    user.id = u.id;
    user.name = u.get('username');
    user.email = u.get('email');
    user.organization = u.get('organization');
    user.role = u.get('role');
    return user;
  }
  return null;
}

async function retrieveCurrentUserAsyncFunction() {
  const password = await getData('password');
  return Parse.User.currentAsync().then((u) => {
    const user = { ...u, password };
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
  retrieveCurrentUserFunction, retrieveDeleteUserFunction,
  retrieveForgotPasswordFunction,
  retrieveSignInFunction, retrieveSignOutFunction,
  retrieveSignUpFunction
};
