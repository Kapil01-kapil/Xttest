import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  FlatList,
  Platform,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  Text,
} from 'react-native';
import axios from 'axios';
import Offset from '../components/Offset';
import Card from '../components/Card';
const Home = (props) => {
  const [offers, setoffers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    var data = new FormData();
    data.append('user_id', '108');
    data.append('offset', '0');
    data.append('type', 'popular');

    let config = {
      method: 'post',
      url: 'http://dev1.xicom.us/xttest/getdata.php',

      data: data,
    };

    axios(config)
      .then(function (response) {
        // handle success
        console.log(response.data);

        setoffers(response.data.images);

        // alert(JSON.stringify(response.data));
      })
      .catch(function (error) {
        // handle error
        //alert(error.message);
      });
  };
  return (
    <View>
      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card
            style={{
              width: '100%',
              height: 300,
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Detailscreen', {
                  xt_image: item.xt_image,
                });
              }}>
              <Image
                source={{uri: item.xt_image}}
                style={{width: '100%', height: 300, marginTop: 10}}
              />
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
};

export default Home;
