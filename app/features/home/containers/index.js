import React, {useState, useEffect} from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay"
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

import { useDispatch, useSelector } from 'react-redux';
import * as homeAction from '../actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate, getInitials } from "../../../utils/stringUtils";
import { KpnWideCard, KpnDivider, KpnCardProducts, KpnLifeStyleCard } from "../../../components";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { navigationRef } from "../../../navigation/NavigationService";
import { getStore } from "../../../services/asyncStorage";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  // const onLogout = () => dispatch(loginActions.logOut());
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState('');

  const homeSelector = useSelector(state => state.homeReducer)

  const menu = {
    title: [
      "Keranjang Belanja",
      "Notifikasi",
      "Atur",
      "Disukai",
      "Paket"
    ],
    icons: [
      ["cart-outline", "Keranjang Belanja", "Cart"],
      ["bell-outline", "Notifikasi", "Notification"],
      ["heart-outline", "Disukai", "Liked"],
      ["package-variant-closed", "Paket", "Package"],
    ]
  }

  const onPressMenuDivider = (type) => {
    navigationRef.current?.navigate(type)
  }

  async function store(key){
    try {
      await getStore(key).then((value) => {
        console.log(value)
        if(key === 'name'){
          setName(value)
        }else if(key === 'user_id'){
          setUserId(value)
        }else{
          return value
        }
        return value
      }).catch((e) => {
        return e
      });
    } catch (error) {
      throw error.message
    }
  }

  useEffect(() => {

    store('name')
    store('user_id')

    async function fetchAllHomeRequest(){
      await dispatch(homeAction.requestHome(name, userId))
    }

    fetchAllHomeRequest()

  }, [])

  return (
    <ScrollView style={styles.container}>
        <StatusBar backgroundColor={COLORS.sans} />
        <Spinner
          visible={homeSelector.isLoading}
          textContent={'Mohon Tunggu ...'}
          textStyle={{ color: COLORS.white }}
        />
        <View style={styles.searchView}>
          <Text style={styles.address}>Kosan Mandor</Text>
          <Button icon="chevron-down" style={styles.buttonDown} color={COLORS.white} />
          {/* LOGO */}
          <LogoRounded style={styles.logo} width={30} height={40} />
        </View>
        <View>
          <Text style={styles.textMenuButton}>Selamat datang, {name}!</Text>
          <View style={styles.menuButton}>
            {menu.icons.map((a, b) => (
              <TouchableOpacity key={b} onPress={(e) => onPressMenuDivider(a[2])}>
                <View>
                  <KpnDivider
                    style={styles.dividerMenuButton}
                    height={65}
                    width={65}
                    radius={50}
                    color={COLORS.colorC4}
                  />
                  <IconButton icon={a[0]} style={styles.iconMenuButton} size={40} color={COLORS.white} />
                  <Text style={
                    a[1] === "Keranjang Belanja" ? {
                      position: 'absolute',
                      alignSelf: "flex-end",
                      textAlign: "center",
                      top: 85,
                      left: 12,
                      color: COLORS.fontColor,
                    }
                      : a[1] === "Notifikasi" ? {
                        position: 'absolute',
                        alignSelf: "flex-end",
                        textAlign: "center",
                        top: 85,
                        left: 12,
                        color: COLORS.fontColor,
                      } : styles.textMenuButtonInside}>{a[1]}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View>
          <SkeletonContent
            containerStyle={{ flex: 1 }}
            isLoading={homeSelector.isLoading}
            layout={[
              { key: '1', width: 220, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '2', width: 180, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '3', width: 400, height: 130, marginTop: 10, marginLeft: 10 },
              { key: '4', width: 220, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '5', width: 180, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '6', width: 400, height: 130, marginTop: 10, marginLeft: 10 },
              { key: '7', width: 220, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '8', width: 180, height: 20, marginTop: 10, marginLeft: 10 },
              { key: '9', width: 400, height: 130, marginTop: 10, marginLeft: 10 },
            ]}
            animationType="pulse"
            animationDirection="horizontalLeft" 
          >
          <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>Paket Hidroponik</Text>
            <TouchableOpacity onPress={(e) => console.log("homeSelector")}>
              <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text>
          <View style={styles.cardProducts}>
            <FlatList
              horizontal
              data={homeSelector.products}
              snapToInterval={ ITEM_WIDTH + SPACING * 1.6 }
              contentContainerStyle={{
                paddingRight: width - ITEM_WIDTH - SPACING * 2,
              }}
              renderItem={({ item }) => (
                <KpnCardProducts
                  rating={item.rating}
                  title={truncate(item.name, 30)}
                  image={item.avatar}
                />
              )}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>Gaya Hidup & Kreativitas</Text>
            <TouchableOpacity onPress={(e) => console.log("aa")}>
              <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardLifestyle}>
            <View style={styles.cardLifestyle1}>
              <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} />
              <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} />
            </View>
            <View style={styles.cardLifestyle2}>
              <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} />
              <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} />
            </View>
          </View>
          <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>Khusus Untuk John Doe</Text>
            <TouchableOpacity>
              <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
            <Text style={styles.textLebihHemat}>Barang yang direkomendasikan untuk anda!</Text>
          </View>
          {/* Flatlist untuk rekomendasi */}
          <View style={styles.cardProducts}>
            <FlatList
              horizontal
              data={homeSelector.dummyProducts.flatListData}
                snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                contentContainerStyle={{
                  paddingRight: width - ITEM_WIDTH - SPACING * 2,
                }}
              renderItem={({ item }) => (
                <KpnCardProducts
                  rating={item.rating}
                  title={item.name}
                />
              )}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
          <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>Inspirasi & Edukasi</Text>
            <TouchableOpacity>
              <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
            <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
          </View>
          <View style={styles.wideCards}>
            {/* <KpnWideCard /> */}
            {/* FlatList Inspirasi */}
            <View style={styles.cardProducts}>
              <FlatList
                horizontal
                data={homeSelector.dummyProducts.flatListWideView}
                  snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                  contentContainerStyle={{
                    paddingRight: width - ITEM_WIDTH - SPACING * 2,
                  }}
                renderItem={({ item }) => (
                  <KpnWideCard
                    title={item.name}
                    image={item.image}
                    paragraph={item.text}
                  />
                )}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </View>
          </View>
          <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>Terdekat dari rumah anda</Text>
            <TouchableOpacity>
              <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
            <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
          </View>
          {/* Flatlist untuk terdekat */}
          <View style={styles.cardProducts}>
            <FlatList
              horizontal
              data={homeSelector.dummyProducts.flatListData}
                snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                contentContainerStyle={{
                  paddingRight: width - ITEM_WIDTH - SPACING * 2,
                }}
              renderItem={({ item }) => (
                <KpnCardProducts
                  rating={item.rating}
                  title={item.name}
                />
              )}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
          </SkeletonContent>
        </View>
      </View>
    </ScrollView>
  );
}
