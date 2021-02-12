import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import {
  Modal, Text, Portal, Button
} from 'react-native-paper';

import { Camera } from 'expo-camera';

// STYLING
import { theme } from '../../../modules/theme';

export default function UseCamera(
  { cameraVisible, setCameraVisible, formikProps, formikKey, setImage }
) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraImage, setCameraImage] = useState(null);
  const [zoom, setZoom] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        base64: true,
        aspect: [4, 3],
        quality: 1
      });

      setCameraImage(photo.uri)
      setImage(photo.uri)
      formikProps.setFieldValue(formikKey, "data:image/jpg;base64," + photo.base64)
    }
  }

  const resetPicture = () => {
    setCameraImage(null);
    formikProps.setFieldValue(formikKey, null);
  }

  let camera = useRef(null)

  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <Portal theme={theme}>
      <Modal
        visible={cameraVisible}
        theme={theme}
        contentContainerStyle={styles.modal}
        dismissable={false}
      >
        <View style={{ width: 'auto', height: 500, padding: 10 }}>
          {cameraImage ? (
            <>
              <Image source={{ uri: cameraImage }} style={{ width: 'auto', height: 400 }} />
              <Button onPress={resetPicture}>Retake Picture</Button>
            </>
          ) : (
              <>
                <Camera
                  style={{ flex: 5 }}
                  type={type}
                  ref={(ref) => {
                    camera = ref;
                  }}
                  autofocus
                  zoom={zoom}
                  base64
                >
                  <View
                    style={styles.cameraButtonContainer}>
                    <TouchableOpacity
                      style={styles.flipContainer}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}>
                      <Text style={styles.cameraButtonText}> Flip </Text>
                    </TouchableOpacity>
                    <View style={styles.cameraButtonContainer}>
                      <View style={styles.zoomContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            setZoom(
                              zoom === .4
                                ? zoom
                                : zoom + .1)
                          }}>
                          <Text style={styles.cameraButtonText}> + </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setZoom(
                              zoom === 0
                                ? zoom
                                : zoom - .1)
                          }}>
                          <Text style={styles.cameraButtonText}> - </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Camera>
                <Button onPress={takePicture}>Take Picture</Button>
              </>
            )}
        </View>
        <Button mode="contained" style={styles.button} onPress={() => setCameraVisible(false)}>Done</Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  button: {
    marginTop: 30
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipContainer: {
    flex: 0.2,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  zoomContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end'
  },
  cameraButtonText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
    marginRight: 10
  }
});