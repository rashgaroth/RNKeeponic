import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

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
  OrderSuccess,
  ArticleDetail,
  OrderDetailWebview
} from "../features";

// const Stack = createStackNavigator();
const Stack = createSharedElementStackNavigator();
// const Stacka = createSharedElementStackNavigator();

const homeOptions = {
  headerShown: false,
};

function App() {
  const [loggedIn, setLoggedIn] = useState('')
  const isLoggedIn = useSelector(state => state.loginReducer.isLoggedIn);
  console.log(isLoggedIn, "logged in")

  // useEffect(() => {
  //   const getStorage = async () => {
  //     await AsyncStorage.getItem("@isLoggedIn").then((data) => {
  //       setLoggedIn(data)
  //     })

  //     await AsyncStorage.getItem("@token").then((data) => {
  //       console.log(data, "token")
  //     })
  //   }

  //   getStorage()
  // }, [null])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isLoggedIn ?
          (<Stack.Screen 
            name="Home"
            component={BottomNavigationTab}
            options={homeOptions}
            />)
          : 
          (<Stack.Screen
            name="WelcomePage"
            component={WelcomePage}
            options={{
              animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
              headerShown: false
            }}
          />)}
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
          headerShown: false,
          // title: "Pengiriman",
          gestureEnabled: false,
          // headerTitleAlign: "center"
        }}
      />
        <Stack.Screen
          name="OrderDetailWebview"
          component={OrderDetailWebview}
          options={(props) => ({
            headerShown: true,
            title: props.route.params.avatar ? "Pembayaran" : "Halaman Keeponic",
            gestureEnabled: false,
            headerLeft: null
            // headerTitleAlign: "center"
          })}
        />
        <Stack.Screen
          name="ArticleDetail"
          component={ArticleDetail}
          options={{
            headerShown: false,
          }}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const { image } = route.params;
            return [`item.${image}.article`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
