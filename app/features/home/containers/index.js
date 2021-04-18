import React, {useState, useEffect} from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay"
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

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
  const load = true

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
  
  async function fetchAllHomeRequest(){
    await dispatch(homeAction.requestHome(name, userId))
  }

  const onRefreshAll = () => {
    fetchAllHomeRequest();
  }

  useEffect(() => {

    store('name')
    store('user_id')

    fetchAllHomeRequest()

  }, [])

  const renderSkeleton = () => {

    let arr = [1,2,3];

    return (
      <View>
          <View>
            <View style={[styles.skeletonChild, { marginTop: 10 }]}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  {/* <SkeletonPlaceholder.Item width={60} height={69} borderRadius={15} /> */}
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={90} height={20} borderRadius={4} />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>

              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                  {/* <SkeletonPlaceholder.Item width={60} height={69} borderRadius={15} /> */}
                  <SkeletonPlaceholder.Item marginLeft={20}>
                    <SkeletonPlaceholder.Item width={90} height={20} borderRadius={4} />
                    <SkeletonPlaceholder.Item
                      marginTop={6}
                      width={80}
                      height={20}
                      borderRadius={4}
                    />
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          </View>
      {
        arr.map((x, i) => (
          <View style={[styles.skeleton, { marginLeft: 7, marginTop: 10 }]} key={i}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item width={60} height={69} borderRadius={15} />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item width={90} height={20} borderRadius={4} />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>

            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <SkeletonPlaceholder.Item width={60} height={69} borderRadius={15} />
                <SkeletonPlaceholder.Item marginLeft={20}>
                  <SkeletonPlaceholder.Item width={90} height={20} borderRadius={4} />
                  <SkeletonPlaceholder.Item
                    marginTop={6}
                    width={80}
                    height={20}
                    borderRadius={4}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        ))
      }
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} refreshControl={
      <RefreshControl 
        refreshing={homeSelector.isLoading}
        onRefresh={onRefreshAll}
      />
    }>
        <StatusBar backgroundColor={COLORS.sans} />
        {/* <Spinner
          visible={homeSelector.isLoading}
          textContent={'Mohon Tunggu ...'}
          textStyle={{ color: COLORS.white }}
        /> */}
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
          {/* Untuk saat ini belum dapat menggunakan skeleton karna terdapat bugs yang terjadi
              di react-native-reanimated = perbedaan versi dengan peerdependecies nya si skeleton */}
          {homeSelector.isLoading ? renderSkeleton() : <View>
            <View style={styles.textMenuHidroponik}>
              <Text style={styles.textPaketHidroponik}>Paket Hidroponik</Text>
              <TouchableOpacity onPress={(e) => console.log("homeSelector")}>
                <Text style={styles.textLihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text>
            <View style={styles.cardProducts}>
              {
                <FlatList
                  horizontal
                  data={homeSelector.products}
                  snapToInterval={ITEM_WIDTH + SPACING * 1.6}
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
              }
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
          </View>}
          
          {/* </SkeletonContent> */}
        </View>
      </View>
    </ScrollView>
  );
}
