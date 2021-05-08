import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Checkbox, Button, Snackbar } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { Input, Text } from 'react-native-elements';
import Password from "../../../assets/images/svg/Password";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";
import PasswordForm from "../components/passwordForm";

export default function RegisterPassword() {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();
    const userDataSelector = useSelector(state => state.registerReducer.userData);
    const registerSelector = useSelector(state => state.registerReducer);
    const errMsg = useSelector(state => state.registerReducer.errorMsg);

    const checkValidation = () => {
        if (userDataSelector.password === '') {
            setValidatorErrorMsg("Password Tidak Boleh Kosong")
            setIsError(true)
            return false
        } else if (userDataSelector.confirmationPassword != userDataSelector.password) {
            setValidatorErrorMsg("Password Tidak Sama")
            setIsError(true)
            return false
        } else if (userDataSelector.confirmationPassword === '') {
            setValidatorErrorMsg("Password Konfirmasi Tidak Boleh Kosong")
            setIsError(true)
            return false
        } else if (userDataSelector.confirmationPassword.length <= 8){
            setValidatorErrorMsg("Minimum Password yang dimasukkan adalah 8 huruf")
            setIsError(true)
            return false
        } else {
            return true
        }
    }

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    const onPressAction = () => {
        if (registerSelector.errorMsg.field === "email"){
            navigate("Register")
        }else{
            setErrVisible(true)
        }
    }

    const hasError = () => {
        if (errMsg.error) {
            if (registerSelector.errorType === "email") {
                setValidatorErrorMsg(`Email ${registerSelector.userData.email} Telah Terdaftar`)
                setIsError(true)
                setErrVisible(true)
            }
        }
    }

    useEffect(() => {
        console.log(errMsg)
        console.log(registerSelector.userData)
        
        console.log("Use effect will closed")
        
    }, [null])

    const onRegistrationSubmit = async () => {
        const validator = checkValidation();
        if (validator) {
            dispatch(registerActions.setLoader(true, "loadingPassword"))
            await dispatch(registerActions.getAddress())
            await dispatch(registerActions.submitRegistration())
        }else{
            setErrVisible(true)
        }
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
                <Spinner
                    visible={registerSelector.loadingPassword}
                    textContent={'Mengirim Email Verifikasi ...'}
                    textStyle={{ color: COLORS.white }}
                />
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <Password />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Konfirmasi Passwordmu</Text>
                <View>
                    <PasswordForm />
                    <View style={styles.terms}>
                        <Checkbox
                            status={checkedTerms ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setCheckedTerms(!checkedTerms);
                            }}
                            color={COLORS.primaryOpacity}
                        />
                        <Text onPress={() => setCheckedTerms(!checkedTerms)} style={{ marginTop: 8, color: COLORS.fontColor }}>Dengan ini saya menyetujui <Text style={{ color: COLORS.blue }} >Kebijakan Keeponic</Text></Text>
                    </View>
                </View>
                <KpnButton
                    text="Berikutnya"
                    isRounded
                    disabled={!checkedTerms}
                    style={{ marginTop: 10, opacity: 1, marginBottom: 10 }}
                    color={COLORS.secondColor}
                    onPress={() => onRegistrationSubmit()}
                />
            </ScrollView>
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
        </>
    );
}