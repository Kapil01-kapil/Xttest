import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import Card from './Card';
const Offset = (props) => {
  //   if (Platform.OS === 'android' && Platform.Version >= 21) {
  //     TouchableOpacity = TouchableNativeFeedback;
  //   }
  return (
    <Card styles={styles.product}>
      <View style={styles.touchle}>
        <TouchableOpacity onPress={props.onSelect}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: props.image}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  product: {
    width: 150,

    height: '50%',
  },
  touchle: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '55%',
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  details: {
    marginLeft: 10,
    marginTop: 5,
    height: '10%',
    width: '100%',
  },
});
export default Offset;
