import React from 'react';
import { View, StatusBar, ScrollView, Text } from 'react-native';
import { Button, IconButton } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/features/login/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { KpnSearchBar, KpnDivider } from "../../../components";
import LogoRounded from "../../../assets/images/svg/LogoRounded";

export default function Home() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  const menu = {
    title: [
      "Keranjang Belanja",
      "Notifikasi",
      "Atur",
      "Disukai",
      "Paket"
    ],
    icons: [
      ["cart-outline", "Keranjang Belanja"],
      ["bell-outline", "Notifikasi"],
      ["heart-outline", "Disukai"],
      ["package-variant-closed", "Paket"],
    ]
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.sans} />
      <View style={styles.searchView}>
        <Text style={styles.address}>Kosan Mandar</Text>
        <Button icon="chevron-down" style={styles.buttonDown} color={COLORS.white}/>
        {/* LOGO */}
        <LogoRounded style={styles.logo} width={30} height={40} />
      </View>
      <View>
        <Text style={styles.textMenuButton}>Selamat datang, John Doe!</Text>
        <View style={styles.menuButton}>
          {menu.icons.map((a, b)=> (
            <View key={b}>
              <KpnDivider 
              style={styles.dividerMenuButton} 
              height={65} 
              width={65} 
              radius={10} 
              />
              <IconButton icon={a[0]} style={styles.iconMenuButton} size={40} color={COLORS.white} />
              <Text style={
                a[1] === "Keranjang Belanja" ? {
                position: 'absolute',
                alignSelf: "flex-end",
                textAlign: "center",
                top: 85,
                left: 12,
                color: COLORS.fontColor,} 
                  : a[1] === "Notifikasi" ? {
                    position: 'absolute',
                    alignSelf: "flex-end",
                    textAlign: "center",
                    top: 85,
                    left: 12,
                    color: COLORS.fontColor,
                  } : styles.textMenuButtonInside}>{a[1]}</Text>
            </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}
