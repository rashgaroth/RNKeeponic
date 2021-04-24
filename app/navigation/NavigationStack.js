import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { navigationRef } from './NavigationService';

import { 
  BottomNavigationTab, 
  Cart, 
  Home, 
  Liked, 
  Login, 
  Notification, 
  Package,
  LifeStyleDetail,
  ProductDetail
} from "../features";

import { COLORS } from '../utils/colors';
import FBSearchBar from '../features/productDetail/containers';

const Stack = createStackNavigator();

const homeOptions = {
  headerShown: false,
};

function App() {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={BottomNavigationTab} options={homeOptions} />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerShown: false
            }}
          />
        )}
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Liked"
          component={Liked}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Package"
          component={Package}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="LifeStyleDetail"
          component={LifeStyleDetail}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
