import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import BottomSheet, { BottomSheetScrollView,  BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper'

import * as registerActions from '../../register/actions';
import * as homeActions from '../../home/actions';
import * as loginActions from '../../login/actions';

import { height, ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { COLORS } from '../../../utils/colors';
import { IHome } from "../../interfaces";
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";

const Loading = props => <LottieView {...props} source={require("../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />

const BottomSheetProduct = ({ onFinishLoading }) => {
    const bottomSheetRef = useRef(null);
    const addressSelector = useSelector(state => state.registerReducer.address);
    const loadingSheet = useSelector(state => state.registerReducer.loadingNext); 
    const homeSelector:IHome = useSelector(state => state.homeReducer);
    const loginState = useSelector(state => state.loginReducer);

    const subdistrict = addressSelector.subdistrict;
    const city = addressSelector.city;
    const province = addressSelector.province;
    
    const pickerRef = useRef();
    const pickerCityRef = useRef();
    const pickerSubdistRef = useRef();
    const dispatch = useDispatch();
    
    const [provinceId, setProvinceId] = useState(null)
    const [cityId, setCityId] = useState(null)
    const [subdistrictId, setSubdistrictId] = useState(null)
    const [postalCode, setPostalCode] = useState('')
    const [cityArray, setCityArray] = useState(null)
    const [subdistrictArray, setSubdistrictArray] = useState(null)
    const [buttonBackDisabled, setButtonBackDisabled] = useState(true)
    const [buttonName, setButtonName] = useState('Lanjut')
    const [phone, setPhone] = useState(loginState.user.phone)
    const [detail, setDetail] = useState('')
    const [subdistName, setSubdisName] = useState(homeSelector.userAddress.subdistrict)
    const [cityName, setCityName] = useState(homeSelector.userAddress.city)
    
    const onChangePicker = (value, index) => {
        setProvinceId(value) //set id provinsi
        const cityFiltered = city.filter((v, i, a) => {
            if (v.province_id === value) {
                setPostalCode(v.postal_code)
            }
            return v.province_id === value
        })
        setCityArray(cityFiltered)
    }
    const onChangeCityPicker = (value, index) => {
        setCityId(value) //set id kota
        const subdistFiltered = subdistrict.filter((v, i, a) => {
            return v.city_id === value
        })
        setSubdistrictArray(subdistFiltered)
        // ambil data kode pos
        city.filter((v, i, a) => {
            if (v.city_id === value) {
                setPostalCode(v.postal_code)
                setCityName(v.city_name)
            }
            return true
        })
    }
    const onChangeSubdistPicker = (value, index) => {
        const nameSub = subdistrict.filter((v, i, a) => {
            return a[i].subdistrict_id === value
        });
        setSubdisName(nameSub[0].subdistrict_name)
        setSubdistrictId(value)
    }

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const onScrollEnd = (e, state, context) => {
        // console.log(e , "event")
        console.log(state.index, "event")
        if(state.index === 1){
            setButtonBackDisabled(false)
            setButtonName('Selesai')
        }else if(state.index === 0){
            setButtonBackDisabled(true)
            setButtonName('Lanjut')
        }
        // console.log(context, "event")
    }

    const onSubmitAddresses = async () => {
        const token = loginState.user.token
        const param = {
            userId: loginState.user.user_id,
            subdistrictId: subdistrictId,
            phone: phone,
            postalCode: postalCode,
            detail: detail
        }
        console.log(param, token, "BASE")
        console.log(subdistName, "nama sub")
        console.log(cityName, "nama kota")
        try {
            await dispatch(registerActions.setLoader(true, "loadingNext"))
            const _result = await apiServices.POST(
                API.BASE_URL + API.ENDPOINT.GET_PROFILE + "/userAddress", 
                param,
                HeaderAuth(token)
                )
            if (_result.status === 200 || _result.data.data) {
                console.log('success address')
                console.log("success")
                // TODO: ganti phone dan alamat
                await dispatch(homeActions.setAddressUpdated('subdistrict', subdistName))
                await dispatch(homeActions.setAddressUpdated('city', cityName))
                await dispatch(loginActions.setPhoneUpdated(phone))
                await dispatch(registerActions.setLoader(false, "loadingNext"))
                onFinishLoading(subdistName, cityName, phone, postalCode)
            } else {
                await dispatch(registerActions.setLoader(false, "loadingNext"))
            }
        } catch (error) {
            console.log("error : ", error)
            await dispatch(registerActions.setLoader(false, "loadingNext"))
        }
    }

    // useEffect(() => {
    //     const address = homeSelector.userAddress.subdistrict
    //     console.log(address, "alamat")
    //     console.log(homeSelector.isUserAddress, "is user address")
    //     if (!homeSelector.isUserAddress && !homeSelector.userAddress.subdistrict){
    //         setTimeout(() => {
    //             bottomSheetRef.current.snapTo(1)
    //         }, 500)
    //     }
    // }, [homeSelector.isUserAddress, homeSelector.userAddress.subdistrict])

    useEffect(() => {
        const getAddress = async () => {
            await dispatch(registerActions.getAddress())
        }

        getAddress()

        return () => dispatch(registerActions.setClearAddress())
    }, [null])

    return (
            <Swiper 
            style={styles.wrapper} 
            showsButtons={true}
            showsPagination={false}
            nextButton={
                <Button
                color={COLORS.primaryColor}
                style={{
                    // width: 200,
                    height: 30,
                    fontSize: 15,
                    justifyContent: "center",
                    alignSelf: "flex-end",
                }}
                theme={{
                    fonts: {
                                thin: 15
                            },
                            animation: 20,
                            roundness: 10
                        }}
                        onPress={ !buttonBackDisabled ? () => onSubmitAddresses() : null}
                        mode="outlined"
                        >{buttonName}</Button>
                    }
            prevButton={
                <Button
                color={COLORS.primaryColor}
                style={{
                    // width: 200,
                    height: 30,
                    fontSize: 15,
                    justifyContent: "center",
                    alignSelf: "flex-end",
                }}
                theme={{
                    fonts: {
                        thin: 15
                    },
                    animation: 20,
                    roundness: 10
                }}
                disabled={buttonBackDisabled}
                mode="outlined"
                >Kembali</Button>
            }
            onMomentumScrollEnd={(e, s, c) => onScrollEnd(e, s, c)}
            buttonWrapperStyle={{ 
                alignItems: 'flex-start',
                marginBottom: 20,
                position: 'relative',
            }}
            >
                <View style={styles.slide1}>
                {
                    !loadingSheet ? (
                        <View style={styles.picker}>
                            <Text style={styles.textBold}>Masukkan Alamat Baru</Text>
                            <Text style={[styles.textBold, { color: COLORS.blue }]}>Pilih Provinsi</Text>
                            <Picker
                                ref={pickerRef}
                                mode='dropdown'
                                onValueChange={(itemValue, itemIndex) =>
                                    onChangePicker(itemValue, itemIndex)
                                }
                            >
                                {
                                    province ? province.map((x, i) => (
                                        <Picker.Item key={i} label={x.province_name} value={x.province_id} />
                                    )) : null
                                }
                            </Picker>
                            {cityArray ?
                                <>
                                    <Text style={[styles.textBold, { color: COLORS.blue }]}>Pilih Kota</Text>
                                    <Picker
                                        ref={pickerCityRef}
                                        mode='dropdown'
                                        onValueChange={(itemValue, itemIndex) =>
                                            onChangeCityPicker(itemValue, itemIndex)
                                        }
                                    >
                                        {
                                            cityArray ? cityArray.map((x, i) => (
                                                <Picker.Item key={i} label={x.city_name} value={x.city_id} />
                                            )) : null
                                        }
                                    </Picker>
                                </> : null
                            }
                            {
                                subdistrictArray ?
                                    <>
                                        <Text style={[styles.textBold, { color: COLORS.blue }]}>Pilih Kecamatan</Text>
                                        <Picker
                                            ref={pickerSubdistRef}
                                            mode='dropdown'
                                            onValueChange={(itemValue, itemIndex) =>
                                                onChangeSubdistPicker(itemValue, itemIndex)
                                            }
                                        >
                                            {
                                                subdistrictArray ? subdistrictArray.map((x, i) => (
                                                    <Picker.Item key={i} label={x.subdistrict_name} value={x.subdistrict_id} />
                                                )) : null
                                            }
                                        </Picker>
                                    </> : null
                            }
                        </View>
                    )
                        :
                        (<Loading />)
                }
                </View>
                <View style={styles.slide2}>
                    {
                    !loadingSheet ? (
                        <View>
                            <Text style={[styles.textBold, { alignSelf: 'center' }]}>Masukkan Nomor Telepon</Text>
                            <TextInput
                                label="No Telepon"
                                value={phone}
                                // disabled
                                theme={{
                                    colors: {
                                        placeholder: COLORS.primaryColor,
                                        underlineColor: COLORS.white,
                                        primary: COLORS.primaryColor,
                                        background: COLORS.white,
                                    }
                                }}
                                style={styles.textInput}
                                keyboardType="number-pad"
                                // onFocus={onFocusPostalCode}
                                // onBlur={onBlurPostalCode}
                                mode="outlined"
                                onChangeText={(t) => setPhone(t)}
                            />
                            <Text style={[styles.textBold, { alignSelf: 'center', marginTop: 10 }]}>Masukkan Detail Alamatmu</Text>
                            <TextInput
                                label="Detail Alamat (Opsional)"
                                value={detail}
                                // disabled
                                theme={{
                                    colors: {
                                        placeholder: COLORS.primaryColor,
                                        underlineColor: COLORS.white,
                                        primary: COLORS.primaryColor,
                                        background: COLORS.white,
                                    }
                                }}
                                numberOfLines={5}
                                style={{
                                    marginTop: 10,
                                    width: 300,
                                    alignSelf: 'center',
                                    fontSize: 12,
                                }}
                                multiline
                                keyboardType="default"
                                // onFocus={onFocusPostalCode}
                                // onBlur={onBlurPostalCode}
                                mode="outlined"
                                onChangeText={(t) => setDetail(t)}
                            />
                        </View>
                    ) : (
                        <Loading />
                    )
                    }
                </View>
            </Swiper>
    );
};


BottomSheetProduct.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: 'white',
    },
    contentContainer: {
        alignItems: 'center',
        width: width,
        paddingBottom: 30,
        height: 400,
        maxHeight: 500
    },
    title: {
        fontWeight: 'bold',
    },
    list: {
        flex: 0,
        marginVertical: 10,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width,
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
    },
    picker: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        width: width,
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 12,
        color: COLORS.primaryColor
    },
    textNormal: {
        fontSize: 12,
        color: COLORS.primaryColor
    },
    anim: {
        height: 200,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    wrapper: {
      height: 250  
    },
    slide1:{
        height: 200,
        flex: 1,
    },
    slide2: {
        height: 200,
        flex: 1,
    },
    textInput: {
        height: 30,
        marginTop: 10,
        width: 300,
        alignSelf: 'center',
        fontSize: 12,
    },
    info: {
        marginLeft: 10,
        marginTop: 10,
        alignSelf: 'center',
        fontWeight: 'bold',
    }
});

export default BottomSheetProduct;
