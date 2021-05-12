import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Text, IconButton, HelperText } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";
import SplashScreen from "react-native-splash-screen";
import { 
  GoogleSigninButton, 
  statusCodes, 
  GoogleSignin } 
  from "@react-native-google-signin/google-signin";

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions'; 
import * as registerActions from '../../register/actions';
import styles from './styles';

import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import Logo from "../../../assets/images/svg/Logo"
import { COLORS } from '../../../utils/colors';
import { emailValidator, passwordValidator } from "../../../utils/validator";
import { navigate } from "../../../navigation/NavigationService";

// import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function Login(props) {
  // useState or init the variable
  const [placeholderColor, setPlaceholderColor] = useState(COLORS.primaryColor)
  const [placeholderColorPassword, setPlaceholderColorPassword] = useState(COLORS.primaryColor)
  const [emailForm, setEmailForm] = useState("")
  const [passwordForm, setPasswordForm] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // function lifecycle

  
  // Redux function
  const dispatch = useDispatch();
  const selector = useSelector(state => state.loginReducer);
  const registerSelector = useSelector(state => state.registerReducer);
  const setUsername = (username) => dispatch(loginActions.setUsername(username))
  const setPassword = (password) => dispatch(loginActions.setPassword(password))
  const { cancel } = props.route

  const onLogin = () => {
      const isEmailError = emailValidator(emailForm)
      const isPasswordError = passwordValidator(passwordForm)

      if(isEmailError || isPasswordError){
        setEmailError(isEmailError)
        setPasswordError(isPasswordError)
      }

      if(emailForm != ""){
        if(passwordForm != ""){
          dispatch(loginActions.requestLogin())
        }
      }
  }

  const emailErrorHelper = () => {
    return !emailForm.includes('@')
  }

  const passwordErrorHelper = () => {
    return passwordForm.length <= 0
  }

  const setThisEmail = (text) => {
    setEmailForm(text)
    setUsername(text)
  }
  
  const setThisPassword = (text) => {
    setPasswordForm(text)
    setPassword(text)
  }

  const onRegister = () => {
    navigate("RegisterNext");
  }

  useEffect(() => {

    SplashScreen.hide();
    dispatch(registerActions.setClearValue())
    dispatch(loginActions.clearForm())
    
    console.log("this is reselector", registerSelector.errorMsg)
    // getName()

  }, [registerSelector.errorMsg.error])

  // Button or Input function
  

  return (
    <ScrollView style={styles.login} keyboardShouldPersistTaps="handled">
      <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
      <Spinner
        visible={selector.loading}
        textContent={'Mohon Tunggu ...'}
        textStyle={{color: COLORS.white}}
      />
    <View style={styles.dividerLeft}>
        <KpnDivider
          height={150}
          width={40}
          borderEndWidth={2}
          borderBottomWidth={2}
          bottomEnd={15}
          color={COLORS.white}
        />
      </View>
      <View style={styles.dividerRight}>
        <KpnDivider
          height={150}
          width={40}
          borderTopWidth={2}
          borderBottomWidth={2}
          borderStartWidth={2}
          topStart={15}
          bottomStart={15}
          style={{marginTop: 20}}
          color={COLORS.white}
        />
      </View>
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo height={70} width={170} />
      </View>
      <View style={styles.input}>
        <HelperText type="info" visible={emailErrorHelper()}>
          Form harus menyertakan '@' pada email anda.
        </HelperText>
        <KpnInput
        label="email"
        style={{ margin: 10 }}
        onChangeText={text => setThisEmail(text)}
        placeholder={placeholderColor}
        value={selector.emailForm}
        isError
        errorText={emailError}
        />

        <HelperText type="info" visible={passwordErrorHelper()}>
          Minimal input password adalah 8 huruf.
        </HelperText>
          <KpnInput
          label="password"
          style={{margin: 10, width: '94%'}}
          onChangeText={text => setThisPassword(text)}
          value={selector.passwordForm}
          placeholderColor={placeholderColorPassword}
          isPassword
          isError
          errorText={passwordError}
          isSecure
        />

        <KpnButton 
        text="Login"
        isRounded
        style={{ marginTop: 10, opacity: 1, width: '94%', alignSelf: 'center' }}
        color={COLORS.secondColor}
        onPress={() => onLogin()}
        />

      </View>
      <View style={styles.textRegistration}>
        <Text style={styles.text}>Ingin Menjadi Bagian Dari Seller?</Text>
        <Text style={styles.textRegist} onPress={ (e) => onRegister() }>Daftar Sebagai Seller</Text>
      </View>
    </View>
    </ScrollView>
  );
}
