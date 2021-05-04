import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Checkbox, HelperText, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Spinner from "react-native-loading-spinner-overlay";

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { Input, Text } from 'react-native-elements';
import SignUp from "../../../assets/images/svg/SignUp";
import Error from "../../../assets/images/svg/Error";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";

export default function RegisterPassword() {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');

    const dispatch = useDispatch();
    const fall = new Animated.Value(1);
    const userDataSelector = useSelector(state => state.registerReducer.userData);
    const bottomSheetErrorRef = useRef(null);
    const registerSelector = useSelector(state => state.registerReducer);

    const checkValidation = () => {
        if (userDataSelector.password === '') {
            setValidatorErrorMsg("Password tidak boleh kosong")
            return false
        } else if (userDataSelector.confirmationPassword != userDataSelector.password || userDataSelector.confirmationPassword === '') {
            setValidatorErrorMsg("Password tidak sama, atau kosong")
            return false
        } else {
            return true
        }
    }

    const onChangePassword = (t) => {
        dispatch(registerActions.onChangePassword(t))
    }

    const onChangeConfirmation = (t) => {
        dispatch(registerActions.onChangeConfirmationPassword(t))
    }

    const onRegistrationSubmit = () => {
        const validator = checkValidation();
        if (validator) {
            // navigate("RegisterVerification")
            dispatch(registerActions.submitRegistration())
        } else {
            bottomSheetErrorRef.current.snapTo(0);
        }
    }

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>Gagal Registrasi</Text>
                <Error />
                <Text style={styles.panelSubtitle}>{validatorErrorMsg}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <Button mode="contained" labelStyle={{ color: COLORS.white }} onPress={() => bottomSheetErrorRef.current.snapTo(1)} style={styles.button} color={COLORS.sans}>Oke</Button>
            </View>
        </View>
    );

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={COLORS.primaryOpacity} />
                <Spinner
                    visible={registerSelector.loadingPassword}
                    textContent={'Mengirim Email Verifikasi ...'}
                    textStyle={{ color: COLORS.white }}
                />
                <View style={{ alignSelf: "center" }}>
                    <SignUp />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Konfirmasi Passwordmu</Text>
                <View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <KpnInput
                            label="password"
                            onChangeText={text => onChangePassword(text)}
                            value={userDataSelector.password}
                            style={styles.input}
                            isSecure
                            isPassword
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Konfirmasi Password</Text>
                        <KpnInput
                            label="konfirmasi password"
                            onChangeText={text => onChangeConfirmation(text)}
                            value={userDataSelector.confirmationPassword}
                            // isError
                            style={styles.input}
                            isPassword
                            isSecure
                        />
                    </View>
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
            <BottomSheet
                ref={bottomSheetErrorRef}
                snapPoints={[360, 0]}
                renderHeader={renderHeader}
                renderContent={renderInner}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
            />
        </>
    );
}