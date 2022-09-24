import uuid from 'react-native-uuid';

import { postIdentificationForm } from '../post';

it('postIdentificationForm', async () => {
  const photoFile = '';

  const localObject = {
    fname: 'Hi'
  };
  const parseUser = uuid.v4();

  const postParams = {
    parseClass: 'SurveyData',
    parseUser,
    photoFile,
    localObject
  };

  const postedOfflineForm = await postIdentificationForm(postParams);
  
  expect(postedOfflineForm).toHaveProperty('objectId')
});
