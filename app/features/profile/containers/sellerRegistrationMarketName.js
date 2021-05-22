import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Snackbar, IconButton, Avatar, Switch } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { CheckBox } from 'react-native-elements'
import Spinner from "react-native-loading-spinner-overlay";

import { KpnInput, KpnButton } from '../../../components';
import BottomSheetComponent from '../components/bottomSheet';
import { width, height } from '../../../utils/theme';
import { COLORS } from '../../../utils/colors';
import LogoRounded from '../../../assets/images/svg/LogoRounded';
import { navigate } from '../../../navigation/NavigationService';

const heightAnim = height - (width + 100)
const widthAnim = width - 20
const defaultImage = "https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png"
const defaultMarketImages = "https://www.freeiconspng.com/thumbs/market-icons/market-icon-18.png"

export default function sellerRegistrationMarketName(props){

    const [marketName, setMarketName] = useState("")
    const [maxName, setMaxName] = useState(30)
    const [textInputColor, setTextInputColor] = useState(COLORS.primaryColor)
    const [marketDescription, setMarketDescription] = useState("")
    const [isFocused, setIsFocused] = useState(false)
    const [profileImages, setProfileImages] = useState(defaultImage)
    const [isImage, setisImage] = useState(0)
    const [isCompleteChecked, setIsCompleteChecked] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('')
    const [errVisible, setErrVisible] = useState(false)
    const [isError, setIsError] = useState(false)

    const onChangeMarketName = (name) => {
        setMarketName(name)
    }

    const onChangeMarketDescription = (text) => {
        setMarketDescription(text)
    }

    const onFocused = () => {
        setIsFocused(true)
    }

    const onBlured = () => {
        setIsFocused(false)
    }

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    const onPressAction = () => {
        setErrVisible(false)
    }

    const onOpenGallery = async () => {
        await ImagePicker.openPicker({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            cropperStatusBarColor: COLORS.sans,
            cropperToolbarColor: COLORS.sans,
            cropperActiveWidgetColor: COLORS.sans,
            useFrontCamera: true,
            showCropGuidelines: true,
            showCropFrame: true,
            hideBottomControls: true,
            freeStyleCropEnabled: true,
            cropperCircleOverlay: true,
        }).then(image => {
            setProfileImages(image.path)
            setisImage(true)
        });
    }

    const onOpenCamera = async () => {
        await ImagePicker.openCamera({
            width: 200,
            height: 200,
            cropping: true,
            includeBase64: true,
            cropperStatusBarColor: COLORS.sans,
            cropperToolbarColor: COLORS.sans,
            cropperActiveWidgetColor: COLORS.sans,
            useFrontCamera: true,
            showCropGuidelines: true,
            showCropFrame: true,
            hideBottomControls: true,
            freeStyleCropEnabled: true,
            cropperCircleOverlay: true,
        }).then(image => {
            setProfileImages(image.path)
            setisImage(true)
        });
    }

    const onDeleteImage = () => {
        Alert.alert(
            "Register Seller",
            "Hapus Foto ?",
            [
                {
                    text: "Batal",
                    onPress: () => {
                        
                    },
                    style: "cancel"
                },
                { 
                    text: "Hapus", 
                    onPress: () => {
                        setisImage(false)
                        setProfileImages(defaultImage)
                    }
                }
            ]
        );
    }

    const onChangeImageProfile = () => {
        Alert.alert(
            "Register Seller",
            "Pilih Aksi",
            [
                {
                    text: "Galeri",
                    onPress: async () => {
                        await ImagePicker.openPicker({
                            width: 200,
                            height: 200,
                            cropping: true,
                            includeBase64: true,
                            cropperStatusBarColor: COLORS.sans,
                            cropperToolbarColor: COLORS.sans,
                            cropperActiveWidgetColor: COLORS.sans,
                            useFrontCamera: true,
                            showCropGuidelines: true,
                            showCropFrame: true,
                            hideBottomControls: true,
                            freeStyleCropEnabled: true,
                            cropperCircleOverlay: true,
                        }).then(image => {
                            setProfileImages(image.path)
                            setisImage(true)
                        });
                    },
                    style: "cancel"
                },
                {
                    text: "Kamera",
                    onPress: async () => {
                        await ImagePicker.openCamera({
                            width: 200,
                            height: 200,
                            cropping: true,
                            includeBase64: true,
                            cropperStatusBarColor: COLORS.sans,
                            cropperToolbarColor: COLORS.sans,
                            cropperActiveWidgetColor: COLORS.sans,
                            useFrontCamera: true,
                            showCropGuidelines: true,
                            showCropFrame: true,
                            hideBottomControls: true,
                            freeStyleCropEnabled: true,
                            cropperCircleOverlay: true,
                        }).then(image => {
                            setProfileImages(image.path)
                            setisImage(true)
                        });
                    }
                }
            ]
        );
    }

    const inputValidator = () => {
        if(marketName.length > 30){
            setValidatorErrorMsg("Nama Toko Tidak Boleh Lebih Dari 30 Huruf")
            setIsError(true)
            setErrVisible(true)
            return false
        }else if(marketName === ""){
            setValidatorErrorMsg("Nama Toko Tidak Boleh Kosong")
            setIsError(true)
            setErrVisible(true)
            return false
        }else{
            return true
        }
    }
    
    const onSubmit = () => {
        const validator = inputValidator()
        const { email } = props.route.params
        const param = {
            email: email,
            market_avatar: isImage ? profileImages : defaultMarketImages,
            market_name: marketName,
            market_description: marketDescription
        }
        if(validator){
            if(isCompleteChecked){
                navigate("SellerRegistration", param)
            }else{
                setValidatorErrorMsg("Kamu Harus Menyetujui Nama Toko dan Deskripsi")
                setIsError(true)
                setErrVisible(true)
            }
        }
    }

    return (
        <>
        <ScrollView style={styles.container}>
            <Spinner
                visible={isLoading}
                textContent={''}
                textStyle={{ color: COLORS.white }}
            />
            <View>
                <LottieView source={require("../../../assets/anim/market_open.json")} autoPlay loop style={styles.anim} />
                <View style={styles.row}>
                    <Text style={styles.textNormal}>Selamat Datang Di <Text style={styles.textBold}>Keeponic Seller</Text></Text>
                    <LogoRounded
                    color={COLORS.primaryColor}
                    style={{ marginLeft: 5 }}
                    />
                </View>
                <Text style={styles.textNormalDesc}>
                    Kami membutuhkan nama Toko, deskripsi, hingga foto profile Toko kamu, 
                    pastikan Toko yang kamu masukkan valid dan mudah untuk dicari, dan deskripsi 
                    tokomu sesuai dengan Toko yang kamu miliki!</Text>
                <View style={styles.colomn}>
                    <View>
                        <Text style={styles.inputTitle}>Upload Foto Profile Toko</Text>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => onOpenGallery()}>
                                <Avatar.Image 
                                style={{ 
                                    opacity: 1,
                                    backgroundColor: COLORS.black,
                                    marginTop: 10
                                }}
                                size={170} 
                                source={{ uri: profileImages }} 
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.row, { justifyContent: "center" }]}>
                            <TouchableOpacity onPress={ isImage ? () => onChangeImageProfile() : () => onOpenCamera() } >
                                <Text style={[styles.smallText, { color: COLORS.primaryColor, fontSize: 15 }]}> { isImage ? "Ubah" : "Kamera" } </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={isImage ? () => onDeleteImage() : () => onOpenGallery()}>
                                <Text style={[styles.smallText, { color: COLORS.error, marginLeft: 40, fontSize: 15 }]}> { isImage ? "Hapus" : "Galeri" } </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Nama Toko</Text>
                        <KpnInput
                            onChangeText={(text) => setMarketName(text)}
                            style={styles.input}
                            value={marketName}
                            primaryColor={textInputColor}
                        />
                        <Text style={styles.smallText}>Maksimal Nama Toko Adalah {maxName}</Text>
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Deskripsi Toko</Text>
                        <View>
                        <TextInput
                            style={[styles.inputDescription, isFocused ? { borderWidth: 2 } : { borderWidth: 1 }]}
                            value={marketDescription}
                            numberOfLines={10}
                            multiline={true}
                            onFocus={() => onFocused()}
                            onBlur={() => onBlured()}
                            onChangeText={(text) => setMarketDescription(text)}
                            />
                    </View>
                    <View style={[styles.row, { justifyContent: 'flex-start', marginBottom: 20 }]}>
                        <Switch 
                        value={isCompleteChecked} 
                        onValueChange={() => setIsCompleteChecked(!isCompleteChecked)} 
                        color={COLORS.sans}
                        style={{ alignSelf: "flex-start" }}
                        />
                        <Text style={[styles.inputTitle, { marginTop: 3 }]}>Konfirmasi Nama Toko dan Deskripsi Tokomu</Text>
                    </View>
                    <View>
                        <KpnButton 
                            text="Berikutnya"
                            style={styles.button}
                            onPress={() => onSubmit()}
                        />
                    </View>
                    </View>
                </View>
            </View>
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

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        marginHorizontal: 10,
        backgroundColor: COLORS.white
    },
    anim: {
        height: heightAnim,
        width: widthAnim,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textNormal: {
        fontSize: 19,
        color: COLORS.fontColor,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textNormalDesc: {
        fontSize: 13,
        color: COLORS.fontColor,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        marginHorizontal: 20
    },
    textBold: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primaryColor
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    colomn: {
        flexDirection: "column",
        justifyContent: 'center'
    }, 
    form: {
        // marginHorizontal: 20,
        alignSelf: 'auto',
        paddingVertical: 10,
    },
    inputTitle: {
        fontWeight: "bold",
        // bottom: 0,
        // top: 15
        // marginLeft: 10
    },
    input: {
        height: 40,
        width: widthAnim,
        fontSize: 16
    },
    smallText: {
        fontSize: 12,
        color: COLORS.blue,
        fontWeight: "bold",
        marginTop: 7
    },
    inputDescription: {
        height: 150,
        width: widthAnim,
        fontSize: 16,
        marginTop: 10,
        justifyContent: "flex-start",
        borderColor: COLORS.primaryColor,
        // borderWidth: 1,
        backgroundColor: COLORS.white,
        textAlignVertical: 'top'
    },
    checkBox: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    button: {
        width: 200,
        alignSelf: 'flex-end',
        marginRight: 20
    }
})
