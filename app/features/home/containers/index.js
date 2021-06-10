import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { 
  View, 
  RefreshControl,
  Animated,
  TextInput,
  Text
} from 'react-native';
import { IconButton } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { useDispatch, useSelector } from 'react-redux';
import * as homeAction from '../actions';
import * as orderActions from '../../order/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { IHome } from "../../interfaces";
import HomeContainer from '../components/HomeContainer';
import { KpnLoading } from "../../../components";
import BottomSheetComponent from '../components/BottomSheet';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const homeSelector:IHome = useSelector(state => state.homeReducer)
  const loginSelector = useSelector(state => state.loginReducer)

  const [name, setName] = useState(null);
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => [0, "47%"], [])

  let scrollY = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);

  const onRefreshAll = async () => {
    await dispatch(homeAction.requestHome(name, loginSelector.user.user_id, 0, false))
  }

  // useEffect(() => {
  //   const userAddress = homeSelector.isUserAddress;

  //   if (!homeSelector.userAddress.subdistrict === ""){
  //     console.log("ada ni")
  //     if (!userAddress) {
  //       console.log("gada alamat")
  //       setTimeout(() => {
  //         setIsUserAddres(true)
  //       }, 2000)
  //     } else {
  //       console.log("ada alamat")
  //     }
  //   }else{
  //     console.log("blum ada")
  //   }
  // }, [homeSelector.userAddress.subdistrict])

  useEffect(() => {
    SplashScreen.hide();
  }, [null])

  useEffect(() => {
    const fetchHomeData = async () => {
      await dispatch(orderActions.getWishlist())
      await dispatch(orderActions.getOrderedList())
      await dispatch(orderActions.getOrderedList(3,4))
      await dispatch(homeAction.requestHome(name, loginSelector.user.user_id, 0, false))
      await dispatch(homeAction.getUserProfile("", loginSelector.user.user_id))
    }

    fetchHomeData()

  }, [null])

  useEffect(() => {
    console.log(homeSelector.isUserAddress, "ahuish")
    if(homeSelector.isUserAddress){
      bottomSheetRef.current.snapTo(0)
    }else{
      bottomSheetRef.current.expand()
    }
  }, [homeSelector.allProducts, homeSelector.isUserAddress])

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
  
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
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
      onRefresh={onRefreshAll}
      refreshing={homeSelector.isLoading}
      />
      }
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
      }}
      scrollEnabled={!homeSelector.isLoading}
    >
      <HomeContainer />
      <KpnLoading visible={homeSelector.isLoading} />
    </Animated.ScrollView>
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
            <BottomSheetComponent />
          </BottomSheetScrollView>
    </BottomSheet>
    {
      // !isUserAddres ? (
        // <BottomSheetComponent />
      // ) : null
    }
    </View>
    </>
  );
}
