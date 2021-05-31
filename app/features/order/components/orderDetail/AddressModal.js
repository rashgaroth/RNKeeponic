import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { 
    Card, 
    Text, 
    IconButton, 
    Switch,
    Button,
    TextInput,
} from 'react-native-paper';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';

import { useSelector, useDispatch } from "react-redux";
import * as registerActions from '../../../register/actions';

import { COLORS } from '../../../../utils/colors';
import { IHome } from "../../../interfaces";
import { height, width } from '../../../../utils/theme';

const Loading = props => <LottieView {...props} source={require("../../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />
const SCROLL_Y_FOCUS_DETAIL = 202.05882263183594;
const SCROLL_Y_FOCUS_POSTAL_CODE = 50;

const AddressCard = () => {

    const [checked, setChecked] = useState(false);

    const onPressDelete = () => {
        console.log("deleted")
    }

    return(
        <Card style={styles.addressCard}>
            <View>
                <IconButton 
                size={17} 
                icon="trash-can-outline" 
                color={COLORS.primaryColor} 
                style={styles.deleteButton} 
                onPress={onPressDelete}
                />

                <Switch
                value={checked}
                style={styles.switch}
                color={COLORS.primaryColor}
                onValueChange={() => setChecked(!checked)}
                />
                <View style={styles.containerAddressCard}>
                    <Text style={styles.textNormal}> Kecamatan : <Text style={styles.textBold} >Siliwangi</Text> </Text>
                    <Text style={styles.textNormal}> Kota : <Text style={styles.textBold} >Bandung</Text> </Text>
                    <Text style={styles.textNormal}> Provinsi : <Text style={styles.textBold} >Jawa Barat</Text> </Text>
                </View>
            </View>
        </Card>
    )
}

const RenderForm = ({
    postalCode, 
    detail, 
    onFocusPostalCode, 
    onBlurPostalCode,
    onFocusDetail,
    onBlurDetail,
    onChangeDetail,
    onChangePostalCode,
}) => {

    return (
        <KeyboardAvoidingView behavior="position">
            <TextInput
                label="Kode Pos"
                value={postalCode}
                // disabled
                theme={{
                    colors: {
                        placeholder: COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: COLORS.primaryColor,
                        background: COLORS.white,
                    }
                }}
                style={{ marginBottom: 10 }}
                onFocus={onFocusPostalCode}
                onBlur={onBlurPostalCode}
                mode="outlined"
                onChangeText={onChangePostalCode}
            />
            <TextInput
                label="Detail Alamat"
                value={detail}
                // disabled
                theme={{
                    colors: {
                        placeholder: COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: COLORS.primaryColor,
                        background: COLORS.white,
                    },
                }}
                style={{
                    // height: 200,
                    textAlignVertical: 'top'
                }}
                multiline={true}
                numberOfLines={5}
                onFocus={onFocusDetail}
                onBlur={onBlurDetail}
                mode="outlined"
                onChangeText={onChangeDetail}
            />
            <Button 
            icon="check-all" 
            mode="outlined" 
            onPress={() => console.log('Pressed')}
            style={{ 
                marginTop: 10
            }}
            color={COLORS.sans}
            >
                Selesai
            </Button>
        </KeyboardAvoidingView>
    )
}

const ModalView = ({ subdistrict, city, province }) => {
    const [provinceId, setProvinceId] = useState(null)
    const [cityId, setCityId] = useState(null)
    const [subdistrictId, setSubdistrictId] = useState(null)
    const [cityArray, setCityArray] = useState(null)
    const [subdistrictArray, setSubdistrictArray] = useState(null)
    const [postalCode, setPostalCode] = useState('')
    const [detail, setDetail] = useState('')
    const [scrollPadding, setScrollPadding] = useState(20)

    const pickerRef = useRef();
    const pickerCityRef = useRef();
    const pickerSubdistRef = useRef();
    const scrollRef = useRef();
    // console.log(city, "kota")

    const onChangePicker = (value, index) => {
        setProvinceId(value) //set id provinsi
        const cityFiltered = city.filter((v, i, a) => {
            if(v.province_id === value){
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
            }
            return true
        })
    }
    const onChangeSubdistPicker = (value, index) => {
        setSubdistrictId(value)
    }  
    const onFocusPostalCode = () => {
        setTimeout(() => {
            scrollRef.current?.scrollTo({
                y: SCROLL_Y_FOCUS_POSTAL_CODE,
                animated: true,
            });
        }, 500);
    }
    const onFocusDetail = () => {
        setScrollPadding(150)
        setTimeout(() => {
            scrollRef.current?.scrollTo({
                y: SCROLL_Y_FOCUS_DETAIL,
                animated: true,
            });
        }, 500);
    }
    const onBlurPostalCode = () => {
        console.log("on Blur")
    }
    const onBlurDetail = () => {
        setScrollPadding(20)
    }

    return(
        <ScrollView 
        ref={(ref) => (scrollRef.current = ref)}
        style={styles.modalView}
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={{ 
            paddingBottom: scrollPadding
        }}
        onScroll={(e) => {
            console.log(e.nativeEvent.contentOffset.y, "scroll")
        }}
        >
            <Text style={styles.textBold}>Daftar Alamat yang Kamu Miliki</Text>
            <AddressCard />
            <View>
                <Text style={styles.textBold}>Masukkan Alamat Baru</Text>
                <Text style={[styles.textBold, { marginTop: 10, marginLeft: 15, color: COLORS.blue }]}>Pilih Provinsi</Text>
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
                { cityArray ? 
                <>
                    <Text style={[styles.textBold, { marginLeft:15, color: COLORS.blue }]}>Pilih Kota</Text>
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
                        <Text style={[styles.textBold, { marginLeft: 15, color: COLORS.blue }]}>Pilih Kecamatan</Text>
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
                        <RenderForm 
                        postalCode={postalCode} 
                        detail={detail}
                        onChangePostalCode={(t) => setPostalCode(t)}
                        onChangeDetail={(t) => setDetail(t)}
                        onFocusPostalCode={(e) => onFocusPostalCode(e)}
                        onFocusDetail={(e) => onFocusDetail(e)}
                        onBlurPostalCode={(e) => onBlurPostalCode(e)}
                        onBlurDetail={(e) => onBlurDetail(e)}
                        />
                    </> : null
                }
            </View>
        </ScrollView>
    )
}

const ModalHeader = ({ onPress }) => {
    return (
        <Card.Title
            titleStyle={{ fontSize: 14 }}
            title={"Tambah Alamat"}
            left={
                (props) => 
                <IconButton 
                {...props} 
                size={20} 
                icon="keyboard-backspace" 
                color={COLORS.sans} 
                style={{ backgroundColor: COLORS.white }}
                onPress={onPress}
                />
            }
        />
    )
}

const ModalContent = ({onBackPressed}) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addressSelector = useSelector(state => state.registerReducer.address);
    const subdistrict = addressSelector.subdistrict;
    const city = addressSelector.city;
    const province = addressSelector.province;

    return(
        <View style={styles.container}>
            <ModalHeader onPress={onBackPressed} />
            {
                loading ? 
                <Loading /> : 
                <ModalView 
                subdistrict={subdistrict ? subdistrict : null}
                city={city ? city : null}
                province={province ? province : null}
                />
            }
        </View>
    )
}

const AddressModal = ({ visible, onBackDropPressed }) => {
    const addressSelector: IHome = useSelector(state => state.homeReducer);

    return (
        <View>
            <Modal 
            isVisible={visible}
            onBackdropPress={onBackDropPressed}
            deviceWidth={width}
            deviceHeight={height}
            animationIn="slideInLeft"
            animationInTiming={1000}
            animationOut="slideOutLeft"
            animationOutTiming={1000}
            avoidKeyboard={true}
            >
                <ModalContent onBackPressed={onBackDropPressed} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height - 200,
        marginHorizontal: 20,
        backgroundColor: COLORS.white
    },
    modalView: {
        marginHorizontal: 10
    },
    addressCard: {
        marginVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primaryColor,
        backgroundColor: COLORS.greenSans,
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
    containerAddressCard: {
        margin: 10
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    switch:{
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    anim: {
        height: 200,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    }
})

AddressModal.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func
};


export default AddressModal;
