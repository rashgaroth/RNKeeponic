import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Checkbox, HelperText, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { Input, Text } from 'react-native-elements';
import SignUp from "../../../assets/images/svg/SignUp";
import Error from "../../../assets/images/svg/Error";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";

export default function RegisterPhoneName(props) {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');

    const dispatch = useDispatch();
    const fall = new Animated.Value(1);
    const userDataSelector = useSelector(state => state.registerReducer.userData);
    const bottomSheetErrorRef = useRef(null);

    const checkValidation = () => {
        if (userDataSelector.phone === '') {
            setValidatorErrorMsg("Nomor telepon tidak boleh kosong")
            return false
        } else if (userDataSelector.name === '') {
            setValidatorErrorMsg("Nama tidak boleh kosong")
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
            bottomSheetErrorRef.current.snapTo(0);
        }
    }

    useEffect(() => {
        dispatch(registerActions.getAddress())
    })

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
                <View style={{ alignSelf: "center" }}>
                    <SignUp />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Kami Butuh Data Dirirmu!</Text>
                <View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Nomor Telepon</Text>
                        <KpnInput
                            label="Telepon"
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
                            label="Nama"
                            onChangeText={text => onChangeName(text)}
                            value={userDataSelector.name}
                            // isError
                            style={styles.input}
                        // errorText={emailError}
                        />
                    </View>
                </View>
                <KpnButton
                    text="Daftar Akun"
                    isRounded
                    // disabled={!checkedTerms}
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