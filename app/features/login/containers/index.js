import React, { useState, useEffect } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Text, Button, HelperText } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions';
import styles from './styles';

import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import Logo from "../../../assets/images/svg/Logo"
import { COLORS } from '../../../utils/colors';
import { emailValidator, passwordValidator } from "../../../utils/validator";
import { trimString } from "../../../utils/stringUtils";

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function Login() {
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
  const setUsername = (username) => dispatch(loginActions.setUsername(username))
  const setPassword = (password) => dispatch(loginActions.setPassword(password))

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
    return passwordForm.length <= 8
  }

  const setThisEmail = (text) => {
    setEmailForm(text)
    setUsername(text)
  }
  
  const setThisPassword = (text) => {
    setPasswordForm(text)
    setPassword(text)
  }

  // Button or Input function
  const googleLogin = () => { console.log(selector) }

  return (
  <ScrollView style={styles.login}>
    <StatusBar backgroundColor={COLORS.primaryOpacity} />
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
          style={{margin: 10}}
          onChangeText={text => setThisPassword(text)}
          value={selector.passwordForm}
          placeholderColor={placeholderColorPassword}
          isPassword
          isError
          errorText={passwordError}
        />

        <KpnButton 
        text="Login"
        isRounded
        style={{marginTop: 10, opacity: 0.7}}
        color={COLORS.secondColor}
        onPress={() => onLogin()}
        />

      </View>
      <View style={styles.textRegistration}>
        <Text style={styles.text}>Doesn't have an account yet?</Text>
        <Text style={styles.textRegist}>Create Account</Text>
        <Text style={[styles.text, {top: 10}]}>Or</Text>
          <GoogleSigninButton
            style={{ width: 200, height: 58, top: 17 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={googleLogin} />
      </View>
    </View>
    </ScrollView>
  );
}
