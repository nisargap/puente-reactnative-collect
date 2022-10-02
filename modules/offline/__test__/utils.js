import { faker } from '@faker-js/faker';

import { storeData } from '../../async-storage';

const createOfflineUserMockData = async () => {
  const user = {
    objectId: faker.database.mongodbObjectId(),
    username: faker.internet.userName(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    organization: faker.company.name(),
    email: faker.internet.email(),
    createdAt: faker.date.past(),
  };
  await storeData(user, 'currentUser');
  return user;
};

const createResidentMockData = (numberOfRecords, userObjectId) => {
  const residentArray = [];

  for (let i = 0; i < numberOfRecords; i += 1) {
    const postParams = {
      parseClass: 'SurveyData',
      parseUser: userObjectId,
      photoFile: faker.image.imageUrl(),
      localObject: {
        fname: faker.name.firstName(),
        lname: faker.name.lastName(),
        nickname: faker.name.middleName(),
        dob: faker.date.birthdate(),
        sex: faker.name.sex()
      }
    };

    residentArray.push(postParams);
  }

  return residentArray;
};

const createSupplementaryFormMockData = (
  numberOfRecords,
  surveyeeObjectedId,
  userObjectId,
  numberOfResponses = 5
) => {
  const supplementaryFormArray = [];

  const customFormSpecifications = {
    objectId: faker.database.mongodbObjectId(),
    name: `Form ${faker.commerce.productName()}`,
    description: faker.commerce.productDescription()
  };

  const fakeTitles = ['waterSourceDrinking', 'waterSourceOther', 'problemsWater', 'receiveWater', 'timeToGetWater', 'getsWaterHousehold'];
  const fakeAnswers = ['aqueduct', 'lessThan1', ['none'], ['adultMale'], 'moreThan30', 'no', '1,000', 'yes'];

  const fields = Array(numberOfResponses).fill(0).map(() => ({
    title: faker.helpers.arrayElement(fakeTitles),
    answer: faker.helpers.arrayElement(fakeAnswers)
  }));

  const localObject = {
    title: customFormSpecifications.name,
    description: customFormSpecifications.description,
    formSpecificationsId: customFormSpecifications.objectId,
    fields,
    surveyingUser: 'JJ McCarthy',
    surveyingOrganization: 'Michigan'
  };

  for (let i = 0; i < numberOfRecords; i += 1) {
    const postParams = {
      parseParentClassID: surveyeeObjectedId,
      parseParentClass: 'SurveyData',
      parseUser: userObjectId,
      parseClass: 'FormResults',
      photoFile: faker.image.imageUrl(),
      localObject,
    };

    supplementaryFormArray.push(postParams);
  }

  return supplementaryFormArray;
};

export { createOfflineUserMockData, createResidentMockData, createSupplementaryFormMockData };
