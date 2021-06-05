import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';

import { navigationRef } from './NavigationService';
import { enableScreens } from 'react-native-screens';

import { 
  BottomNavigationTab, 
  Cart, 
  Home, 
  Liked, 
  Login, 
  Notification, 
  Package,
  LifeStyleDetail,
  ProductDetail,
  Register,
  RegisterNext,
  RegisterPassword,
  RegisterPhoneName,
  RegisterVerification,
  WelcomePage,
  SellerRegistration,
  SellerRegistrationNext,
  SellerRegistrationSuccess,
  SellerRegistrationMarketName,
  OrderDetail,
  OrderSuccess
} from "../features";

const Stack = createStackNavigator();

const homeOptions = {
  headerShown: false,
};

function App() {
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  console.log(isLoggedIn, "logged in")
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ? 
          <Stack.Screen name="Home" component={BottomNavigationTab} options={homeOptions} />
          : 
          <Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerShown: false
            }}
          />
        }
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
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: true,
            title: "Masukkan Email"
          }}
        />
        <Stack.Screen
          name="RegisterNext"
          component={RegisterNext}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="RegisterPassword"
          component={RegisterPassword}
          options={{
            headerShown: true,
            title: "Masukkan Password"
          }}
        />
        <Stack.Screen
          name="RegisterPhoneName"
          component={RegisterPhoneName}
          options={{
            headerShown: true,
            title: "Masukkan Nomor Telepon"
          }}
        />
        <Stack.Screen
          name="RegisterVerification"
          component={RegisterVerification}
          options={{
            headerShown: true,
            title: "Masukkan Kode Verifikasi"
          }}
        />
        <Stack.Screen
          name="SellerRegistration"
          component={SellerRegistration}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SellerRegistrationNext"
          component={SellerRegistrationNext}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SellerRegistrationSuccess"
          component={SellerRegistrationSuccess}
          options={{
            headerShown: false,
          }}
        />
      <Stack.Screen
        name="SellerRegistrationMarketName"
        component={SellerRegistrationMarketName}
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{
            headerShown: false,
          }}
        />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{
          headerShown: true,
          title: "Pengiriman",
          gestureEnabled: true,
          headerTitleAlign: "center"
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
