import { Formik } from 'formik';
import React, { useState } from 'react';
import {
  ActivityIndicator, ScrollView, View
} from 'react-native';
import {
  Modal, Portal, Provider, TextInput
} from 'react-native-paper';

import PaperButton from '../../../../../components/Button';
import { stylesDefault, stylesPaper } from '../../../../../components/FormikFields/PaperInputPicker/index.style';
import I18n from '../../../../../modules/i18n';
import { postObjectsToClass } from '../../../../../services/parse/crud';
import styles from './index.styles';

const AssetCore = ({ setSelectedAsset, surveyingOrganization }) => {
  const [people, setPeople] = useState([{ firstName: '', lastName: '' }]);
  const [visible, setVisible] = React.useState(false);

  const toggleModal = () => setVisible(!visible);

  // handle input change
  const handleInputChange = (text, index, name) => {
    const list = [...people];
    list[index][name] = text;
    setPeople(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...people];
    list.splice(index, 1);
    setPeople(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setPeople([...people, { firstName: '', lastName: '' }]);
  };
  return (
    <View style={styles.assetContainer}>
      <Provider>

        <Formik
          initialValues={{}}
          onSubmit={async (values,) => {
            const formObject = values;
            formObject.relatedPeople = people;
            formObject.surveyingOrganization = surveyingOrganization;

            const postParams = {
              parseClass: 'Assets',
              signature: 'Asset Signature',
              photoFile: 'photo',
              localObject: formObject
            };

            postObjectsToClass(postParams)
              .then((e) => setSelectedAsset(e))
              .catch((e) => console.log(e)); //eslint-disable-line
          }}
        >

          {(formikProps) => (
            <View>
              <View id="top">
                <TextInput
                  label="Name of Assets"
                  onChangeText={formikProps.handleChange('Name')}
                  onBlur={formikProps.handleBlur('Name')}
                  mode="outlined"
                  theme={stylesPaper}
                  style={stylesDefault.label}
                />
              </View>
              <View id="middle" style={{ flexDirection: 'row' }}>
                <View>
                  <PaperButton
                    buttonText='Show "Add People"'
                    onPressEvent={toggleModal}
                  />
                </View>
                <Portal>
                  <Modal visible={visible} onDismiss={toggleModal}>
                    <PaperButton
                      buttonText='Hide "Add People"'
                      onPressEvent={toggleModal}
                    />
                    <ScrollView>
                      {people.map((x, i) => (
                        <View>
                          <TextInput
                            label="First Name"
                            placeholder="Enter First Name"
                            onChangeText={(text) => handleInputChange(text, i, 'firstName')}
                            mode="outlined"
                            theme={stylesPaper}
                            style={stylesDefault.label}
                          />
                          <TextInput
                            label="Last Name"
                            placeholder="Enter Last Name"
                            onChangeText={(text) => handleInputChange(text, i, 'lastName')}
                            mode="outlined"
                            theme={stylesPaper}
                            style={stylesDefault.label}
                          />
                          <TextInput
                            label="Relationship"
                            onChangeText={(text) => handleInputChange(text, i, 'relationship')}
                            mode="outlined"
                            theme={stylesPaper}
                            style={stylesDefault.label}
                          />
                          <View>
                            {people.length !== 1 && (
                              <PaperButton
                                buttonText="Remove"
                                onPressEvent={() => handleRemoveClick(i)}
                              />
                            )}
                            {people.length - 1 === i && (
                              <PaperButton
                                buttonText="Add"
                                onPressEvent={handleAddClick}
                              />
                            )}
                          </View>
                        </View>
                      ))}
                    </ScrollView>

                  </Modal>
                </Portal>

              </View>
              <View id="botom">
                <TextInput
                  label="Community Name"
                  onChangeText={formikProps.handleChange('Community Name')}
                  onBlur={formikProps.handleBlur('Community Name')}
                  mode="outlined"
                  theme={stylesPaper}
                  style={stylesDefault.label}
                />
                <TextInput
                  label="City"
                  onChangeText={formikProps.handleChange('City')}
                  onBlur={formikProps.handleBlur('City')}
                  mode="outlined"
                  theme={stylesPaper}
                  style={stylesDefault.label}
                />
                <TextInput
                  label="Province"
                  onChangeText={formikProps.handleChange('Province')}
                  onBlur={formikProps.handleBlur('Province')}
                  mode="outlined"
                  theme={stylesPaper}
                  style={stylesDefault.label}
                />
              </View>
              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <PaperButton
                  onPressEvent={() => formikProps.handleSubmit()}
                  buttonText={I18n.t('global.submit')}
                />
              )}
            </View>
          )}
        </Formik>
      </Provider>

    </View>
  );
};

export default AssetCore;
