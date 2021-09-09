import { useEffect } from 'react/cjs/react.development';

const Looper = ({
  data, config, numberedQestions,
  setNumberedQuestions,
  setQuestionsToRepeat,
}) => {
  const {
    formikKey, fieldType, numberQuestionsToRepeat
  } = data;
  useEffect(() => {
    if (fieldType === 'loop') {
      numberQuestionsInConfig();
    }
  }, []);

  useEffect(() => {
    if (fieldType === 'loop') {
      updateQuestionsToRepeat();
    }
  }, [numberedQestions]);

  // number all questions in config (for looping ccapabilities)
  const numberQuestionsInConfig = () => {
    const fieldsNumberedJson = {};
    config.fields.forEach((field, index) => {
      fieldsNumberedJson[index] = field;
    });
    setNumberedQuestions(fieldsNumberedJson);
  };

  // update the questions that will be repeated if the field type is loop
  const updateQuestionsToRepeat = () => {
    Object.entries(numberedQestions).forEach(([key, value]) => {
      if (value.formikKey === formikKey) {
        let repeatQuestions = [];
        for (let i = key - numberQuestionsToRepeat; i < key; i += 1) {
          // ensure question does not excceed the first question
          if (i >= 0) {
            repeatQuestions = repeatQuestions.concat(numberedQestions[i]);
          }
        }
        setQuestionsToRepeat(repeatQuestions);
      }
    });
  };

  return null;
};

export default Looper;
