import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Button, IconButton, Avatar, Switch } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay"
// import BottomSheet from '@gorhom/bottom-sheet';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
// import BottomSheet from 'reanimated-bottom-sheet';


import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { height, ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate, getInitials } from "../../../utils/stringUtils";
import { KpnWideCard, KpnDivider, KpnCardProducts, KpnLifeStyleCard } from "../../../components";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { navigationRef } from "../../../navigation/NavigationService";
import { getStore } from "../../../services/asyncStorage";
import { detailUser } from "../constant";

export default function Profile() {
  const [notificationSwitch, setNotificationSwitch] = useState(false);
  const [recommendationSwitch, setRecommendationSwitch] = useState(false);

  const dispatch = useDispatch();

  const onLogout = () => dispatch(loginActions.logOut());
  const onSwitchNotification = () => setNotificationSwitch(!notificationSwitch);
  const onSwitchRecommendation = () => setRecommendationSwitch(!recommendationSwitch);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const openBottomSheet = () => bottomSheetRef.current.snapTo(0);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);
  const renderBottomSheet = () => {
    return(
      <View>
          <View>
            <Text>Awesome 🎉</Text>
          </View>
      </View>
    )
  }

  return (
    <ScrollView>
      <StatusBar backgroundColor={COLORS.sans} />
      <Spinner
        visible={false}
        textContent={'Mohon Tunggu ...'}
        textStyle={{ color: COLORS.white }}
      />
      <View style={stylesLocal.searchView}>
        <Text style={stylesLocal.address}>Profile</Text>
        {/* LOGO */}
        <LogoRounded style={stylesLocal.logo} width={30} height={40} />
      </View>
      <View style={stylesLocal.avatar}>
        {/* uri di ambil dari be */}
        <Avatar.Image size={200} source={{ uri: "https://cdn-asset.jawapos.com/wp-content/uploads/2019/08/sapi-via-vallen-dimas-maulana.jpg" }} />
      </View>
      {/* View Detail User */}
      {
        detailUser.map((x, i) => (
          <View key={i}>
            <TouchableOpacity onPress={(e) => openBottomSheet()}>
            <View style={stylesLocal.detailUsers}>
              <Text style={stylesLocal.textTitle}>{x.title}</Text>
              <Text style={stylesLocal.textDesc}>{x.content}</Text>
            </View>
              <View style={stylesLocal.line}></View>
            </TouchableOpacity>
          </View>
        ))
      }
      {/* View Button */}
      <View style={stylesLocal.buttonGroup}>
        <Button mode="contained" onPress={(e) => console.log(e)} style={stylesLocal.button} color={COLORS.primaryColor}>Ubah Password</Button>
        <Button mode="contained" onPress={(e) => console.log(e)} style={stylesLocal.button} color={COLORS.primaryColor}>Daftar Toko</Button>
      </View>
      {/* View Setting ON/OFF */}
      <View>
        <View style={stylesLocal.detailUsers}>
          <Text style={stylesLocal.textTitle}>Notifikasi</Text>
          <View style={stylesLocal.switch}>
            <Text style={stylesLocal.textDesc}>Izinkan Aplikasi memberikan Notifikasi</Text>
            <Switch value={notificationSwitch} onValueChange={onSwitchNotification} color={COLORS.primaryColor} />
          </View>
        </View>
        <View style={stylesLocal.line}></View>
      </View>
      {/* skip */}
      <View>
        <View style={stylesLocal.detailUsers}>
            <Text style={stylesLocal.textTitle}>Rekomendasi</Text>
          <View style={stylesLocal.switch}>
            <Text style={stylesLocal.textDesc}>Izinkan Aplikasi memberikan Rekomendasi</Text>
            <Switch value={recommendationSwitch} onValueChange={onSwitchRecommendation} color={COLORS.primaryColor}/>
          </View>
        </View>
        <View style={stylesLocal.line}></View>
      </View>
      {/* View Button Update & Logout */}
      <View style={stylesLocal.buttonGroup}>
        <Button mode="contained" onPress={(e) => console.log(e)} style={stylesLocal.button} disabled color={COLORS.primaryColor}>Ubah Profile</Button>
        <Button mode="contained" onPress={(e) => console.log(e)} style={stylesLocal.button} color={COLORS.red}>Keluar Akun</Button>
      </View>
      {/* View Tetang */}
      <View>
        <Text>Tentang</Text>
        <View>
          <View style={stylesLocal.detailUsers}>
            <View style={stylesLocal.switch}>
              <Text style={stylesLocal.textInfo}>Tentang Keeponic</Text>
              <IconButton style={stylesLocal.infoIcon} icon="information-outline" size={25} />
            </View>
          </View>
          <View style={stylesLocal.line}></View>
        </View>

        <View>
          <View style={{marginLeft: 10}}>
            <View style={stylesLocal.switch}>
              <Text style={stylesLocal.textInfo}>Bantuan</Text>
              <IconButton style={stylesLocal.infoIcon} icon="information-outline" size={25} />
            </View>
          </View>
          <View style={stylesLocal.line}></View>
        </View>
      </View>
      {/* <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[260, 0]}
        renderContent={renderBottomSheet}
        initialSnap={1}
        enabledGestureInteraction={true}
      /> */}
    </ScrollView>
  );
}

// const { width, height } = Dimensions.get('window')

const stylesLocal = StyleSheet.create({
  searchView: {
    backgroundColor: COLORS.sans,
    height: 50
  },
  address: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.white,
    left: 10,
    top: 20
  },
  buttonDown: {
    color: COLORS.white,
    position: 'absolute',
    width: 20,
    left: 120,
    top: 17
  },
  logo: {
    alignSelf: 'flex-end',
    marginRight: 10,
    bottom: 20,
  },
  avatar:{
    alignSelf: "center",
    marginTop: 20
  },
  detailUsers:{
    marginLeft: 10,
    marginTop: 20
  },
  textTitle: {
    fontWeight: "bold"
  },
  textDesc: {
  },
  line: {
    width: width,
    height: 1,
    backgroundColor: COLORS.colorC4,
    alignSelf: "flex-start",
    marginTop: 5,
    marginHorizontal: 10
  },
  buttonGroup: {
    margin: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button:{
    borderRadius: 15,
    width: 200,
    color: COLORS.white
  },
  switch:{
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInfo: {
    paddingTop: 15
  }
})
