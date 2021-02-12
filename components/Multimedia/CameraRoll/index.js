import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import {
  Button
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Permissions from 'expo-permissions';

export default function UseCameraRoll(
  { formikProps, formikKey, setImage }
) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        await ImagePicker.requestMediaLibraryPermissionsAsync().then((status) => {
          console.log(status)
          if (status !== 'granted') {
            // await Permissions.askAsync(Permissions.CAMERA_ROLL)
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }, (error) => {
          console.log(error)
        })
        // const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL)

      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.cancelled) {
      setImage(result.uri);
      formikProps.setFieldValue(formikKey, "data:image/jpg;base64," + result.base64)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={pickImage}>Use image from camera roll</Button>
    </View>
  );
}
