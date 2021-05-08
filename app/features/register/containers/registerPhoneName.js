import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { Input, Text } from 'react-native-elements';
import UserData from "../../../assets/images/svg/UserData";
import Error from "../../../assets/images/svg/Error";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";

export default function RegisterPhoneName() {
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [isError, setIsError] = useState(false);

    const dispatch = useDispatch();
    const userDataSelector = useSelector(state => state.registerReducer.userData);
    const registerSelector = useSelector(state => state.registerReducer);

    const checkValidation = () => {
        if (userDataSelector.phone === '') {
            setValidatorErrorMsg("Nomor telepon tidak boleh kosong")
            setIsError(true)
            return false
        } else if (userDataSelector.name === '') {
            setValidatorErrorMsg("Nama tidak boleh kosong")
            setIsError(true)
            return false
        } else if (userDataSelector.phone === '' && userDataSelector.name === ''){
            setValidatorErrorMsg("Keduanya tidak boleh kosong")
            setIsError(true)
            return false
        } else if (userDataSelector.name <= 5){
            setValidatorErrorMsg("Masukan Nama Pertama Dan Kedua Mu")
            setIsError(true)
            return false
        } else {
            return true
        }
    }

    const onChangePhoneNumber = (t) => {
        dispatch(registerActions.onChangePhone(t))
    }

    const onChangeName = (t) => {
        dispatch(registerActions.onChangeName(t))
    }

    const onRegistrationSubmit = () => {
        const validator = checkValidation();
        if (validator) {
            navigate("RegisterPassword")
        } else {
            setErrVisible(true)
        }
    }

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    useEffect(() => {
        // dispatch(registerActions.getAddress())
    })

    const onPressAction = () => {
        setErrVisible(false)
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <UserData />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Kami Butuh Data Dirimu!</Text>
                <View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Nomor Telepon</Text>
                        <KpnInput
                            onChangeText={text => onChangePhoneNumber(text)}
                            value={userDataSelector.phone}
                            keyboardType="numeric"
                            // isError
                            style={styles.input}
                        // errorText={emailError}
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Nama</Text>
                        <KpnInput
                            onChangeText={text => onChangeName(text)}
                            value={userDataSelector.name}
                            // isError
                            style={styles.input}
                        // errorText={emailError}
                        />
                    </View>
                </View>
                <KpnButton
                    text="Selanjutnya"
                    isRounded
                    // disabled={!checkedTerms}
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