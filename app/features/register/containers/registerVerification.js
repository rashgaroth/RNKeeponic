import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from "react-native-loading-spinner-overlay";
import CodeInput from '@andreferi/react-native-confirmation-code-input';
import { Input, Text } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import Verification from "../../../assets/images/svg/Verification";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";
import * as loginActions from "../../login/actions";

const CELL_COUNT = 4;

export default function RegisterVerification() {
    const [timerCount, setTimer] = useState(60);
    const [disabled, setDisabled] = useState(true);
    const [onTimeRun, setOnTimeRun] = useState(true);
    
    const dispatch = useDispatch();
    const registerSelector = useSelector(state => state.registerReducer);

    sendBackVerification = () => {
        setTimer(60)
    }

    // const setCountDownTimer = () => {
    //     setTimer(60)
    //     let interval = setInterval(() => {
    //         setTimer(lastTimerCount => {
    //             lastTimerCount <= 1 && clearInterval(interval)
    //             if (lastTimerCount == 1) {
    //                 setDisabled(false)
    //             }
    //             return lastTimerCount - 1
    //         })
    //     }, 1000)

    //     return () => clearInterval(interval)
    // }

    useEffect( () => {
        if(onTimeRun){
            setCountDownTimer()
        }
        dispatch(loginActions.setUsername(registerSelector.userData.email))
        dispatch(loginActions.setPassword(registerSelector.userData.password))
        console.log(registerSelector.userData.email, "PARAM2")
        console.log(registerSelector.userData.password, "PARAM3")
        // console.log(registerSelector, "SELECTOR USER -----")
    },[]);

    const onRegistrationSubmit = () => {
        console.log(registerSelector.address.province, "SELECTOR USER -----")
        setDisabled(true)
        setOnTimeRun(false)
        setCountDownTimer()
    }

    const checkCode = (isValid, code) => {
        dispatch(registerActions.submitVerification(code))
    }

    const onDismissSnackBar = () => {
        dispatch(registerActions.setError("", "", false, "", false))
    }

    const onPressAction = () => {
        dispatch(registerActions.setError("", "", false, "", false))
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
                <Spinner
                    visible={registerSelector.loading}
                    textContent={'Mengirim Email Verifikasi ...'}
                    textStyle={{ color: COLORS.white }}
                />
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <Verification />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Konfirmasi Kode Verifikasi</Text>
                <View>
                    <SafeAreaView style={stylesLocal.root}>
                        <Text style={stylesLocal.text}>Masukkan kode verifikasi</Text>
                        <Text style={stylesLocal.text2}>Verifikasi dapat dikirim ulang dalam kurun {timerCount} detik</Text>
                        {/* <Text style={stylesLocal.text3} onPress={sendBackVerification()} >{text}</Text> */}
                        <CodeInput
                            // ref="codeInputRef2"
                            keyboardType="numeric"
                            codeLength={4}
                            // className='border-circle'
                            className={'border-b'}
                            compareWithCode='1234'
                            autoFocus={true}
                            ignoreCase={true}
                            inputPosition='center'
                            size={40}
                            containerStyle={{ marginTop: 30 }}
                            activeColor={COLORS.white}
                            inactiveColor={COLORS.white}
                            codeInputStyle={{ fontWeight: 'bold', fontSize: 20 }}
                            onFulfill={(isValid, code) => checkCode(isValid, code)}
                        />
                    </SafeAreaView>
                </View>
                <KpnButton
                    text={`Kirim Ulang Verifikasi`}
                    isRounded
                    disabled={disabled}
                    // disabled={!checkedTerms}
                    style={{ marginTop: 10, opacity: 1, }}
                    color={COLORS.secondColor}
                    onPress={() => onRegistrationSubmit()}
                />
            </ScrollView>
            <Snackbar
                visible={registerSelector.errorMsg.visible}
                onDismiss={onDismissSnackBar}
                style={{ backgroundColor: registerSelector.errorMsg.error ? COLORS.red : COLORS.primaryOpacity, borderRadius: 16 }}
                theme={{
                    colors: {
                        primary: COLORS.white,
                        onBackground: COLORS.white,
                        accent: COLORS.white,
                    }
                }}
                action={{
                    label: `${registerSelector.errorMsg.buttonMsg}`,
                    onPress: () => onPressAction(),
                }}>
                {registerSelector.errorMsg.msg}
            </Snackbar>
        </>
    );
}

const stylesLocal = StyleSheet.create({
    root: { 
        padding: 20, 
        backgroundColor: COLORS.primaryOpacity, 
        borderRadius: 16,
        marginHorizontal: 15, 
    },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    focusCell: {
        borderColor: COLORS.primaryColor,
    },
    text: {
        color: COLORS.white,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    text2: {
        color: COLORS.white,
        alignSelf: 'center',
        textAlign: 'center',
    },
    text3: {
        color: COLORS.blue,
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});