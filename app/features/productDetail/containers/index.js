import React, {useState, useRef, useCallback, useEffect} from 'react';
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
} from 'react-native';
import { Chip, IconButton, Text, Button } from 'react-native-paper';
import { ExpandingDot } from "react-native-animated-pagination-dots"
import SnackBar from 'react-native-snackbar-component'

import { useDispatch, useSelector } from 'react-redux';
// import styles from './styles';

import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { goBack } from "../../../navigation/NavigationService";
import { searchProduct, imageData } from "../constants";
import { truncate } from "../../../utils/stringUtils";
import { widthScreen } from "../../../utils/theme";
import MarketInfo from '../components/MarketInfo';
import CommentProduct from '../components/CommentProduct';
import { KpnCardProducts } from "../../../components";
import * as detailProductAction from "../actions";

const imageW = widthScreen;
const imageH = imageW * 1;

export default function Home(props) {
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);
  const [isLove, setIsLove] = useState(false);

  const dispatch = useDispatch();
  const homeSelector = useSelector(state => state.homeReducer)
  const detailProductSelector = useSelector(state => state.detailProductReducer);
  const textInputRef = useRef(null);
  let scrollX = React.useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null)
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  // const onViewRef = useRef(({ viewableItems }) => {
  //   setActiveIndex(viewableItems[0].index);
  // });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold : 50 });
  const {
    userId,
    productId
  } = props.route.params;
  const param = {
    user_id: userId,
    product_id: productId
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <View style={[styles.itemContainer]}>
        <Animated.Image
          style={{
            width: imageW,
            height: imageH,
            // borderRadius: 20,
            resizeMode: 'cover',
          }}
          source={{ uri: item.image }}
        />
      </View>
    );
  }, []);

  const onTextInputFocus = () => {
    setIsFocus(true)
  }

  const onTextInputBlur = () => {
    setIsFocus(false)
  }

  const onPressCart = () => {
    Keyboard.dismiss();
    console.log("Blured!")
  }

  const onPressBell = () => {
    Keyboard.dismiss();
    console.log(detailProductSelector);
  }

  const onPressLove = () => {
    console.log(detailProductSelector);
    setIsLove(!isLove);
    setActiveIndex(true);
  }

  const onBackPressed = () => {
    if(isFocus){
      setIsFocus(false);
      Keyboard.dismiss();
    }else{
      goBack();
    }
  }

  useEffect(() => {
    dispatch(detailProductAction.getDetailProduct(param));
  }, []);

  return (
    <>
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryOpacity} />
      {/* SearchBar */}
      <View style={styles.containerInput}>
        <IconButton icon="keyboard-backspace" color={COLORS.white} onPress={onBackPressed}/>
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
        <IconButton icon="bell-outline" color={COLORS.white} onPress={ () => onPressBell }/>
      </View>
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
                <View style={[StyleSheet.absoluteFillObject]}>
                  {
                    imageData.map((item, index) => {
                      const inputRange = [
                        (index - 1) * widthScreen,
                        index * widthScreen,
                        (index + 1) * widthScreen,
                      ];
                      const colorFade = scrollX.interpolate({
                        inputRange,
                        outputRange: [0, 1, 0],
                      });
                      return (
                        <Animated.View
                          key={index}
                          style={[
                            StyleSheet.absoluteFillObject,
                            { backgroundColor: item.backgroundColor, opacity: colorFade },
                          ]}
                        />
                      );
                    })
                  }
                </View>
                <Animated.FlatList
                  ref={flatListRef}
                  // onViewableItemsChanged={onViewRef.current}
                  viewabilityConfig={viewConfigRef.current}
                  data={imageData}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  horizontal
                  decelerationRate={'normal'}
                  scrollEventThrottle={16}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                      useNativeDriver: false,
                    }
                  )}
                />
                <IconButton icon="share-variant" style={{ position: 'absolute', top: 10 }} color={COLORS.white} size={25} onPress={() => onPressCart} />
                <IconButton icon={isLove ? "heart" : "heart-outline"} style={{ position: 'absolute', top: 50 }} color={isLove ? COLORS.red : COLORS.white} size={25} onPress={() => onPressLove()} />
                <IconButton icon="information-outline" style={{ position: 'absolute', top: 90 }} color={COLORS.white} size={25} onPress={() => onPressCart} />
                <ExpandingDot
                  data={imageData}
                  expandingDotWidth={30}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.6}
                  dotStyle={{
                    width: 10,
                    height: 10,
                    backgroundColor: COLORS.primaryColor,
                    borderRadius: 5,
                    marginHorizontal: 5
                  }}
                  containerStyle={{
                    bottom: 10,
                  }}
                />
              </View>
              <View style={styles.price}>
                <Text style={styles.priceText}>Rp. 150.000</Text>
                <View style={styles.chip}>
                  <Chip onPress={() => console.log('Pressed')}>Diskusi(20)</Chip>
                  <Chip icon="star" onPress={() => console.log('Pressed')}>4.8(40)</Chip>
                </View>
              </View>
              <View style={styles.lineProducts} />
              <View style={styles.productDescription}>
                <Text>{ detailProductSelector.name }</Text>
                <Text style={{ marginTop: 10 }}>
                  <Text>
                    {"Terjual" + " "}
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    20
                  </Text>
                </Text>
                <Text style={{ marginTop: 10 }}>
                  <Text>
                    {'Stok' + ' '}
                  </Text>
                  <Text style={{ fontWeight: "bold" }}>
                    30
                  </Text>
                </Text>
              </View>
              <View style={styles.lineProducts} />
              {/* Info Toko */}
              <View>
                <MarketInfo />
              </View>
              <View style={styles.lineProducts} />
              {/* Info Pengiriman */}
              <View>
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
                    onPress={() => console.log(detailProductSelector.name)}
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
                {/* End */}
                <View style={styles.lineProducts} />
                {/* Deskripsi Barang */}
                  <Text style={styles.title}>Deskripsi Barang</Text>
                <View style={{ marginHorizontal: 10 }}>
                  <Text style={{ marginBottom: 10, marginTop: 10 }}> Tidak ada deskripsi </Text>
                  <Text style={{ color: COLORS.blue }}> Baca Selengkapnya </Text>
                </View>
                <View style={styles.lineProducts} />
                {/* Produk lain di toko ini */}
                <Text style={styles.title}>Produk lain pada toko Hidroponik Bandung</Text>
                <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                  <FlatList
                    horizontal
                    data={homeSelector.products}
                    renderItem={({ item }) => (
                      <KpnCardProducts
                        rating={item.rating}
                        title={truncate(item.name, 30)}
                        image={item.avatar}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
                <View style={styles.lineProducts} />
                {/* Ulasan */}
                <Text style={styles.title}>Ulasan</Text>
                <View>
                  <CommentProduct />
                </View>
              </View>
              {/*  */}
          </View>
            {/* End */}
          </SafeAreaView>
      }
      </ScrollView>
            <View>
              <SnackBar
                visible={activeIndex}
                textMessage={isLove ? "Produk Disukai Ditambahkan" : "Produk Disukai Dibatalkan"}
                actionHandler={() => { setActiveIndex(false) }}
                actionText="Tutup" />
            </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white
  },
  input: {
    // flex: 1,
    height: 40,
    marginTop: 5,
    width: 270,
    backgroundColor: '#e4e6eb',
    borderRadius: 16,
    paddingHorizontal: 16,
    // fontSize: 15
  },
  containerInput:{
    backgroundColor: COLORS.primaryOpacity,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 10,
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
  }
})
