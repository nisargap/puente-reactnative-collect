import _ from 'lodash';
import * as React from 'react';
import { useEffect } from 'react/cjs/react.development';
import {
  View
} from 'react-native';
import {
  Button
} from 'react-native-paper';

import I18n from '../../../../modules/i18n';

const Looper = ({
  data, config, numberedQestions,
  setNumberedQuestions, questionsToRepeat,
  setQuestionsToRepeat, additionalQuestions,
  setAdditionalQuestions, translatedLabel,
  loopsAdded, setLoopsAdded
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

  const [individualLoopsAdded, setIndividualLoopsAdded] = React.useState(0);

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

  // add another loop of questions in correct position in form (additionalQuestions)
  // update number of loops added (+1)
  const addLoop = () => {
    // updated formikKey to ensure uniqueness
    let updatedQuestions = [];
    questionsToRepeat.forEach((question) => {
      const updatedQuestion = _.cloneDeep(question);
      updatedQuestion.formikKey = `${updatedQuestion.formikKey}__loop${individualLoopsAdded}`;
      updatedQuestions = updatedQuestions.concat(updatedQuestion);
    });

    setAdditionalQuestions(additionalQuestions.concat(updatedQuestions));
    setLoopsAdded(loopsAdded + 1);
    setIndividualLoopsAdded(individualLoopsAdded + 1);
  };

  const removeLoop = () => {
    setLoopsAdded(loopsAdded - 1);
    setIndividualLoopsAdded(individualLoopsAdded - 1);
    setAdditionalQuestions(additionalQuestions.slice(0,
      additionalQuestions.length - numberQuestionsToRepeat));
  };

  return (
    <View>
      <Button onPress={() => addLoop()}>
        {I18n.t('paperButton.addAdditional')}
        {translatedLabel}
      </Button>
      {individualLoopsAdded !== 0 && (
      <Button onPress={() => removeLoop()}>
        {I18n.t('paperButton.removePrevious')}
        {translatedLabel}
      </Button>
      )}
    </View>
  );
};

export default Looper;
