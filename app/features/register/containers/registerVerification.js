import React, { useState, useRef, useEffect } from 'react';
import { View, StatusBar, SafeAreaView, StyleSheet } from 'react-native';
import { Checkbox, HelperText, Button } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import Spinner from "react-native-loading-spinner-overlay";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Input, Text } from 'react-native-elements';

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { COLORS } from "../../../utils/colors";
import SignUp from "../../../assets/images/svg/SignUp";
import Error from "../../../assets/images/svg/Error";
import { KpnButton, KpnDivider, KpnInput } from "../../../components"
import { navigate } from '../../../navigation/NavigationService';
import * as registerActions from "../actions";

const CELL_COUNT = 4;

export default function RegisterVerification() {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    
    const dispatch = useDispatch();
    const fall = new Animated.Value(1);
    const userDataSelector = useSelector(state => state.registerReducer.userData);
    const bottomSheetErrorRef = useRef(null);
    const registerSelector = useSelector(state => state.registerReducer);

    const checkValidation = () => {
        if (value === '') {
            setValidatorErrorMsg("Password tidak boleh kosong")
            return false
        } else {
            return true
        }
    }

    const onRegistrationSubmit = () => {
        const validator = checkValidation();
        if (validator) {
            // dispatch(registerActions.onChangeVerification(value))
            dispatch(registerActions.setLoader(true, "loading"))
            // navigate("RegisterNext")
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
                    visible={registerSelector.loading}
                    textContent={'Mengirim Email Verifikasi ...'}
                    textStyle={{ color: COLORS.white }}
                />
                <View style={{ alignSelf: "center" }}>
                    <SignUp />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Konfirmasi Kode Verifikasi</Text>
                <View>
                    <SafeAreaView style={stylesLocal.root}>
                        <CodeField
                            ref={ref}
                            caretHidden={false} // when users can't paste a text value, because context menu doesn't appear
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={stylesLocal.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[stylesLocal.cell, isFocused && stylesLocal.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </SafeAreaView>
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

const stylesLocal = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        color: COLORS.primaryColor,
        borderColor: COLORS.primaryColor,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: COLORS.primaryColor,
    },
});