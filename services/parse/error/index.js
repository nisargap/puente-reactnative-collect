import selectedENV from '../../../environment';

const {
  TEST_MODE
} = selectedENV;
const Parse = client(TEST_MODE);


function handleParseError(err, callback) {
  switch (err.code) {
    case Parse.Error.INVALID_SESSION_TOKEN:
      Parse.User.logOut();
      callback()
  }
}

export {
    handleParseError
}