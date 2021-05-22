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
import * as registerActions from "../../register/actions";
import { api } from '../../../api';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';

export default function RegisterPassword(props) {
    const [checkedTerms, setCheckedTerms] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const userAddressSelector = useSelector(state => state.homeReducer.userAddress); 

    const checkValidation = () => {
        if (password === '') {
            setValidatorErrorMsg("Password Tidak Boleh Kosong")
            setIsError(true)
            return false
        } else if (confirmation != password) {
            setValidatorErrorMsg("Password Tidak Sama")
            setIsError(true)
            return false
        } else if (confirmation === '') {
            setValidatorErrorMsg("Password Konfirmasi Tidak Boleh Kosong")
            setIsError(true)
            return false
        } else if (confirmation.length <= 8) {
            setValidatorErrorMsg("Minimum Password yang dimasukkan adalah 8 huruf")
            setIsError(true)
            return false
        } else if (confirmation == '' && password == '') {
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
        setErrVisible(false)
    }

    useEffect(() => {

        console.log("Use effect will closed")

    }, [null])

    const postSellerRegistration = async (param) => {
        try {
            setLoading(true)
            const _data = await apiServices.POST(API.BASE_URL + API.ENDPOINT.SELLER_REGISTER, param)
            if (_data.status === 200 && _data.data.error < 1) {
                const param = {
                    userData: _data.data.data
                }
                setIsError(false)
                setValidatorErrorMsg(_data.data.message)
                setErrVisible(true)
                setLoading(false) 
                if (userAddressSelector.subdistrict){
                    navigate("SellerRegistrationSuccess")
                }else{
                    navigate("SellerRegistrationNext", param)
                }
            } else {
                setLoading(false)
                setValidatorErrorMsg(_data.message)
                setErrVisible(true)
                setIsError(true)
            }
        } catch (error) {
            console.error(error, "Error")
            setLoading(false)
        }
    };

    const onRegistrationSubmit = async () => {
        const validator = checkValidation();
        const { email, market_avatar, market_name, market_description } = props.route.params
        if (validator) {
            const param = {
                email: email,
                password: password,
                market_avatar: market_avatar,
                market_name: market_name,
                market_description: market_description
            }
            await postSellerRegistration(param)
        } else {
            setErrVisible(true)
        }
    }

    const onChangeConfirmation = (text) => {
        setConfirmation(text)
    }

    const onChangePassword =(text) => {
        setPassword(text)
    }

    return (
        <>
            <ScrollView style={styles.container}>
                <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
                <Spinner
                    visible={loading}
                    textContent={'Mengirim Email Verifikasi ...'}
                    textStyle={{ color: COLORS.white }}
                />
                <View style={{ alignSelf: "center", marginTop: 10 }}>
                    <Password />
                </View>
                <Text h4 style={{ justifyContent: 'center', alignSelf: "center" }}>Konfirmasi Passwordmu</Text>
                <Text style={{ justifyContent: 'center', alignSelf: "center", textAlign: "center", color: COLORS.fontColor}}>
                    Kami membutuhkan passwordmu untuk melakukan login kepada web supplier milik kami, password yang kamu masukkan disini
                    tidak akan merubah data-data yang terdapat pada akun Google, Gmail, dan layanan Google lainnya, maka keamanan password
                    yang kamu masukkan akan terjamin.
                </Text>
                <View>
                    <KeyboardAvoidingView>
                        <View style={styles.container}>
                            <View>
                                <View style={styles.form}>
                                    <Text style={styles.inputTitle}>Password</Text>
                                    <KpnInput
                                        onChangeText={text => onChangePassword(text)}
                                        value={password}
                                        style={styles.input}
                                        isSecure
                                        isPassword
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.inputTitle}>Konfirmasi Password</Text>
                                    <KpnInput
                                        onChangeText={text => onChangeConfirmation(text)}
                                        value={confirmation}
                                        // isError
                                        style={styles.input}
                                        isPassword
                                        isSecure
                                    />
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
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