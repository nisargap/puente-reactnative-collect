import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView, View
} from 'react-native';
import {
  Appbar,
  TextInput
} from 'react-native-paper';

import PaperButton from '../../../../../../components/Button';
import { theme } from '../../../../../../modules/theme';

const PeopleModal = ({
  people,
  handleInputChange, handleAddClick, handleRemoveClick,
  toggleModal, stylesPaper, stylesDefault
}) => (
  <>
    <Appbar.Header style={{ backgroundColor: theme.colors.accent }}>
      <Appbar.Action icon="chevron-down" onPress={toggleModal} />
      <Appbar.Content title="People Manager" subtitle="" titleStyle={{ fontSize: 20, fontWeight: 'bold' }} />
    </Appbar.Header>
    {people.map((x, i) => (
      <ScrollView key={`${x}_`} style={{ margin: 20 }}>
        <KeyboardAvoidingView>
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
        </KeyboardAvoidingView>

      </ScrollView>
    ))}
  </>
);

export default PeopleModal;
