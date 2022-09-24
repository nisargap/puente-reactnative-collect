import uuid from 'react-native-uuid';

import checkOnlineStatus from '../../../offline';
import { postHousehold, postHouseholdWithRelation, postIdentificationForm } from '../post';

jest.mock('../../../offline', () => jest.fn());

describe('test offline', () => {
  test('postIdentificationForm', async () => {
    checkOnlineStatus.mockResolvedValue(false);

    const postParams = {
      parseClass: 'SurveyData',
      parseUser: uuid.v4(),
      photoFile: '',
      localObject: {
        fname: 'Hi'
      }
    };

    const postedOfflineForm = await postIdentificationForm(postParams);

    expect(postedOfflineForm).toHaveProperty('objectId');
  });

  test('postHousehold', async () => {
    checkOnlineStatus.mockResolvedValue(false);
    const postParams = {
      parseClass: 'Household',
      localObject: {
        latitude: 0,
        longitude: 0
      }
    };

    const postedOfflineHousehold = await postHousehold(postParams);

    expect(postedOfflineHousehold).toHaveProperty('objectId');
    expect(postedOfflineHousehold.objectId).toContain('Household');
  });

  test('Post Household with a relationship', async () => {
    checkOnlineStatus.mockResolvedValue(false);

    const postParams = {
      parseParentClassID: uuid.v4(),
      parseParentClass: 'Household',
      parseClass: 'Household',
      localObject: {
        relationship: 'father',
        latitude: 0,
        longitude: 0
      }
    };

    const postedHouseholdWithRelation = await postHouseholdWithRelation(postParams);

    expect(postedHouseholdWithRelation).toHaveProperty('objectId');
    expect(postedHouseholdWithRelation.objectId).toContain('Household');
  });
});
