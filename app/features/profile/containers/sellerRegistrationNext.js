import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    BackHandler,
    StatusBar,
    KeyboardAvoidingView
} from 'react-native';
import {
    Text,
    Button
} from 'react-native-elements';
import { Snackbar } from "react-native-paper"
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "react-native-loading-spinner-overlay";

import { KpnInput, KpnErrorDialog, KpnButton } from "../../../components"
import City from "../../../assets/images/svg/City";
import { COLORS } from "../../../utils/colors";
import * as registerActions from "../../register/actions";
import { navigate } from '../../../navigation/NavigationService';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';

export default function RegisterNext(props) {
    const [selectedProvince, setSelectedProvince] = useState();
    const [provinceId, setProvinceId] = useState();
    const [city, setCity] = useState();
    const [subdistrict, setSubdistrict] = useState();
    const [detail, setDetail] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [validButton, setValidButton] = useState(false);
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addressSelector = useSelector(state => state.registerReducer.address);
    const registerSelector = useSelector(state => state.registerReducer);
    const userSelector = useSelector(state => state.homeReducer);

    const onChangePicker = (data, id) => {
        try {
            setCity(null)
            setSelectedProvince(data)
            setProvinceId(data)
            if (addressSelector.city) {
                let city = addressSelector.city.filter(x => x.province_id === provinceId)
                console.log(city, "KOTA")
                setCity(city)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const onChangePickerCity = (data, id) => {
        try {
            setCity(data)
            setSubdistrict(data)
            setValidButton(!validButton)
        } catch (err) {
            console.log(err)
        }
    }

    const onChangeDetail = (data) => {
        setDetail(data)
        // dispatch(registerActions.onChangeDetailAddress(data))
        console.log(registerSelector.userData)
    }

    const onChangePostalCode = (data) => {
        console.log(registerSelector.userData.postalCode)
        // dispatch(registerActions.onChangePostalCode(data))
        setPostalCode(data)
    }

    const onChangeSubdist = (data) => {
        // dispatch(registerActions.onChangeSubdistrict(data))
        setSubdistrict(data)
    }

    const validator = () => {
        if (detail === "" && postalCode === "") {
            setValidatorErrorMsg("Detail dan Kode Post tidak boleh kosong")
            setIsError(true)
            setErrVisible(true)
            return false
        } else if (detail === "") {
            setValidatorErrorMsg("Detail tidak boleh kosong")
            setIsError(true)
            setErrVisible(true)
            return false
        } else if (postalCode === "") {
            setValidatorErrorMsg("Kode Pos tidak boleh kosong")
            setIsError(true)
            setErrVisible(true)
            return false
        } else if (detail.length < 5) {
            setValidatorErrorMsg("Tuliskan alamat detail secara rinci")
            setIsError(true)
            setErrVisible(true)
            return false
        } else if (isNaN(postalCode)) {
            setValidatorErrorMsg("Kode pos harus terisi dengan benar")
            setIsError(true)
            setErrVisible(true)
            return false
        } else {
            return true
        }
    }

    const postAddress = async () => {
        try {
            setLoading(true)
            const { userData } = props.route.params
            const param = {
                subdistrict: subdistrict,
                user_id: userData.id,
                postal_code: postalCode,
                detail: detail
            }
            console.log(param, "param");
            const _data = await apiServices.POST(API.BASE_URL + API.ENDPOINT.REGISTER + "/address", param)
            if (_data.status === 200 && _data.data.error < 1) {
                setIsError(false)
                setValidatorErrorMsg(_data.data.message)
                setErrVisible(true)
                setLoading(false)
                navigate("Home")
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
    }

    const onNextRegistration = async () => {
        console.log(subdistrict, "sub")
        const isValidate = validator();
        if (isValidate) {
            await postAddress();
            // dispatch(registerActions.submitAddress(subdistrict, postalCode, detail))
        } else {

        }
    }

    useEffect(() => {
        console.log("hit use Effect!")
        const fetchAddress = async () => {
            await dispatch(registerActions.getAddress())
        }
        const backAction = () => {
            Alert.alert("Keeponic", "Batalkan Registrasi ?", [
                {
                    text: "Lanjut",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Batalkan", onPress: () => navigate("Home") }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        fetchAddress()

        return () => backHandler.remove();
    }, [null])

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    const onPressAction = () => {
        setErrVisible(false)
    }

    return (
        <>
            <KeyboardAvoidingView>
                <ScrollView style={{ backgroundColor: COLORS.white }}>
                    <StatusBar backgroundColor={COLORS.white} animated barStyle="dark-content" />
                    <Spinner
                        visible={loading}
                        textContent={'Mohon Tunggu ...'}
                        textStyle={{ color: COLORS.white }}
                    />
                    <View style={{ alignSelf: "center", marginTop: 10 }}>
                        <City />
                    </View>
                    <View style={{ alignSelf: 'center' }}>
                        <Text h4 style={{ alignSelf: 'center'}}>Lengkapi Alamat Toko Mu!</Text>
                        <Text style={{ justifyContent: 'center', alignSelf: "center", textAlign: "center", color: COLORS.fontColor}}>
                            Kami membutuhkan alamat toko mu untuk menjaga kepercayaan pelanggan anda
                        </Text>
                    </View>
                    <View style={styles.picker}>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Provinsi</Text>
                        <Picker
                            selectedValue={selectedProvince}
                            onValueChange={(itemValue, itemIndex) =>
                                onChangePicker(itemValue, itemIndex)
                            }>
                            {addressSelector.province ? addressSelector.province.map((element, index) => (
                                <Picker.Item key={index} label={element.province_name} value={element.province_id} />
                            )) : null}
                        </Picker>
                        {
                            city ?
                                <>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Kota</Text>
                                    <Picker
                                        selectedValue={city}
                                        onValueChange={(itemValue, itemIndex) =>
                                            onChangePickerCity(itemValue)
                                        }>
                                        {addressSelector.city.filter(x => x.province_id == provinceId).map((element, index) => (
                                            <Picker.Item key={index} label={element.city_name} value={element.city_id} />
                                        ))}
                                    </Picker>
                                </> :
                                null
                        }
                        {
                            subdistrict ?
                                <>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Kecamatan</Text>
                                    <Picker
                                        selectedValue={subdistrict}
                                        onValueChange={(itemValue, itemIndex) =>
                                            onChangeSubdist(itemValue)
                                        }>
                                        {addressSelector.subdistrict.filter(x => x.city_id == city).map((element, index) => (
                                            <Picker.Item key={index} label={element.subdistrict_name} value={element.subdistrict_id} />
                                        ))}
                                    </Picker>
                                </> :
                                null
                        }
                        {
                            subdistrict ?
                                <>
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Detail Alamat</Text>
                                    <KpnInput
                                        // label="Detail Alamat"
                                        onChangeText={text => onChangeDetail(text)}
                                        value={detail}
                                        style={{ marginHorizontal: 10 }}
                                    />
                                    <Text style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>Kode Pos</Text>
                                    <KpnInput
                                        // label="Kode Pos"
                                        onChangeText={text => onChangePostalCode(text)}
                                        value={postalCode}
                                        style={{ marginHorizontal: 10 }}
                                    />
                                </> :
                                null
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.button}>
                {/* <KpnErrorDialog title="Gagal Registrasi" msg="yayaya" snap={error} ref={ref => bottomSheetRef(ref)}/> */}
                <KpnButton
                    text="Daftar Akun"
                    isRounded
                    // disabled={!validButton}
                    style={{ marginTop: 10 }}
                    // color={{ color: COLORS.primaryColor }}
                    color={COLORS.secondColor}
                    onPress={(e) => onNextRegistration(e)}
                />
            </View>
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

const styles = StyleSheet.create({
    picker: {
        marginHorizontal: 10
    },
    button: {
        // flexDirection: 'row',
        // alignItems: 'center',
        // position: 'absolute', //Here is the trick
        backgroundColor: COLORS.white,
    }
})
