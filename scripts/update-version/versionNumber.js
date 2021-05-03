const { toUpper } = require('lodash');
const prompt = require('prompt');
const axios = require('axios');
import selectedENV from '../../environment';


prompt.start();

function getVersions(keyword) {
  console.log(keyword + ' the versions for each platform')
  prompt.get(['ios', 'android', 'expo'], function (err, result) {
    if (err) { return onErr(err); }
    checkCorrect(result)
  });
}

function checkCorrect(versions) {
  console.log('Are these the correct versions? (y/n)');
  console.log('  iOS ' + versions.ios);
  console.log('  android: ' + versions.android);
  console.log('  expo: ' + versions.expo);
  prompt.get(['correct'], function (err, result) {
    if (err) { return onErr(err); }
    console.log('Correct: ' + result.correct)
    if (toUpper(result.correct) === 'Y') {
      console.log("Post" + versions.ios, versions.android, versions.expo)
      postVersion(versions.ios, 'ios');
      postVersion(versions.android, 'android');
      postVersion(versions.expo, 'expo');
    }
    else {
      getVersions('Re-enter');
    }
  });
}

function postVersion(version, platform) {
  const { awsFlaskApi } = selectedENV;
  axios.post(awsFlaskApi, {
    version_number: version,
    platform: platform
  })
    .then((response) => {
      console.log(platform + ' version ' + version + ' posted!');
    })
}

getVersions('Enter');

function onErr(err) {
  console.log(err);
  return 1;
}
