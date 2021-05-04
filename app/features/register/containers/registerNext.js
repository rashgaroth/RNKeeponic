import React, { useState, useRef,} from 'react';
import { 
    View, 
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import {
    Text,
    Button
 } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';

import { KpnInput, KpnErrorDialog, KpnButton } from "../../../components"
import City from "../../../assets/images/svg/City";
import { COLORS } from "../../../utils/colors";
import * as registerActions from "../actions";

export default function RegisterNext(props){
    const [selectedProvince, setSelectedProvince] = useState();
    const [provinceId, setProvinceId] = useState();
    const [city, setCity] = useState();
    const [subdistrict, setSubdistrict] = useState();
    const [detail, setDetail] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [validButton, setValidButton] = useState(false);
    const [error, setError] = useState(1);
    
    const dispatch = useDispatch();
    const addressSelector = useSelector(state => state.registerReducer.address);
    const bottomSheetRef = (ref) => useRef(ref);

    const onChangePicker = (data, id) => {
        try{
            setCity(null)
            setSelectedProvince(data)
            setProvinceId(data)
            let city = addressSelector.city.filter(x => x.province_id === provinceId)
            console.log(city, "KOTA")
            setCity(city)
        }catch(err){
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
    }

    const onChangePostalCode = (data) => {
        setPostalCode(data)
    }

    const onChangeSubdist = (data) => {
        setSubdistrict(data)
    }

    const onNextRegistration = (data) => {
        const { 
        email,
        password,
        phone,
        name
        } = props.route.params;

        console.log(email, password)
        console.log(phone, name)
    }

    return (
        <>
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <View style={{ alignSelf: 'center'}}>
                <City />
            </View>
            <View style={{ alignSelf: 'center'}}>
                <Text h4>Pilih kota mu</Text>
            </View>
            <View style={styles.picker}>
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Provinsi</Text>
                <Picker
                    selectedValue={selectedProvince}
                    onValueChange={(itemValue, itemIndex) =>
                        onChangePicker(itemValue, itemIndex)
                    }>
                    { addressSelector.province.map(( element, index ) => (
                        <Picker.Item key={index} label={element.province_name} value={element.province_id} />
                    )) }
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
                                label="Detail Alamat"
                                onChangeText={text => onChangeDetail(text)}
                                value={detail}
                                style={{ marginHorizontal: 10}}
                            />
                            <Text style={{ marginLeft: 10, fontWeight: 'bold', marginTop: 10 }}>Kode Pos</Text>
                            <KpnInput
                                label="Kode Pos"
                                onChangeText={text => onChangePostalCode(text)}
                                value={postalCode}
                                style={{ marginHorizontal: 10 }}
                            />
                        </> :
                        null
                }
            </View>
        </ScrollView>
            <View style={styles.button}>
                {/* <KpnErrorDialog title="Gagal Registrasi" msg="yayaya" snap={error} ref={ref => bottomSheetRef(ref)}/> */}
                <KpnButton
                    text="Daftar Akun"
                    isRounded
                    disabled={!validButton}
                    style={{ marginTop: 10, opacity: 0.7, bottom: 15 }}
                    color={COLORS.secondColor}
                    onPress={(e) => onNextRegistration(e)}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    picker: {
        marginHorizontal: 10
    },
    button:{
        // flexDirection: 'row',
        // alignItems: 'center',
        // position: 'absolute', //Here is the trick
        backgroundColor: COLORS.white,
    }
})