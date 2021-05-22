// import selectedENV from '../../environment';
const override = require('./app.secrets.json');
const { toUpper } = require('lodash');
const prompt = require('prompt');
const axios = require('axios');

prompt.start();
// console.log(override.awsFlaskApi)
function getVersions(keyword) {
  console.log(`${keyword} the versions for each platform`); //eslint-disable-line
  prompt.get(['ios', 'android', 'expo'], (err, result) => { //eslint-disable-line
    if (err) { return onErr(err); }
    checkCorrect(result);
  });
}

function checkCorrect(versions) {
  console.log('Are these the correct versions? (y/n)'); //eslint-disable-line
  console.log(`  iOS ${versions.ios}`); //eslint-disable-line
  console.log(`  android: ${versions.android}`); //eslint-disable-line
  console.log(`  expo: ${versions.expo}`); //eslint-disable-line
  prompt.get(['correct'], (err, result) => { //eslint-disable-line
    if (err) { return onErr(err); }
    console.log(`Correct: ${result.correct}`); //eslint-disable-line
    if (toUpper(result.correct) === 'Y') {
      console.log(`Post${versions.ios}`, versions.android, versions.expo); //eslint-disable-line
      postVersion(versions.ios, 'ios');
      postVersion(versions.android, 'android');
      postVersion(versions.expo, 'expo');
    } else {
      getVersions('Re-enter');
    }
  });
}

function postVersion(version, platform) {
  const { awsFlaskApi } = override;
  axios.post(awsFlaskApi, {
    version_number: version,
    platform: platform
  })
    .then(() => {
      console.log(`${platform} version ${version} posted!`); //eslint-disable-line
    }, () => {
      console.log(`Error posting ${platform} version ${version}`); //eslint-disable-line
    });
}

getVersions('Enter');

function onErr(err) {
  console.log(err); //eslint-disable-line
  return 1;
}
