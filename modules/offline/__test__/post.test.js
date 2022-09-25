import { postIdentificationForm, postSupplementaryForm } from '../../cached-resources';
import checkOnlineStatus from '..';
import { postOfflineForms } from '../post';
import { createOfflineUserMockData, createResidentMockData, createSupplementaryFormMockData } from './utils';

jest.mock('..', () => jest.fn());

// const createOfflineMockTestData = async () => {
//   await createOfflineUserMockData();
// };

describe('Testing full feature of offline posting', () => {
  test('Testing postOfflineForms', async () => {
    checkOnlineStatus.mockResolvedValue(false);

    const user = await createOfflineUserMockData();

    const residents = createResidentMockData(3, user.objectId);
    const resident1 = await postIdentificationForm(residents[0]);
    const resident2 = await postIdentificationForm(residents[1]);
    await postIdentificationForm(residents[2]); // Resident 3 won't have supplementary forms

    const supplementaryForms1 = createSupplementaryFormMockData(20, resident1.objectId, user.objectId);
    const supplementaryForms2 = createSupplementaryFormMockData(20, resident2.objectId, user.objectId);
    await supplementaryForms1.reduce(
      (p, form) => p.then(() => postSupplementaryForm(form)), // https://jrsinclair.com/articles/2019/how-to-run-async-js-in-parallel-or-sequential/
      Promise.resolve(null)
    );
    await supplementaryForms2.reduce(
      (p, form) => p.then(() => postSupplementaryForm(form)), // https://jrsinclair.com/articles/2019/how-to-run-async-js-in-parallel-or-sequential/
      Promise.resolve(null)
    );

    checkOnlineStatus.mockResolvedValue(true);

    const offlineForms = await postOfflineForms();

    console.log(offlineForms);
  });
});
