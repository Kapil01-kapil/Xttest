//Imports
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import Detailscreen from '../screen/Detailscreen';

// Sidemenu Dashboard
const StackNavigator = createStackNavigator();

function StackNavigation() {
  return (
    <NavigationContainer>
      <StackNavigator.Navigator screenOptions={{gestureEnabled: false}}>
        <StackNavigator.Screen
          name="Home"
          component={Home}
          options={{headerShown: false, gesturesEnabled: false}}
        />
        <StackNavigator.Screen
          name="Detailscreen"
          component={Detailscreen}
          options={{headerShown: false, gesturesEnabled: false}}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigation;
