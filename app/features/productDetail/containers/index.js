import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import { 
  View, 
  StatusBar, 
  TextInput, 
  Keyboard, 
  SafeAreaView,
  Alert,
  Animated,
  Share
} from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from 'react-redux';
// import styles from './styles';

import { IProductDetail } from '../../interfaces';
import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { goBack, navigate } from "../../../navigation/NavigationService";
import { truncate } from "../../../utils/stringUtils";
import { widthScreen } from "../../../utils/theme";
import { KpnSnackBar, KpnNotFound } from "../../../components";
import * as detailProductAction from "../actions";
import * as orderActions from "../../order/actions"
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";
import styles from '../components/styles';

import ProductAvatar from '../components/ProductAvatar';
import SearchView from '../components/SearchView';
import ProductName from '../components/ProductName';
import CommonProduct from '../components/CommonProduct';
import MarketComponent from '../components/MarketComponent';
import ShipmentInfo from '../components/ShipmentInfo';
import ProductDescription from '../components/ProductDescription';
import ProductListComponent from '../components/ProductListComponent';
import SearchContainer from '../../home/components/SearchBarContainer';
import LogoRounded from '../../../assets/images/svg/LogoRounded';

const imageW = widthScreen;
const imageH = imageW * 1;

export default function Home(props) {
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [readableDesc, setReadableDesc] = useState(false);
  const [descriptionServer, setDescriptionServer] = useState("");
  const [isError, setIsError] = useState(false);
  const [validatorErrorMsg, setValidatorErrorMsg] = useState("");
  const [errVisible, setErrVisible] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [isStoredWishlist, setIsStoredWishlist] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [query, setQuery] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const dispatch = useDispatch();
  const textInputRef = useRef(null);
  const scrollRef = useRef();
  let scrollY = useRef(new Animated.Value(0)).current;
  
  const loginSelector = useSelector(state => state.loginReducer);
  const detailProductSelector:IProductDetail = useSelector(state => state.detailProductReducer);
  const userId = loginSelector.user.user_id
  const { mProducts } = detailProductSelector;
  const { mMarket } = detailProductSelector;
  const { category } = detailProductSelector;
  const loading = detailProductSelector.loading;
  const tokenUser = loginSelector.user.token;
  const isFavorite = detailProductSelector.isFavorite;

  const onTextInputFocus = () => {
    setIsFocus(true)
  }

  const onAddProductToWishlist = async (e) => {
    setLoadingProduct(true)
    const mount = detailProductSelector.addToWishlist
    const param = {
      user_id: userId,
      t_product_id: detailProductSelector.mProducts.id,
      t_category_product_id: detailProductSelector.category.id,
      is_favorite: isLove ? 1 : 0,
      quantity: 1,
      action: "add"
    };
    try {
      const _onAddChart = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/add`, param, HeaderAuth(tokenUser))
      if (_onAddChart.status === 200) {
        setLoadingProduct(false)
        Alert.alert("Keeponic", "Produk Berhasil Ditambahkan!")
        // await dispatch(detailProductAction.setWishlistDataDetail(!mount))
        // await dispatch(orderActions.getWishlist())
      } else {
        Alert.alert("Terjadi Kesalahan", _onAddChart.data.msg)
        setValidatorErrorMsg(_onAddChart.data.msg)
        setLoadingProduct(false)
        setIsStoredWishlist(false)
      }
    } catch (error) {
      setLoadingProduct(false)
      console.log(error, "error")
      Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order " + error)
    }
  }

  const onPressBell = () => {
    setIsDialogVisible(true)
  }

  const onPressLove = async () => {
    setIsLove(!isLove);
    setLoadingProduct(true);
    const param = {
      user_id: userId,
      t_product_id: detailProductSelector.mProducts.id,
      t_category_product_id: detailProductSelector.category.id,
      is_favorite: isLove ? 0 : 1,
      quantity: 1,
      action: isLove ? "delete_favorite" : "add_favorite"
    };
    try {
      const _onAddChart = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/add`, param, HeaderAuth(tokenUser))
      if (_onAddChart.status === 200) {
        setLoadingProduct(false)
        setValidatorErrorMsg("Produk Disukai Ditambahkan");
        setErrVisible(true);
      } else {
        Alert.alert("Terjadi Kesalahan", _onAddChart.data.msg)
        setValidatorErrorMsg(_onAddChart.data.msg)
        setLoadingProduct(false)
        setIsStoredWishlist(false)
      }
    } catch (error) {
      setLoadingProduct(false)
      console.log(error, "error")
      Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order" + error)
    }
  }

  const onBackPressed = () => {
    setIsFocus(false);
    setQuery('');
    Keyboard.dismiss();
    if(!isFocus){
      goBack();
    }
  }

  const onPressBuy = () => {
    if(mProducts.stock != 0){
      const detailOrder = {
        marketId: mMarket.id,
        productId: mProducts.id,
        price: mProducts.price,
        quantity: 1,
        productName: mProducts.name,
        productAvatar: mProducts.avatar,
        marketName: mMarket.market_name,
        category: category.name,
        userId: userId,
      }
      navigate("OrderDetail", detailOrder)
    }else{
      setNotFound(true)
    }
  }

  const onPressSnackBarAction = () => {
    setErrVisible(false)
  }

  const onDissmissSnackBar = () => {
    setErrVisible(false)
  }

  const onRead = () => {
    if(!readableDesc){
      setDescriptionServer(mProducts.description);
      setReadableDesc(!readableDesc);
    }else{
      setDescriptionServer(truncate(mProducts.description, 200));
      setReadableDesc(!readableDesc);
    }
  }

  const fetchProductDetail = async () => {
    const {
      productId
    } = props.route.params;
    const param = {
      product_id: productId
    }
    await dispatch(detailProductAction.getDetailProduct(param));
  }

  useEffect(() => {
    const {
      productId
    } = props.route.params;
    const param = {
      product_id: productId
    }
    dispatch(detailProductAction.getDetailProduct(param));
  }, [null]);

  useEffect(() => {
    console.log(isFavorite, "base")
    const favoriteChecker = () => {
      if (isFavorite === 1) {
        setIsLove(true)
      } else {
        setIsLove(false)
      }
    }

    favoriteChecker()
  }, [isFavorite, mProducts])

  const onNewProduct = async () => {
    await fetchProductDetail();
    console.log("on New Product")
  }

  useEffect(() => {
    return () => {
      console.log("on top scroll")
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }
  }, [mProducts])

  useEffect(() => {
    return async () => {
      console.log("cleanup detail product")
      await dispatch(detailProductAction.clearProduct())
    }
  }, [null])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          `Produk ${detailProductSelector.mProducts.name}, Selengkapnya download Keeponic di: https://drive.google.com/drive/folders/1cSyxWhVx6aqUeO96qGuYv-hekSflvyUV?usp=sharing`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

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

  return (
    <>
      <Spinner
        visible={loadingProduct}
        textContent={''}
        textStyle={{ color: COLORS.white }}
      />
      {/* SearchBar */}
      {/* <Animated.View style={[styles.containerInput, { transform: [ { translateY: translateSearchContainer } ] }]}>
        <IconButton icon="keyboard-backspace" color={COLORS.white} onPress={() => onBackPressed()} />
        <AvoidKeyboard>
          <TextInput
            ref={textInputRef}
            placeholder="Paket Hidroponik Pemula"
            clearButtonMode="always"
            value={query}
            onChangeText={(value) => setQuery(value)}
            style={styles.input}
            onFocus={() => onTextInputFocus()}
            // onBlur={() => onTextInputBlur()}
            disableFullscreenUI={true}
            clearTextOnFocus
          />
        </AvoidKeyboard>
        <IconButton icon="bell-outline" color={COLORS.white} onPress={() => onPressBell()} />
      </Animated.View> */}
      <Animated.View style={[styles.containerInput, { transform: [{ translateY: translateSearchContainer }] }]}>
        {/* <IconButton icon="keyboard-backspace" style={styles.buttonDown} color={COLORS.white} size={25} onPress={() => goBack()} /> */}
        {/* LOGO */}
        <Text style={[styles.heading, { fontSize: 20, color: COLORS.white, fontWeight: "bold" }]}>Detail Produk</Text>
        <LogoRounded style={styles.logo} width={30} height={40} />
      </Animated.View>
    <Animated.ScrollView style={styles.container}
      // scrollEnabled={!loading}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
      }}
      ref={scrollRef}
      >
      <StatusBar backgroundColor={COLORS.primaryOpacity} />
      {/* Focused */}
      {
        isFocus ? (
        <SearchContainer q={query} onClickChips={(name) => setQuery(name)} />
        )
        : 
        (<SafeAreaView>
            <View>
                {/* ImageCarousel */}
                <ProductAvatar isLove={isLove} onPressCart={() => onShare()} onPressLove={ () => onPressLove() } />
                <ProductName />
                <View style={styles.lineProducts} />
                <CommonProduct />
                <View style={styles.lineProducts} />
                <MarketComponent />
                <View style={styles.lineProducts} />
                <ShipmentInfo />
                <View style={styles.lineProducts} />
                <Text style={styles.title}>Deskripsi Barang</Text>
                <ProductDescription description={descriptionServer} readableDesc={readableDesc} onRead={() => onRead()} />
                <View style={styles.lineProducts} />
                <Text style={styles.title}>{"Produk lain"}</Text>
                <ProductListComponent onPress={() => onNewProduct()} />
                <View style={styles.lineProducts} />
            </View>
          </SafeAreaView>)
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
        flexDirection: "row",
        justifyContent: "center"
      }}>
        <Button
          color={COLORS.orange}
          icon="cart-outline"
          mode={ isStoredWishlist ? "contained" : "outlined"}
          disabled={ isStoredWishlist ? true : false }
          style={styles.buttonSticky}
          onPress={(e) => onAddProductToWishlist(e)}
        > Keranjang </Button>
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
      <KpnNotFound
      visible={notFound}
      onBackDropPressed={() => setNotFound(false)}
      />
      <KpnNotFound
        visible={isDialogVisible}
        title={"Keeponic v0.0.1"}
        common={"Oops! Maaf Fitur Belum Tersedia :("}
        onBackDropPressed={() => setIsDialogVisible(false)}
      />
      </>
  );
}
