import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Card from '../components/Card';
import * as RNFS from 'react-native-fs';
const Detailscreen = (props) => {
  const [First, setFirst] = useState('');
  const [last_name, setlast_name] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [user_image, setUser_image] = useState({});

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setUser_image(response);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setUser_image(response);
    });
  };

  const loginApi = () => {
    let user_images = File;
    user_images = 'data:image/jpeg;base64,' + user_image.data;
    var data = new FormData();
    data.append('first_name', First);
    data.append('last_name', last_name);
    data.append('email', email);
    data.append('phone', phone);
    data.append('user_image', require('../assets/Banner.png'));

    var config = {
      method: 'post',
      url: 'http://dev1.xicom.us/xttest/savedata.php',
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, data);
        if (response.data.status === 'success') {
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={{margin: 10}}>
      <TouchableOpacity onPress={() => chooseFile('photo')}>
        {user_image === null ? (
          <Text
            style={{
              width: '100%',
              height: 180,
              marginTop: 10,
              resizeMode: 'stretch',
            }}>
            Uploade Image
          </Text>
        ) : (
          <Image
            source={{
              uri: user_image.uri,
            }}
            style={{
              width: '100%',
              height: 180,
              marginTop: 10,
              resizeMode: 'stretch',
            }}
          />
        )}
      </TouchableOpacity>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setFirst(text)}
        value={First}
        placeholder=" First name"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setlast_name(text)}
        value={last_name}
        placeholder=" Last name"
      />

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setemail(text)}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setphone(text)}
        value={phone}
        placeholder="Phone"
        keyboardType="number-pad"
        maxLength={10}
      />
      <Button title="Sumit" onPress={loginApi} />
    </View>
  );
};

export default Detailscreen;
