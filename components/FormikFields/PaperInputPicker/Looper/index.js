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
import PaperInputPicker from '..';

const Looper = ({
  data, formikProps, scrollViewScroll, setScrollViewScroll, surveyingOrganization,
  customForm, config, loopsAdded, setLoopsAdded,
}) => {
  const {
    label, formikKey, fieldType, numberQuestionsToRepeat
  } = data;

  const [numberedQestions, setNumberedQuestions] = React.useState({});
  const [questionsToRepeat, setQuestionsToRepeat] = React.useState([]);
  const [additionalQuestions, setAdditionalQuestions] = React.useState([]);
  const [individualLoopsAdded, setIndividualLoopsAdded] = React.useState(0);

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

  const translatedLabel = customForm ? label : I18n.t(label);

  return (
    <View key={formikKey}>
      {additionalQuestions !== undefined && additionalQuestions.length !== 0
            && additionalQuestions.map((question) => (
              <PaperInputPicker
                data={question}
                formikProps={formikProps}
                customForm={customForm}
                config={config}
                loopsAdded={loopsAdded}
                setLoopsAdded={setLoopsAdded}
                surveyingOrganization={surveyingOrganization}
                scrollViewScroll={scrollViewScroll}
                setScrollViewScroll={setScrollViewScroll}
              />
            ))}
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
