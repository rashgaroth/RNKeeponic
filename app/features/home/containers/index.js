import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import { 
  View, 
  StatusBar, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  RefreshControl,
  Animated,
  TextInput,
  Keyboard,
  Image, 
} from 'react-native';
import { IconButton } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import * as homeAction from '../actions';
import * as loginAction from '../../login/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from "../../../utils/stringUtils";
import { KpnWideCard, KpnCardProducts, KpnLifeStyleCard, KpnButton } from "../../../components";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { navigate, navigationRef } from "../../../navigation/NavigationService";
import Swiper from "../components/Swiper";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  // const onLogout = () => dispatch(loginActions.logOut());
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState(null);
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [indexBottomSheet, setIndexBottomSheet] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productAvatar, setProductAvatar] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productId, setProductId] = useState(0);

  let scrollX = useRef(new Animated.Value(0)).current;
  let scrollY = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);
  const bottomSheetRef = useRef(null);
  // const fall = new Animated.Value(1);

  const snapPoints = useMemo(() => [0, '60%'], []);

  const homeSelector = useSelector(state => state.homeReducer)
  const loginSelector = useSelector(state => state.loginReducer)

  const allProducts = homeSelector.allProducts;

  const onPressMenuDivider = (type) => {
    navigationRef.current?.navigate(type)
  }
  
  async function fetchAllHomeRequest(){
      dispatch(homeAction.showLoading())
      if(loginSelector.isUserRegistered){
        await dispatch(homeAction.requestHome(name, loginSelector.user.user_id, 0, false))
        await dispatch(homeAction.getUserProfile("", loginSelector.user.user_id))
        setName(loginSelector.user.name)
      }else{
        await dispatch(homeAction.requestHome(name, 0, 0))
        setName("Kamu")
      }
  }

  const onRefreshAll = async () => {
    await fetchAllHomeRequest();
  }

  useEffect(() => {
    SplashScreen.hide();
    fetchAllHomeRequest();
    setIndexBottomSheet(0);
  }, [])

  const onNavigateToDetail = (user_id, product_id) => {
    const param = {
      // userId: user_id, 
      productId: product_id
    }
    navigate("ProductDetail", param)
  }

  const onTextInputFocus = () => {
    setIsFocus(true)
  }

  const onTextInputBlur = () => {
    setIsFocus(false)
  }

  const onPressBell = () => {
    console.log("aa");
  }

  const diffClampSearchContainer = Animated.diffClamp(scrollY, 0, 60);

  const translateSearchContainer = diffClampSearchContainer.interpolate({
    inputRange: [0, 0, 0, 60],
    outputRange: [0, 0, 0, -60]
  });

  const onPressBottomAvatar = (title, avatar, description, id) => {
    setIndexBottomSheet(1)
    setProductTitle(title)
    setProductAvatar(avatar)
    setProductDescription(description)
    setProductId(id)
    console.log(homeSelector.userAddress, "scroll")
  }

  const handleSheetChanges = useCallback( async (index) => {
      // setIndexBottomSheet(0)
      // setProductTitle("")
      // await setProductAvatar("")
      // setProductDescription("")
      console.log(scrollY, "scroll after")
  }, [null]);

  const RenderBottomSheet = () => {
    return <BottomSheet
      ref={bottomSheetRef}
      index={indexBottomSheet}
      snapPoints={snapPoints}
      key={productId}
      // onChange={handleSheetChanges}
      backdropComponent={ (backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      ) }
    >
    <BottomSheetScrollView>
      <View>
        <Image
          source={{ uri: productAvatar ? productAvatar : "https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles.png"}}
          style={{
            // width: width,
            height: 200,
            marginHorizontal: 10,
            borderRadius: 16
          }}
        />
        <Text style={{
           alignSelf: "center", 
           fontWeight: "bold", 
           fontSize: 20, 
           marginTop: 10, 
           marginHorizontal: 10 
           }}
           >
             { productTitle ? productTitle : "-------"}
             </Text>
        <View style={{ 
          height: 1, 
          marginHorizontal: 20, 
          backgroundColor: COLORS.colorC4, 
          marginTop: 10, 
          marginBottom: 10}} 
          />
        <Text style={styles.textLebihHemat}>{productDescription}</Text>
        <View style={{ height: 1, marginHorizontal: 20, backgroundColor: COLORS.colorC4, marginTop: 10, marginBottom: 10}} />
      </View>
        <KpnButton
          text="Lihat Detail Produk"
          isRounded
          mode="outlined"
          labelStyle={COLORS.primaryColor}
          onPress={console.log("test")}
          color={COLORS.sans}
          style={{
            height: 35,
            marginTop: 10,
            width: width - 20,
            marginHorizontal: 10
          }}
        />
        <KpnButton
          text="Beli Produk"
          isRounded
          color={COLORS.sans}
          style={{
            height: 35,
            width: width - 20,
            marginTop: 10,
            marginHorizontal: 10
           }}
        />
    </BottomSheetScrollView>
    </BottomSheet>
  }

  const renderSkeleton = (name, size=1) => {
    if(name === "paket"){
      return (
        <View style={{ flexDirection: "row" }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 170,
              borderRadius: 16,
              marginLeft: 10
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 170,
              borderRadius: 16,
              marginLeft: 10
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 170,
              borderRadius: 16,
              marginLeft: 10
            }}
          />
        </View>
    )
  }else if( name === "lifestyle"){
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <View style={{ marginHorizontal: 10 }}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 80,
              borderRadius: 16,
              marginTop: 10,
              // marginLeft: 10
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 80,
              borderRadius: 16,
              marginTop: 10,
              // marginLeft: 10
            }}
          />
        </View>
        <View style={{}}>
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 80,
              borderRadius: 16,
              marginTop: 10,
              // marginLeft: 10
            }}
          />
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
              width: 170,
              height: 80,
              marginTop: 10,
              borderRadius: 16,
              // marginLeft: 10
            }}
          />
        </View>
      </View>
    )
  }else{
    return(
      <View style={{ flexDirection: "row" }}>
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          // visible={homeSelector.isLoading}
          style={{
            width: 170,
            height: 170,
            borderRadius: 16,
            marginLeft: 10
          }}
        />
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          // visible={homeSelector.isLoading}
          style={{
            width: 170,
            height: 170,
            borderRadius: 16,
            marginLeft: 10
          }}
        />
      </View>
    )
  }

}

  return (
    <View style={styles.containerView}>
      {/* SearchBar */}
        <Animated.View style={{
          transform: [{ translateY: translateSearchContainer }], 
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: COLORS.sans,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
          elevation: 4,
          zIndex: 100,
        }}>
        <AvoidKeyboard>
          <TextInput
            ref={textInputRef}
            placeholder="Cari Disini"
            clearButtonMode="always"
            value={word}
            onChangeText={(value) => setWord(value)}
            style={styles.input}
            onFocus={() => onTextInputFocus()}
            onBlur={() => onTextInputBlur()}
            clearTextOnFocus
          />
        </AvoidKeyboard>
        <IconButton icon="bell-outline" color={COLORS.white} onPress={() => onPressBell()} style={{ marginRight: 20 }} />
      </Animated.View>
      <Animated.ScrollView style={[styles.container, /* { opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)), } */]} 
      refreshControl={
      <RefreshControl 
      refreshing={homeSelector.isLoading}
      onRefresh={onRefreshAll} 
      style={{ paddingTop: 60 }}
      />
    }
    onScroll={(e) => {
      scrollY.setValue(e.nativeEvent.contentOffset.y)
    }}
    scrollEnabled={!homeSelector.isLoading}
    >
        <StatusBar backgroundColor={COLORS.sans} />
        <Spinner
          visible={homeSelector.spinnerLoading}
          textContent={''}
          textStyle={{ color: COLORS.white }}
        />
        {/* <Text style={styles.textMenuButton}>Selamat datang, {name}!</Text> */}
        <Swiper />
        <View>
          <View>
            <View style={styles.textMenuHidroponik}>
              <Text style={styles.textPaketHidroponik}>Paket Hidroponik</Text>
              <TouchableOpacity onPress={(e) => console.log("homeSelector")}>
                <Text style={styles.textLihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text>
            <View style={styles.cardProducts}>
              {homeSelector.isLoading ? renderSkeleton ("paket") :
                <FlatList
                  horizontal
                  data={homeSelector.products}
                  snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                  contentContainerStyle={{
                    paddingRight: width - ITEM_WIDTH - SPACING * 2,
                  }}
                  renderItem={({ item }) => (
                    <KpnCardProducts
                      key={item.id}
                      rating={item.rating}
                      title={truncate(item.name, 30)}
                      image={item.avatar}
                      price={item.price}
                      onPress={() => onNavigateToDetail(0, item.id) }
                      onPressAvatar={() => onNavigateToDetail(0, item.id)}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                />
              }
            </View>
            <View style={styles.textMenuHidroponik}>
              <Text style={styles.textPaketHidroponik}>Galeri Hidroponik & Kreativitas</Text>
              <TouchableOpacity onPress={(e) => console.log("aa")}>
                <Text style={styles.textLihatSemua}>Lihat Semua</Text>
              </TouchableOpacity>
              <Text style={styles.textLebihHemat}>Jadikan sumber inspirasimu!</Text>
            </View>
            <View style={styles.cardLifestyle}>
              {
                homeSelector.isLoading ? renderSkeleton("lifestyle") : 
                <>
                  <View style={styles.cardLifestyle1}>
                    <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles.png" />
                      <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_2.jpg" />
                  </View>
                  <View style={styles.cardLifestyle2}>
                      <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_3.jpg" />
                      <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_4.jpg" />
                  </View>
              </>
              }
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
                data={homeSelector.products}
                snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                contentContainerStyle={{
                  paddingRight: width - ITEM_WIDTH - SPACING * 2,
                }}
                renderItem={({ item }) => (
                  <KpnCardProducts
                    key={item.id}
                    rating={item.rating}
                    title={truncate(item.name, 30)}
                    image={item.avatar}
                    price={item.price}
                    onPress={() => onNavigateToDetail(0, item.id)}
                    onPressAvatar={() => onNavigateToDetail(0, item.id)}
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
            </View>
              <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
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
            </View>
              <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
            {/* Flatlist untuk terdekat */}
            <View style={styles.cardProducts}>
              <FlatList
                horizontal
                data={homeSelector.products}
                snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                contentContainerStyle={{
                  paddingRight: width - ITEM_WIDTH - SPACING * 2,
                }}
                renderItem={({ item }) => (
                  <KpnCardProducts
                    key={item.id}
                    rating={item.rating}
                    title={truncate(item.name, 30)}
                    image={item.avatar}
                    price={item.price}
                    onPress={() => onNavigateToDetail(0, item.id)}
                    onPressAvatar={() => onNavigateToDetail(0, item.id)}
                  />
                )}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
              />
            </View>
            {/* Other Products */}
            <View>
              <Text style={styles.textPaketHidroponik}>Produk lainnya</Text>
              <Text style={styles.textLebihHemat}>Produk lain nya, hanya di KEEPONIC</Text>
            </View>
            <View style={styles.otherProducts}>
                { 
                allProducts ? allProducts.map((data, index) => (
                  <View key={index}>
                    <KpnCardProducts
                      key={data.id}
                      rating={data.rating}
                      title={truncate(data.name, 30)}
                      image={data.avatar}
                      price={data.price}
                      onPress={() => onNavigateToDetail(0, data.id)}
                      onPressAvatar={() => onNavigateToDetail(0, data.id)}
                    />
                  </View>
                )) : null
                }
            </View>
          </View>
          <View style={{ height: 60, width: width }}></View>
      </View>
    </Animated.ScrollView>
    {/* {renderBottomSheet()} */}
      {/* <RenderBottomSheet /> */}
    </View>
  );
}
