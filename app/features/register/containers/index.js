import React, {useState, useRef, useEffect} from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { Text } from 'react-native-elements';
import SignUp from "../../../assets/images/svg/SignUp";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";

export default function Home() {
  const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
  const [errVisible, setErrVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const dispatch = useDispatch();
  const userDataSelector = useSelector(state => state.registerReducer.userData);
  const registerSelector = useSelector(state => state.registerReducer);

  const checkValidation = () => {
    if (userDataSelector.email === '' || !userDataSelector.email.includes("@")){
      setValidatorErrorMsg("Email tidak Boleh kosong")
      setIsError(true)
      return false
    }else{ 
      return true
    }
  }

  const onChangeEmail = (t) => {
      dispatch(registerActions.onChangeEmail(t))
  }

  const onRegistrationSubmit = () => {
    const validator = checkValidation();
    if(validator){
      const param = {
        email: userDataSelector.email,
      }
      navigate("RegisterPhoneName", param)
    }else{
      setErrVisible(true)
    }
  }

  const onDismissSnackBar = () => {
    setErrVisible(false)
  }

  const onPressAction = () => {
    setErrVisible(false)
  }

  return (
    <>
      <Snackbar
        visible={errVisible}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: isError ? COLORS.red : COLORS.primaryOpacity, borderRadius: 16 }}
        theme={{
          colors: {
            primary: COLORS.white,
            onBackground: COLORS.white,
            accent: COLORS.white,
          }
        }}
        action={{
          label: `Oke`,
          onPress: () => onPressAction(),
        }}>
        {validatorErrorMsg}
      </Snackbar>
        <ScrollView style={styles.container}>
          <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
          <Spinner
            visible={registerSelector.loadingEmail}
            textContent={'Mohon Tunggu ...'}
            textStyle={{ color: COLORS.white }}
          />
          <View style={{ alignSelf: "center", marginTop: 10}}>
            <SignUp />
          </View>
          <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Daftarkan Emailmu</Text>
          <View>
            <View style={styles.form}>
              <Text style={styles.inputTitle}>Email</Text>
              <KpnInput
                // label="email"
                onChangeText={text => onChangeEmail(text)}
                value={userDataSelector.email}
                isError
                keyboardType="email"
              />
            </View>
          </View>
          <KpnButton
            text="Berikutnya"
            isRounded
            // disabled={!checkedTerms}
            style={{ marginTop: 10, opacity: 1, marginBottom: 10 }}
            color={COLORS.secondColor}
            onPress={() => onRegistrationSubmit()}
          />
        </ScrollView>
    </>
  );
}
