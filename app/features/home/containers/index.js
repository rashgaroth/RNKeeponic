import React, {useState, useEffect, useRef} from 'react';
import { 
  View, 
  RefreshControl,
  Animated,
  TextInput,
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
import { KpnLoading } from "../../../components";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const homeSelector:IHome = useSelector(state => state.homeReducer)
  const loginSelector = useSelector(state => state.loginReducer)

  const [name, setName] = useState(null);
  const [word, setWord] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  let scrollY = useRef(new Animated.Value(0)).current;
  const textInputRef = useRef(null);
  
  async function fetchAllHomeRequest(){
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
  }, [null])

  useEffect(() => {
    const fetchWishListData = async () => {
      await dispatch(orderActions.getWishlist())
      await dispatch(homeAction.requestHome(name, loginSelector.user.user_id, 0, false))
      await dispatch(homeAction.getUserProfile("", loginSelector.user.user_id))
    }

    const fetchHomeData = async () => {
      await dispatch(homeAction.requestHome(name, 0, 0))
    }

    if (loginSelector.isUserRegistered) {
      fetchWishListData()
    }else{
      fetchHomeData()
    }

  }, [loginSelector.user.user_id])

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
      onRefresh={onRefreshAll}
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
    </View>
  );
}
