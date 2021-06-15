import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
import UserProfile from "./userProfile";
import UserNotLoggedIn from "./userNotLoggedIn";
import { useDispatch, useSelector } from 'react-redux';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { WebView } from 'react-native-webview';

import * as homeAction from "../../home/actions";
import BottomSheetComponent from '../../home/components/BottomSheet';
import { height, width } from '../../../utils/theme';
import { COLORS } from '../../../utils/colors';

export default function Profile(){

  const dispatch = useDispatch();
  const loginState = useSelector(state => state.loginReducer);
  const isUserRegistered = loginState.isUserRegistered;

  const [url, setUrl] = useState("https://development.d3rwng03cwc4kn.amplifyapp.com/login")
  const [webView, setWebView] = useState(false)

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [0, "47%"], []);
  const bottomSheetQuisRef = useRef(null);
  const snapPointsQuis = useMemo(() => [0, "95%"], []);


  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSheetChangesQuis = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const onFinishLoading = async (subdistName, cityName, phone, postalCode) => {
    await dispatch(homeAction.getUserProfile("", loginState.user.user_id))
    bottomSheetRef.current.snapTo(0);
  }

  const openBottomSheet = () => {
    bottomSheetRef.current.snapTo(1);
  }

  const openQuisBottomSheet = (param) => {
    setUrl(param)
    setWebView(true)
  }

  return (
    isUserRegistered ? webView ? (
    <View style={{ height: height }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{
          fontWeight: "bold",
          fontSize: 17,
          alignSelf: "center",
          marginLeft: 20,
          color: COLORS.primaryColor
        }}>Keeponic v0.0.1</Text>
        <IconButton
          icon="close"
          color={COLORS.black}
          size={25}
          style={{ alignSelf: "flex-end"}}
          onPress={() => setWebView(false)}
        />
      </View>
      <WebView
        source={{ uri: url }}
      />
    </View>
    ) : (
    <>
    <UserProfile onAddress={() => openBottomSheet()} onQuis={(props) => openQuisBottomSheet(props)} />
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={styles.bottomSheet}
      backdropComponent={(props) => (<BottomSheetBackdrop {...props} enableTouchThrough={true} />)}
    >
      <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}> Isi Lokasi Pengiriman Mu ✔</Text>
        <BottomSheetComponent
          onFinishLoading={(subdistName, cityName, phone, postalCode) => onFinishLoading(subdistName, cityName, phone, postalCode)}
        />
      </BottomSheetScrollView>
    </BottomSheet>

    {/* <BottomSheet
      ref={bottomSheetQuisRef}
      index={0}
      snapPoints={snapPointsQuis}
      onChange={handleSheetChangesQuis}
      style={styles.bottomSheet}
      backdropComponent={(props) => (<BottomSheetBackdrop {...props} enableTouchThrough={true} />)}      
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.title}> Isi Kuisioner </Text>
        <View style={styles.webView}>
          <WebView 
              source={{ uri: url }} 
          />
        </View>
      </ScrollView>
    </BottomSheet> */}
    </>
    ) : (
    <UserNotLoggedIn />
    )
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    width: width,
    paddingBottom: 30,
    height: 400,
    maxHeight: height
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,

    elevation: 18,
  },
  title: {
    fontWeight: 'bold',
  },
  webView:{
    width: width,
    height: height
  }
})
