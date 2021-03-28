import React, { useState } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../actions';
import styles from './styles';

import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import Logo from "../../../assets/images/svg/Logo"
import { COLORS } from '../../../utils/colors';

import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

export default function Login() {
  // useState or init the variable
  const [text, setText] = useState('')
  const id = useSelector(state => state.loginReducer.id);
  
  // Redux function
  const dispatch = useDispatch();
  const selector = useSelector(state => state.loginReducer);
  const onLogin = () => dispatch(loginActions.requestLogin());
  const setUsername = (username) => dispatch(loginActions.setUsername(username))
  const setPassword = (password) => dispatch(loginActions.setPassword(password))

  // Button or Input function
  const googleLogin = () => { console.log(selector) }

  return (
  <ScrollView style={styles.login}>
    <StatusBar backgroundColor={COLORS.primaryOpacity} />
    <View style={styles.dividerLeft}>
        <KpnDivider
          height={150}
          width={40}
          bottomEnd={15}
          color={COLORS.secondColor}
        />
      </View>
      <View style={styles.dividerRight}>
        <KpnDivider
          height={150}
          width={40}
          topStart={15}
          bottomStart={15}
          style={{marginTop: 20}}
          color={COLORS.secondColor}
        />
      </View>
    <View style={styles.container}>
      <View style={styles.logo}>
        <Logo height={70} width={170} />
      </View>
      <View style={styles.input}>
        <KpnInput
        label="username"
        style={{ margin: 10 }}
        onChangeText={text => setUsername(text)}
        value={selector.username}
        />

        <KpnInput
          label="password"
          style={{margin: 10}}
          onChangeText={text => setPassword(text)}
          value={selector.password}
        />

        <KpnButton 
        text="Login"
        isRounded
        style={{marginTop: 10}}
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
