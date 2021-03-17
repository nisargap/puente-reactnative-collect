import { Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from 'react';
import {
  ActivityIndicator, Modal,
  ScrollView, View
} from 'react-native';
import {
  Provider, Text,
  TextInput
} from 'react-native-paper';

import PaperButton from '../../../../../components/Button';
import { stylesDefault, stylesPaper } from '../../../../../components/FormikFields/PaperInputPicker/index.style';
import { postAssetForm } from '../../../../../modules/cached-resources';
import getLocation from '../../../../../modules/geolocation';
import I18n from '../../../../../modules/i18n';
import styles from './index.styles';
import PeopleModal from './PeopleModal';

const AssetCore = ({ setSelectedAsset, surveyingOrganization }) => {
  const [people, setPeople] = useState([{ firstName: '', lastName: '' }]);
  const [location, setLocation] = useState();
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible(!visible);

  const handleFormikPropsLocation = async (formikProps) => {
    const currentLocation = await getLocation().then().catch((e) => e);
    const { latitude, longitude } = currentLocation.coords;
    formikProps.setFieldValue('location', { latitude, longitude });
    setLocation(currentLocation.coords);
  };

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
    <View>
      <Provider>
        <Formik
          initialValues={{}}
          onSubmit={async (values, { resetForm }) => {
            const formObject = values;
            formObject.relatedPeople = people;
            formObject.surveyingOrganization = surveyingOrganization;
            formObject.latitude = values.location?.latitude || 0;
            formObject.longitude = values.location?.longitude || 0;
            formObject.altitude = values.location?.altitude || 0;

            const postParams = {
              parseClass: 'Assets',
              signature: 'Asset Signature',
              photoFile: 'photo',
              localObject: formObject
            };

            postAssetForm(postParams)
              .then((e) => {
                const asset = JSON.parse(JSON.stringify(e));
                setSelectedAsset(asset);
              })
              .then(() => resetForm())
              .catch((e) => console.log(e)); //eslint-disable-line
          }}
        >

          {(formikProps) => (
            <View style={styles.assetContainer}>
              <View id="top">
                <TextInput
                  label="Name of Assets"
                  value={formikProps.values.name || ''}
                  onChangeText={formikProps.handleChange('name')}
                  onBlur={formikProps.handleBlur('name')}
                  mode="outlined"
                  theme={stylesPaper}
                  style={stylesDefault.label}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <PaperButton
                  buttonText="Add People"
                  onPressEvent={toggleModal}
                  icon="chevron-up"
                  compact
                  style={{ margin: 2 }}

                />
                <PaperButton
                  onPressEvent={() => handleFormikPropsLocation(formikProps)}
                  buttonText="Get Location"
                  icon="crosshairs-gps"
                  compact
                  style={{ margin: 2 }}
                />
              </View>
              <Modal
                visible={visible}
                animationType="slide"
              >
                <ScrollView>
                  <PeopleModal
                    people={people}
                    handleInputChange={handleInputChange}
                    handleAddClick={handleAddClick}
                    handleRemoveClick={handleRemoveClick}
                    toggleModal={toggleModal}
                    stylesPaper={stylesPaper}
                    stylesDefault={stylesDefault}
                  />
                </ScrollView>
              </Modal>
              <View>
                <Text style={{ fontWeight: 'bold' }}>Coordinates</Text>
                {location !== undefined
                  && <Text>{`${location.latitude},${location.longitude}`}</Text>}
              </View>
              <View>
                <Text style={{ fontWeight: 'bold' }}>Related People</Text>
                {people.map((person) => (
                  <Text>{`${person.firstName} ${person.lastName}`}</Text>
                ))}
              </View>
              <TextInput
                label="Community Name"
                value={formikProps.values.communityName || ''}
                onChangeText={formikProps.handleChange('communityName')}
                onBlur={formikProps.handleBlur('communityName')}
                mode="outlined"
                theme={stylesPaper}
                style={stylesDefault.label}
              />
              <TextInput
                label="City"
                value={formikProps.values.city || ''}
                onChangeText={formikProps.handleChange('city')}
                onBlur={formikProps.handleBlur('city')}
                mode="outlined"
                theme={stylesPaper}
                style={stylesDefault.label}
              />
              <TextInput
                label="Province"
                value={formikProps.values.province || ''}
                onChangeText={formikProps.handleChange('province')}
                onBlur={formikProps.handleBlur('province')}
                mode="outlined"
                theme={stylesPaper}
                style={stylesDefault.label}
              />
              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <PaperButton
                  onPressEvent={() => formikProps.handleSubmit()}
                  disabled={!!_.isEmpty(formikProps.values)}
                  buttonText={_.isEmpty(formikProps.values) ? I18n.t('global.emptyForm') : I18n.t('assetForms.createAsset')}
                  icon={_.isEmpty(formikProps.values) ? '' : 'plus'}
                  style={{ backgroundColor: _.isEmpty(formikProps.values) ? 'red' : 'green' }}
                />
              )}
              <PaperButton
                icon="gesture-swipe"
                mode="text"
                buttonText="Swipe to Attach Form"
              />
            </View>
          )}
        </Formik>
      </Provider>

    </View>
  );
};

export default AssetCore;
