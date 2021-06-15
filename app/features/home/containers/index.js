import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import { 
  View, 
  RefreshControl,
  Animated,
  TextInput,
  Text,
  Keyboard,
  SafeAreaView
} from 'react-native';
import { IconButton } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';

import { useDispatch, useSelector } from 'react-redux';
import * as homeAction from '../actions';
import * as orderActions from '../../order/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import AvoidKeyboard from "../../../components/KpnKeyboardAvoidView";
import { IHome } from "../../interfaces";
import HomeContainer from '../components/HomeContainer';
import SearchContainer from '../components/SearchBarContainer';
import { KpnNotFound } from '../../../components';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const homeSelector:IHome = useSelector(state => state.homeReducer)
  const loginSelector = useSelector(state => state.loginReducer)

  const [isFocus, setIsFocus] = useState(false);
  const [query, setQuery] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  let scrollY = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);

  const onRefreshAll = async () => {
    await dispatch(homeAction.requestHome("", loginSelector.user.user_id, 0, false))
  }

  useEffect(() => {
    SplashScreen.hide();
  }, [null])

  useEffect(() => {
    let isMounted = true;
    const fetchHomeData = async () => {
      await dispatch(orderActions.getWishlist())
      await dispatch(orderActions.getOrderedList())
      await dispatch(orderActions.getOrderedList(3, 4))
      await dispatch(homeAction.requestHome("", loginSelector.user.user_id, 0, false))
      await dispatch(homeAction.getUserProfile("", loginSelector.user.user_id))
    }
    
    fetchHomeData();
    return () => {
      isMounted = false;
    }
  }, [null])

  const onTextInputFocus = () => {
    setIsFocus(true)
    console.log(isFocus, "focus")
  }

  const onPressBell = () => {
    if(!isFocus){
      setIsDialogVisible(true)
    }else{
      setQuery('')
    }
  }

  const onPressBack =() => {
    setIsFocus(false)
    setQuery('')
    Keyboard.dismiss();
  }

  const diffClampSearchContainer = Animated.diffClamp(scrollY, 0, 60);

  const translateSearchContainer = diffClampSearchContainer.interpolate({
    inputRange: [0, 0, 0, 60],
    outputRange: [0, 0, 0, -60]
  });

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
        {
          isFocus ? (
            <IconButton icon="keyboard-backspace" color={COLORS.white} onPress={() => onPressBack()} />
          ) : null
        }
        <AvoidKeyboard>
          <TextInput
            ref={textInputRef}
            placeholder="Cari Disini"
            clearButtonMode="always"
            value={query}
            onChangeText={(value) => setQuery(value)}
            style={[styles.input, { marginLeft: !isFocus ? 20 : 0 }]}
            onFocus={() => onTextInputFocus()}
            // onBlur={() => onTextInputBlur()}
            clearTextOnFocus
          />
        </AvoidKeyboard>
        <IconButton icon={!isFocus ? "bell-outline" : "close-circle"} color={COLORS.white} onPress={() => onPressBell()} style={{ marginRight: 20 }} />
      </Animated.View>
    <Animated.ScrollView style={[styles.container, /* { opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)), } */]} 
      refreshControl={
      <RefreshControl 
      onRefresh={onRefreshAll}
      // refreshing={homeSelector.isLoading}
      />
      }
      onScroll={(e) => {
        scrollY.setValue(e.nativeEvent.contentOffset.y)
      }}
      // scrollEnabled={!homeSelector.isLoading}
    >
      {
        !isFocus ? (
          <HomeContainer />
        ) : ( 
          <SafeAreaView>
            <SearchContainer q={query} onClickChips={(name) => setQuery(name)} /> 
          </SafeAreaView>
        )
      }
    </Animated.ScrollView>
      <KpnNotFound 
      visible={isDialogVisible} 
      common="Oops! Maaf Fitur Belum Tersedia :(" 
      title="Keeponic v0.0.1" 
      onBackDropPressed={() => setIsDialogVisible(false)}
      />
    </View>
    </>
  );
}
