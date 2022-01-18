function addSelectTextInputs(values, formObject) {
  const newFormObject = formObject;
  Object.entries(values).forEach(([key, val]) => {
    if (key.slice(0, 2) === '__') {
      const keys = key.split('__');
      const formikKey = keys[2].includes('sameForm') || keys[2].includes('loop') ? `${keys[1]}__${keys[2]}` : keys[1];
      const formikOrigVal = keys[2].includes('sameForm') || keys[2].includes('loop') ? keys[3] : keys[2];
      if (typeof (formObject[formikKey]) === 'object') {
        const index = newFormObject[formikKey].indexOf(formikOrigVal);
        newFormObject[formikKey][index] = `${formikOrigVal}__${val}`;
        delete newFormObject[key];
      } else if (typeof (formObject[formikKey]) === 'string') {
        newFormObject[formikKey] = `${formikOrigVal}__${val}`;
        delete newFormObject[key];
      }
    }
  });
  return formObject;
}

function vitalsBloodPressue(values, formObject) {
  const newFormObject = formObject;
  newFormObject.bloodPressure = `${values.Systolic || '00'}/${values.Diastolic || '00'}`;

  const valuesToPrune = ['Systolic', 'Diastolic'];
  valuesToPrune.forEach((value) => {
    delete newFormObject[value];
  });
  return newFormObject;
}

// function to concatenate all loopSameForm keys to orginal key in use
function cleanLoopSubmissions(values, formObject) {
  const newFormObject = formObject;
  const repeatedQuestions = {};
  const valuesToPrune = [];
  Object.entries(values).forEach(([key, val]) => {
    if (key.includes('__sameForm')) {
      valuesToPrune.push(key);
      const actualKey = key.split('__sameForm')[0];
      if (Object.prototype.hasOwnProperty.call(repeatedQuestions, actualKey)) {
        repeatedQuestions[actualKey].push(val);
      } else {
        repeatedQuestions[actualKey] = [val];
      }
    }
  });

  valuesToPrune.forEach((value) => {
    delete newFormObject[value];
  });
  Object.entries(repeatedQuestions).forEach(([key, value]) => {
    value.forEach((val) => {
      newFormObject[key] = `${newFormObject[key]}|${val}`;
    });
  });

  return newFormObject;
}

export { addSelectTextInputs, cleanLoopSubmissions, vitalsBloodPressue };
