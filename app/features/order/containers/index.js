// React Native Tab - Example using React Navigation V5 //
// https://aboutreact.com/react-native-tab //
import 'react-native-gesture-handler';

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Ordered from './Ordered';
import OrderCart from './OrderCart';
import OrderBefore from './OrderBefore';
import { COLORS } from '../../../utils/colors';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Order"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
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
      }}>
      <Tab.Screen
        name="OrderBefore"
        component={OrderBefore}
        // children={ () => <OrderBefore refresh={true} /> }
        options={{
          tabBarLabel: 'Pesanan',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
      <Tab.Screen
        name="OrderCart"
        component={OrderCart}
        options={{
          tabBarLabel: 'Dikirim',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="settings" color={color} size={size} />
          // ),
        }} />
      <Tab.Screen
        name="Ordered"
        component={Ordered}
        options={{
          tabBarLabel: 'Selesai',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons name="home" color={color} size={size} />
          // ),
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