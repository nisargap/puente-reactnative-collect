import React, { useState, useEffect } from 'react';
import { View, Platform } from 'react-native';
import {
  Button
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

export default function UseCameraRoll(
  { formikProps, formikKey, setImage }
) {
  // const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(formikProps);

    if (!result.cancelled) {
      setImage(result.uri);
      formikProps.setFieldValue(formikKey, result.uri)
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={pickImage}>Use image from camera roll</Button>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}
