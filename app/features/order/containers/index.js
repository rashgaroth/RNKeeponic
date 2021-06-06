// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Ordered from './Ordered';
import OrderCart from './OrderCart';
import OrderBefore from './OrderBefore';
import OrderSuccess from './OrderSuccess';
import { COLORS } from '../../../utils/colors';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {

  const [iconColor, setIconColor] = useState(COLORS)

  return (
    <Tab.Navigator
      initialRouteName="Order"
      tabBarPosition="top"
      tabBarOptions={{
        activeTintColor: COLORS.white,
        inactiveTintColor: COLORS.white,
        style: {
          backgroundColor: COLORS.sans,
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: COLORS.white,
          borderBottomWidth: 2,
        },
        showIcon: true,
      }}>
      <Tab.Screen
        name="OrderBefore"
        component={OrderBefore}
        options={{
          tabBarBadge: 3,
          tabBarLabel: 'Keranjang',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="shopping-cart" size={20} color={COLORS.white} />
          ),
        }} />
      <Tab.Screen
        name="OrderCart"
        component={OrderCart}
        options={{
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({ tintColor }) => (
            <Icon {...tintColor} name="send" size={20} color={COLORS.white} />
          ),
        }} />
      <Tab.Screen
        name="Ordered"
        component={Ordered}
        options={{
          tabBarLabel: 'Ditujuan',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="truck" size={20} color={COLORS.white} />
          )
        }} />
    </Tab.Navigator>
  );
}

function App() {
  return (
      <Stack.Navigator
        initialRouteName="OrderBefore"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.sans },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' }
        }}>
        <Stack.Screen name="TabStack" component={TabStack} options={{ title: 'Pesanan' }} />
      </Stack.Navigator>
  );
}

export default App;