import React, {useState, useRef, useCallback, useEffect, useMemo} from 'react';
import { 
  View, 
  StatusBar, 
  TextInput, 
  Keyboard, 
  SafeAreaView,
  Alert,
  Animated,
} from 'react-native';
import { IconButton, Text, Button } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from 'react-redux';
// import styles from './styles';

import { IProductDetail, IHome, IData } from '../../interfaces';
import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { goBack } from "../../../navigation/NavigationService";
import { truncate } from "../../../utils/stringUtils";
import { widthScreen } from "../../../utils/theme";
import { KpnSnackBar } from "../../../components";
import * as detailProductAction from "../actions";
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

const imageW = widthScreen;
const imageH = imageW * 1;

export default function Home(props) {
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [isLove, setIsLove] = useState(false);
  const [readableDesc, setReadableDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState(false);
  const [validatorErrorMsg, setValidatorErrorMsg] = useState("");
  const [errVisible, setErrVisible] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [isStoredWishlist, setIsStoredWishlist] = useState(false);

  const dispatch = useDispatch();
  const textInputRef = useRef(null);
  const scrollRef = useRef();
  let scrollY = useRef(new Animated.Value(0)).current;
  
  const loginSelector = useSelector(state => state.loginReducer);
  const detailProductSelector:IProductDetail = useSelector(state => state.detailProductReducer);
  const userId = loginSelector.user.user_id
  const { mProducts } = detailProductSelector;
  const loading = detailProductSelector.loading;
  const tokenUser = loginSelector.user.token;
  const isFavorite = detailProductSelector.isFavorite;

  const onTextInputFocus = () => {
    setIsFocus(true)
  }

  const onTextInputBlur = () => {
    setIsFocus(false)
  }

  const onPressCart = () => {
    Keyboard.dismiss();
  }

  const onAddProductToWishlist = async (e) => {
    setLoadingProduct(true)
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
    Keyboard.dismiss();
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

  const onBackPressed = async () => {
    if(isFocus){
      setIsFocus(false);
      Keyboard.dismiss();
    }else{
      await dispatch(detailProductAction.setLoading(true));
      goBack();
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
      productId
    } = props.route.params;
    const param = {
      product_id: productId
    }
    await dispatch(detailProductAction.getDetailProduct(param));
  }

  useEffect(() => {
    fetchProductDetail()
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

  useEffect(() => {
    return () => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
        duration: 500,
      });
    };
  }, [mProducts]);

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

  const onNavigateToDetail = async (id) => {
      const param = {
        product_id: id
      }
      await dispatch(detailProductAction.getDetailProduct(param));
  }

  return (
    <>
      <Spinner
        visible={loadingProduct}
        textContent={''}
        textStyle={{ color: COLORS.white }}
      />
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
        <IconButton icon="bell-outline" color={COLORS.white} onPress={() => onPressBell} />
      </Animated.View>
    <Animated.ScrollView style={styles.container}
      scrollEnabled={!loading}
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
      }}
      ref={scrollRef}
      >
      <StatusBar backgroundColor={COLORS.primaryOpacity} />
      {/* Focused */}
      {
        isFocus ? 
        <SearchView />
        : 
        <SafeAreaView>
            <View>
                {/* ImageCarousel */}
                <ProductAvatar isLove={isLove}  onPressLove={ () => onPressLove() } />
                <ProductName />
                <View style={styles.lineProducts} />
                <CommonProduct />
                <View style={styles.lineProducts} />
                <MarketComponent />
                <View style={styles.lineProducts} />
                <ShipmentInfo />
                <View style={styles.lineProducts} />
                <Text style={styles.title}>Deskripsi Barang</Text>
                <ProductDescription description={description} readableDesc={readableDesc} onRead={() => onRead()} />
                <View style={styles.lineProducts} />
                <Text style={styles.title}>{"Produk lain pada toko " + "Hidroponik Bandung"}</Text>
                <ProductListComponent />
                <View style={styles.lineProducts} />
            </View>
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
      </>
  );
}
