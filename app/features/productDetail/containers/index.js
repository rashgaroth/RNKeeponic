import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import { 
  View, 
  StatusBar, 
  StyleSheet, 
  TextInput, 
  Keyboard, 
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  FlatList,
  RefreshControl,
  Dimensions,
  Easing,
  TouchableNativeFeedback
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Chip, IconButton, Text, Button } from 'react-native-paper';
import { ExpandingDot } from "react-native-animated-pagination-dots";
import SnackBar from 'react-native-snackbar-component';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { useDispatch, useSelector } from 'react-redux';
// import styles from './styles';

import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { goBack, navigate } from "../../../navigation/NavigationService";
import { searchProduct, imageData } from "../constants";
import { convertToIdr, truncate } from "../../../utils/stringUtils";
import { widthScreen, width, heightScreen } from "../../../utils/theme";
import MarketInfo from '../components/MarketInfo';
import { KpnButton, KpnCardProducts, KpnSnackBar } from "../../../components";
import * as detailProductAction from "../actions";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';

const imageW = widthScreen;
const imageH = imageW * 1;

export default function Home(props) {
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [readableDesc, setReadableDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [bottomAction, setBottomAction] = useState(null);
  const [indexBottomSheet, setIndexBottomSheet] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productAvatar, setProductAvatar] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [validatorErrorMsg, setValidatorErrorMsg] = useState("");
  const [errVisible, setErrVisible] = useState(false);

  const dispatch = useDispatch();
  const homeSelector = useSelector(state => state.homeReducer)
  const detailProductSelector = useSelector(state => state.detailProductReducer);
  const textInputRef = useRef(null);
  const { mProducts } = detailProductSelector;
  const loading = detailProductSelector.loading
  let scrollX = React.useRef(new Animated.Value(0)).current;
  let scrollY = useRef(new Animated.Value(0)).current;
  const bottomSheetRef = useRef(null);
  // const fall = new Animated.Value(1);
  const snapPoints = useMemo(() => [0, '80%'], []);

  const debugginLoader = true;

  const onTextInputFocus = () => {
    setIsFocus(true)
  }

  const onTextInputBlur = () => {
    setIsFocus(false)
  }

  const onPressCart = () => {
    Keyboard.dismiss();
  }

  const onPressBell = () => {
    Keyboard.dismiss();
    console.log(detailProductSelector);
  }

  const onPressLove = () => {
    console.log(detailProductSelector);
    setIsLove(!isLove);
    setValidatorErrorMsg("Produk Disukai Ditambahkan");
    setErrVisible(true);
  }

  const onBackPressed = async () => {
    if(isFocus){
      setIsFocus(false);
      Keyboard.dismiss();
    }else{
      goBack();
      await dispatch(detailProductAction.setLoading(true));
    }
  }

  const onPressBuy = () => {
    console.log("Pressed")
  }

  const onPressSnackBarAction = () => {
    setErrVisible(false)
  }

  const onDissmissSnackBar = () => {
    setErrVisible(false)
  }

  const onRead = () => {
    if(!readableDesc){
      setDescription(mProducts.description);
      setReadableDesc(!readableDesc);
    }else{
      setDescription(truncate(mProducts.description, 200));
      setReadableDesc(!readableDesc);
    }
  }

  const fetchProductDetail = async () => {
    const {
      // userId,
      productId
    } = props.route.params;
    const param = {
      // user_id: userId,
      product_id: productId
    }
    await dispatch(detailProductAction.getDetailProduct(param));
  }

  useEffect(() => {
    fetchProductDetail()
  }, []);

  const diffClampSearchContainer = Animated.diffClamp(scrollY, 0, 60);
  const diffClampButtonGroup = Animated.diffClamp(scrollY, 0, 60);

  const translateSearchContainer = diffClampSearchContainer.interpolate({
    inputRange: [0, 60],
    outputRange: [0, -60]
  });

  const translateButtonGroup = diffClampButtonGroup.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  })

  const onNavigateToDetail = (user_id, product_id) => {
    const param = {
      // userId: user_id, 
      productId: product_id
    }
    navigate("ProductDetail", param)
  }

  const onPressBottomAvatar = (title, avatar, description) => {
    setIndexBottomSheet(1)
    setProductTitle(title)
    setProductAvatar(avatar)
    setProductDescription(description)
    Animated.timing(scrollY, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1000
    }).start();
  }

  const RenderBottomSheet = () => {
    return <BottomSheet
      ref={bottomSheetRef}
      index={indexBottomSheet}
      snapPoints={snapPoints}
      // onChange={handleSheetChanges}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      )}
    >
      <BottomSheetScrollView>
        <View>
          <Image
            source={{ uri: productAvatar ? productAvatar : "https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles.png" }}
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
            {productTitle ? productTitle : "-------"}
          </Text>
          <View style={{
            height: 1,
            marginHorizontal: 20,
            backgroundColor: COLORS.colorC4,
            marginTop: 10,
            marginBottom: 10
          }}
          />
          <Text style={styles.textLebihHemat}>{productDescription}</Text>
          <View style={{ height: 1, marginHorizontal: 20, backgroundColor: COLORS.colorC4, marginTop: 10, marginBottom: 10 }} />
        </View>
        <KpnButton
          text="Lihat Detail Produk"
          isRounded
          mode="outlined"
          labelStyle={COLORS.primaryColor}
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

  return (
    <>
      {/* SearchBar */}
      <Animated.View style={[styles.containerInput, { transform: [ { translateY: translateSearchContainer } ] }]}>
        <IconButton icon="keyboard-backspace" color={COLORS.white} onPress={onBackPressed} />
        <AvoidKeyboard>
          <TextInput
            ref={textInputRef}
            placeholder="Paket Hidroponik Pemula"
            clearButtonMode="always"
            value={word}
            onChangeText={(value) => setWord(value)}
            style={styles.input}
            onFocus={() => onTextInputFocus()}
            onBlur={() => onTextInputBlur()}
            disableFullscreenUI={true}
            clearTextOnFocus
          />
        </AvoidKeyboard>
        <IconButton icon="cart-outline" color={COLORS.white} onPress={() => onPressCart} />
        <IconButton icon="bell-outline" color={COLORS.white} onPress={() => onPressBell} />
      </Animated.View>
    <Animated.ScrollView style={styles.container} refreshControl={
      <RefreshControl
        refreshing={loading}
        onRefresh={fetchProductDetail}
      />}
      scrollEnabled={!loading}
      onScroll={ (e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
      } }
      >
      <StatusBar backgroundColor={COLORS.primaryOpacity} />
      {/* Focused */}
      {
        isFocus ? 
        <SafeAreaView>
          {/* View Ketika Input Sedang Fokus */}
          <View>
            <View style={styles.onFocusContainer}>
              {
                searchProduct.map((x, i) => (
                  <View key={i}>
                  <TouchableOpacity>
                    <View style={styles.onFocusItem}>
                      <IconButton icon="close-circle-outline" color={COLORS.white} size={15} onPress={() => onPressCart} />
                        <Text>{truncate(x.name, 40)}</Text>
                    </View>
                  </TouchableOpacity>
                    <View style={styles.line}></View>
                  </View>
                ))
              }
              <View style={styles.imagePetani}>
                <Image
                source={ require("../../../assets/images/png/petani.png") }
                />
              </View>
            </View>
          </View>
        </SafeAreaView> : 
      /* Blured */
          <SafeAreaView>
            {/* ImageCarousel Start */}
          <View>
              <View>
                {
                  detailProductSelector.avatar ? 
                      <Swiper
                        style={styles.wrapper}
                        height={340}
                        dot={
                          <View
                            style={{
                              backgroundColor: COLORS.colorC4,
                              width: 5,
                              height: 5,
                              borderRadius: 4,
                              marginLeft: 3,
                              marginRight: 3,
                              marginTop: 3,
                              marginBottom: 3
                            }}
                          />
                        }
                        activeDot={
                          <View
                            style={{
                              backgroundColor: COLORS.primaryColor,
                              width: 8,
                              height: 8,
                              borderRadius: 4,
                              marginLeft: 3,
                              marginRight: 3,
                              marginTop: 3,
                              marginBottom: 3
                            }}
                          />
                        }
                        paginationStyle={{
                          
                        }}
                        loop={false}
                      >
                        {
                          detailProductSelector.avatar.map((x,i) => (
                            <View
                              style={styles.slide}
                              key={i}
                            >
                              <Image
                                resizeMode="stretch"
                                style={styles.image}
                                source={{ uri: x}}
                              />
                            </View>
                          ))
                        }
                      </Swiper>
                      :
                      <View style={[styles.itemContainer]}>
                        <Animated.Image
                          style={{
                            width: imageW,
                            height: imageH,
                            // borderRadius: 20,
                            resizeMode: 'cover',
                          }}
                          source={require('../../../assets/images/png/empty.png') }
                        />
                      </View>
                }
                  <IconButton rippleColor={COLORS.blackSans} icon="share-variant" style={{ position: 'absolute', top: 10, left: 0, backgroundColor:COLORS.colorC4 }} color={COLORS.white} size={25} onPress={() => onPressCart} />
                  <IconButton icon={isLove ? "heart" : "heart-outline"} style={{ position: 'absolute', top: 60, left: 0, backgroundColor: COLORS.colorC4 }} color={isLove ? COLORS.red : COLORS.white} size={25} onPress={() => onPressLove()} />
                  <IconButton icon="information-outline" style={{ position: 'absolute', top: 110, left: 0, backgroundColor: COLORS.colorC4 }} color={COLORS.white} size={25} onPress={() => onPressCart} />
              </View>
              <View style={styles.price}>
                {
                    loading ? <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      // visible={homeSelector.isLoading}
                      style={{
                        width: 170,
                        height: 30,
                        borderRadius: 16,
                        marginLeft: 10
                      }}
                    /> : <Text style={styles.priceText}>{mProducts.price ? convertToIdr(mProducts.price) : "0"}</Text>
                }
                  {
                      loading ? <View style={{ flexDirection: "row" }}> 
                        <ShimmerPlaceHolder
                          LinearGradient={LinearGradient}
                          // visible={homeSelector.isLoading}
                          style={{
                            width: 60,
                            height: 30,
                            borderRadius: 16,
                            marginLeft: 10
                          }}
                        /> 
                        <ShimmerPlaceHolder
                          LinearGradient={LinearGradient}
                          // visible={homeSelector.isLoading}
                          style={{
                            width: 60,
                            height: 30,
                            borderRadius: 16,
                            marginLeft: 10
                          }}
                        />
                    </View> : <View style={styles.chip}>
                          <Chip icon="star" onPress={() => console.log('Pressed')}>Rating Produk : {mProducts.rating} (40)</Chip>
                        </View>
                  }
              </View>
              <View style={styles.lineProducts} />
                {
                  loading ? 
                    <View style={styles.productDescription}>
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                          width: 170,
                          height: 30,
                          borderRadius: 16,
                          marginLeft: 10
                        }}
                      />
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                          width: 60,
                          height: 30,
                          borderRadius: 16,
                          marginVertical: 10,
                          marginLeft: 10
                        }}
                      />
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                          width: 60,
                          height: 30,
                          borderRadius: 16,
                          marginLeft: 10
                        }}
                      />
                    </View> : 
                    <View style={styles.productDescription}>
                      <Text>{mProducts.name}</Text>
                      <Text style={{ marginTop: 10 }}>
                        <Text>
                          {"Terjual" + " "}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                          { detailProductSelector.mProducts.is_sold }
                        </Text>
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        <Text>
                          {"Berat" + " "}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                          {detailProductSelector.mProducts.weight}
                        </Text>
                        {" Gram / Produk"}
                      </Text>
                      <Text style={{ marginTop: 10 }}>
                        <Text>
                          {'Stok' + ' '}
                        </Text>
                        <Text style={{ fontWeight: "bold" }}>
                          {detailProductSelector.mProducts.stock - detailProductSelector.mProducts.is_sold }
                        </Text>
                      </Text>
                    </View>
                }
              <View style={styles.lineProducts} />
              {/* Info Toko */}
              {
                  loading ? <View style={{ flexDirection: "row" }}>
                    <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 60,
                      marginLeft: 10,
                      marginTop: 10
                    }}
                  />
                  <View style={{ flexDirection: "column", marginTop: 10 }}>
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        style={{
                          width: 170,
                          height: 20,
                          borderRadius: 16,
                          marginLeft: 10,
                          marginTop: 10
                        }}
                      />
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        style={{
                          width: 170,
                          height: 20,
                          borderRadius: 16,
                          marginLeft: 10,
                          marginTop: 10
                        }}
                      />
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        style={{
                          width: 170,
                          height: 20,
                          borderRadius: 16,
                          marginLeft: 10,
                          marginTop: 10
                        }}
                      />
                  </View>
                  </View>  :
                  <View>
                    <MarketInfo />
                  </View>
              }
              <View style={styles.lineProducts} />
              {/* Info Pengiriman */}
              {
                  loading ? <View style={styles.productDescription}>
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      // visible={homeSelector.isLoading}
                      style={{
                        width: 170,
                        height: 20,
                        borderRadius: 16,
                        marginLeft: 10
                      }}
                    />
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      // visible={homeSelector.isLoading}
                      style={{
                        width: 180,
                        height: 20,
                        borderRadius: 16,
                        marginVertical: 10,
                        marginLeft: 10
                      }}
                    />
                    <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      // visible={homeSelector.isLoading}
                      style={{
                        width: 190,
                        height: 20,
                        borderRadius: 16,
                        marginLeft: 10
                      }}
                    />
                  </View> :
                    <>
                      <Text style={styles.title}>Informasi Toko</Text>
                      <View style={styles.row}>
                        <IconButton
                          icon="truck-check"
                          size={20}
                        />
                        <Text style={{ alignSelf: "center" }}>
                          <Text>{"Diantar ke" + " "}</Text>
                          <Text style={{ fontWeight: "bold" }}>{"Kosan Mandar"}</Text>
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <IconButton
                          icon="clock-outline"
                          size={20}
                        />
                        <Text style={{ alignSelf: "center" }}>
                          <Text>{"3 - 5 Jam"}</Text>
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <IconButton
                          icon="package-variant"
                          size={20}
                        />
                        <Text style={{ alignSelf: "center" }}>
                          <Text>{"Kurir :" + " "}</Text>
                          <Text style={{ fontWeight: "bold" }}>{"JNE"}</Text>
                        </Text>

                        <Button
                          mode="outlined"
                          color={COLORS.primaryOpacity}
                          onPress={() => console.log("aaa")}
                          style={{
                            borderRadius: 16,
                            borderColor: COLORS.primaryOpacity,
                            height: 40,
                            marginTop: 5,
                            justifyContent: "flex-end",
                            alignSelf: "center",
                            right: 10,
                            position: "absolute"
                          }}>Ganti Kurir</Button>
                      </View>
                    </>
              }
              <View>
                {/* End */}
                <View style={styles.lineProducts} />
                  <View style={{ height: 0, backgroundColor: 'white' }}
                  onLayout={ev => { 
                    setBottomAction(ev.nativeEvent.layout)
                  }}
                  />
                {/* Deskripsi Barang */}
                  <Text style={styles.title}>Deskripsi Barang</Text>
                {
                    loading ? <View> 
                      <ShimmerPlaceHolder
                      LinearGradient={LinearGradient}
                      // visible={homeSelector.isLoading}
                      style={{
                        width: 190,
                        height: 20,
                        marginTop: 10,
                        borderRadius: 16,
                        marginLeft: 10
                      }}
                      />
                      <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                          width: width,
                          height: 140,
                          marginTop: 10,
                          borderRadius: 16,
                          marginHorizontal: 10
                        }}
                      />
                    </View> :
                    <View style={{ marginHorizontal: 10 }}>
                      <Text style={{ marginBottom: 10, marginTop: 10 }}> { description ? description : truncate(mProducts.description, 200) } </Text>
                      <Text style={{ color: COLORS.blue }} onPress={(e) => onRead()}>{ readableDesc ? "Minimalkan" : "Baca Selengkapnya" }</Text>
                    </View>
                }
                <View style={styles.lineProducts} />
                {/* Produk lain di toko ini */}
                <Text style={styles.title}>{"Produk lain pada toko " + "Hidroponik Bandung"}</Text>
                {
                    loading ? <View style={{ flexDirection: "row" }}>
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
                    </View> :
                      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <FlatList
                          horizontal
                          data={homeSelector.products}
                          renderItem={({ item }) => (
                            <KpnCardProducts
                              key={item.id}
                              rating={item.rating}
                              title={truncate(item.name, 30)}
                              image={item.avatar}
                              price={item.price}
                              onPress={() => onNavigateToDetail(0, item.id)}
                              onPressAvatar={() => onPressBottomAvatar(item.name, item.avatar, truncate(item.description, 200))}
                            />
                          )}
                          keyExtractor={(item) => item.id}
                        />
                      </View>
                }
                <View style={styles.lineProducts} />
                {/* Ulasan */}
                {/* <Text style={styles.title}>Ulasan</Text>
                <View>
                  <CommentProduct />
                </View> */}
              </View>
              {/*  */}
          </View>
            {/* End */}
          </SafeAreaView>
      }
      <View style={{ height: 95, backgroundColor: COLORS.white }} />
      </Animated.ScrollView>
      <Animated.View style={{
        transform: [{ translateY: translateButtonGroup }], 
        position: "absolute",
        bottom: -60,
        paddingTop: 20,
        backgroundColor: COLORS.white,
        right: 0,
        left: 0,
        flex: 1,
        elevation: 10,
        zIndex: 10,
        flexDirection: "row"
      }}>
        <Text style={{ 
          justifyContent: "center",
          marginHorizontal: 10,
          alignSelf: "flex-start",
          marginBottom: 10,
          color: COLORS.red,
          textDecorationLine: "underline",
          fontWeight: "bold",
          fontSize: 20
        }}>{mProducts.price ? convertToIdr(mProducts.price) : "0"}</Text>
        {/* <FooterButton cart={"0"} /> */}
        <Button
          color={COLORS.primaryColor}
          icon="check-circle-outline"
          mode="outlined"
          style={styles.buttonSticky}
          onPress={(e) => onPressBuy(e)}
        > Order Produk </Button>
      </Animated.View>
            <KpnSnackBar 
            errVisible={errVisible}
            isError={isError}
            onDismissSnackBar={() => onDissmissSnackBar()}
            onPressAction={() => onPressSnackBarAction()}
            validatorErrorMsg={validatorErrorMsg}
            />
            {/* <RenderBottomSheet /> */}
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    height: heightScreen,
    zIndex: 0,
    paddingTop: 50,
  },
  wrapper: {

  },
  input: {
    // flex: 1,
    height: 40,
    // width: 270,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 10
    // fontSize: 15
  },
  containerInput:{
    position: "absolute",
    top:0,
    left:0,
    right: 0,
    backgroundColor: COLORS.primaryOpacity,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 60,
    elevation: 4,
    zIndex: 100
  },
  onFocusContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  line: {
    height: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    opacity: 0.5
  },
  onFocusItem: {
    backgroundColor: COLORS.sans,
    padding: 10,
    opacity: 0.5,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  imagePetani: {
    alignContent: "center",
    alignSelf: "center",
    marginTop: 10
  },
  price: {
    margin: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  chip:{
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-end",
  },
  priceText: {
    fontWeight: "bold",
    fontSize: 25
  },
  lineProducts: {
    height: 1,
    backgroundColor: COLORS.colorC4,
    marginHorizontal: 20,
    marginTop: 10
  },
  productDescription:{
    margin: 10
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },

  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },

  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },

  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },

  image: {
    width: width,
    flex: 1
  },
  containerSticky: {
    position: 'absolute',
    // opacity: 0.5,
    bottom: 0,
    left: 0,
    right: 0,
    // marginHorizontal: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSticky: {
    height: 35,
    width: Dimensions.get('screen').width - 150,
    justifyContent: "center",
    marginHorizontal: 10,
    alignSelf: "flex-end",
    marginBottom: 10
  },
  textLebihHemat: {
    fontSize: 13,
    color: COLORS.fontColor,
    left: 10
  }
})
