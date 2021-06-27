import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    Linking
} from 'react-native';
import { Button, IconButton, Avatar, Switch, TextInput } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay"
// import BottomSheet from '@gorhom/bottom-sheet';
// import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import {
    GoogleSignin
} from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from "../../../utils/colors";
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate, getInitials } from "../../../utils/stringUtils";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import * as loginActions from "../../login/actions";
import * as homeActions from "../../home/actions";
import { removeAllItems } from "../../../services/asyncStorage";
import { navigate } from '../../../navigation/NavigationService';

export default function Profile({ onAddress, onQuis }) {
    const [notificationSwitch, setNotificationSwitch] = useState(false);
    const [field, setField] = useState('');
    const [fieldValue, setFieldValue] = useState('');
    const [profileImages, setProfileImages] = useState('https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg')
    const [isPhotoUpdated, setIsPhotoUpdated] = useState(false);
    const [url, setUrl] = useState("https://development.d3rwng03cwc4kn.amplifyapp.com/login")

    const dispatch = useDispatch();
    const homeSelector = useSelector(state => state.homeReducer);
    const loginSelector = useSelector(state => state.loginReducer);
    const userProfile = homeSelector.userProfile;
    const userAddress = homeSelector.userAddress;
    const isSeller = loginSelector.user.is_admin;
    const isSupplier = homeSelector.isSeller;
    const detailUser = [
        {
            title: "Nama",
            content: userProfile.name,
        },
        {
            title: "Kecamatan",
            content: userAddress.subdistrict === "" ? "Kecamatan belum diisi" : userAddress.subdistrict
        },
        {
            title: "Kota",
            content: userAddress.city === "" ? "Kota belum diisi" : userAddress.city,
        },
        {
            title: "Provinsi",
            content: userAddress.prov === "" ? "Provinsi belum diisi" : userAddress.prov
        },
        {
            title: "Email",
            content: userProfile.email,
        }
    ]

    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem("@userLoggedIn")
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await removeAllItems();
            await dispatch(homeActions.clearUser());
            await dispatch(loginActions.logOut());
        } catch (error) {
            console.error(error);
        }
    };
    const onSwitchNotification = () => {
        setNotificationSwitch(!notificationSwitch);
    }

    // Ref setiap bottomSheet
    const bottomSheetRef = useRef(null);
    const bottomSheetEditRef = useRef(null);
    const bottomSheetEditPhotoRef = useRef(null);

    const fall = new Animated.Value(1);

    useEffect(() => {

        const configureGoogleSignin = async () => {
            await GoogleSignin.configure({
                webClientId: '871007962536-lboqlstf7fm24d6ovlmqopjsc3up0sql.apps.googleusercontent.com',
                offlineAccess: true,
            });
        }

        configureGoogleSignin()

        if (userProfile.avatar) {
            setProfileImages(userProfile.avatar)
        } else {
            setProfileImages("https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg")
        }
    }, [null]);

    const onPressDaftarToko = useCallback(async () => {
        if(isSeller === 0){
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                onQuis(url)
            } else {
                Alert.alert(`Tidak Bisa Membuka Website: ${url}`);
            }
        }else{
            const param = {
                email: userProfile.email
            }
            navigate("SellerRegistrationMarketName", param)
        }
    }, [url]);

    // Render Bottom Sheet

    const renderHeader = () => (
        <View style={stylesLocal.header}>
            <View style={stylesLocal.panelHeader}>
                <View style={stylesLocal.panelHandle} />
            </View>
        </View>
    );

    const renderAlertLogout = () => (
        <View style={stylesLocal.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={stylesLocal.panelTitle}>Keluar Akun?</Text>
                <Text style={stylesLocal.panelSubtitle}>Anda dapat melakukan Login kembali</Text>
            </View>
            <View style={stylesLocal.buttonGroup}>
                <Button mode="contained" onPress={onLogout} style={stylesLocal.button} color={COLORS.red}>Keluar</Button>
                <Button mode="contained" labelStyle={{ color: COLORS.white }} onPress={() => bottomSheetRef.current.snapTo(1)} style={[stylesLocal.button]} color={COLORS.sans}>Batal</Button>
            </View>
        </View>
    );

    // End

    return (
            <>
                <KeyboardAvoidingView style={{ backgroundColor: COLORS.white, flex: 1 }}>
                    <Animated.View style={{
                        opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
                    }}>
                        <ScrollView>
                            <StatusBar backgroundColor={COLORS.sans} />
                            <Spinner
                                visible={false}
                                textContent={'Mohon Tunggu ...'}
                                textStyle={{ color: COLORS.white }}
                            />
                            <View style={stylesLocal.searchView}>
                                <Text style={stylesLocal.address}>Profile</Text>
                                {/* LOGO */}
                                <LogoRounded style={stylesLocal.logo} width={30} height={40} />
                            </View>
                            <TouchableOpacity>
                                <View style={stylesLocal.avatar}>
                                    {/* uri di ambil dari be */}
                                    <Avatar.Image size={200} source={{ uri: profileImages }} />
                                </View>
                            </TouchableOpacity>
                            {/* View Detail User */}
                            {
                                detailUser.map((x, i) => (
                                    <View key={i}>
                                        <TouchableOpacity>
                                            <View style={stylesLocal.detailUsers}>
                                                <Text style={stylesLocal.textTitle}>{x.title}</Text>
                                                <Text style={stylesLocal.textDesc}>{x.content}</Text>
                                            </View>
                                            <View style={stylesLocal.line}></View>
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                            {/* View Button */}
                            <View style={stylesLocal.buttonGroup}>
                                <Button mode="outlined" labelStyle={{ color: COLORS.primaryOpacity, width: width - 50}} onPress={(e) => onPressDaftarToko()} style={stylesLocal.button} color={isSeller === 0 ? COLORS.blue : COLORS.sans}>{isSeller === 0 || isSupplier || isSeller === -2 ? "Login Seller" : "Daftar Toko"}</Button>
                            </View>
                            {/* View Setting ON/OFF */}
                            <View>
                                <View style={stylesLocal.detailUsers}>
                                    <Text style={stylesLocal.textTitle}>Notifikasi</Text>
                                    <View style={stylesLocal.switch}>
                                        <Text style={stylesLocal.textDesc}>Izinkan Aplikasi memberikan Notifikasi</Text>
                                        <Switch value={notificationSwitch} onValueChange={onSwitchNotification} color={COLORS.sans} />
                                    </View>
                                </View>
                                <View style={stylesLocal.line}></View>
                            </View>
                            {/* skip */}
                            {/* View Tetang */}
                            <View>
                                <TouchableOpacity onPress={onAddress}>
                                    <View style={stylesLocal.detailUsers}>
                                        <View style={stylesLocal.switch}>
                                            <Text style={[stylesLocal.textInfo, { color: COLORS.blue, fontWeight: 'bold'}]}>Ganti Alamat Lengkap</Text>
                                            <IconButton style={stylesLocal.infoIcon} icon="circle-edit-outline" size={25} />
                                        </View>
                                    </View>
                                    <View style={stylesLocal.line}></View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={(e) => bottomSheetRef.current.snapTo(0)}>
                                    <View style={stylesLocal.detailUsers}>
                                        <View style={stylesLocal.switch}>
                                            <Text style={[stylesLocal.textInfo, { color: COLORS.red, fontWeight: 'bold'}]}>Keluar Akun</Text>
                                            <IconButton style={stylesLocal.infoIcon} icon="logout" size={25} />
                                        </View>
                                    </View>
                                    <View style={stylesLocal.line}></View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={stylesLocal.detailUsers}>
                                        <View style={stylesLocal.switch}>
                                            <Text style={stylesLocal.textInfo}>Tentang Keeponic</Text>
                                            <IconButton style={stylesLocal.infoIcon} icon="information-outline" size={25} />
                                        </View>
                                    </View>
                                    <View style={stylesLocal.line}></View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => onQuis("https://development.d3rwng03cwc4kn.amplifyapp.com/edu")}>
                                    <View style={{ marginLeft: 10 }}>
                                        <View style={stylesLocal.switch}>
                                            <Text style={stylesLocal.textInfo}>Bantuan</Text>
                                            <IconButton style={stylesLocal.infoIcon} icon="account-question" size={25} />
                                        </View>
                                    </View>
                                    <View style={stylesLocal.line}></View>
                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <View style={{ marginLeft: 10 }}>
                                        <View style={stylesLocal.switch}>
                                            <Text style={stylesLocal.textInfo}>Versi Aplikasi <Text style={{ fontWeight: 'bold', color: COLORS.primaryColor}}> v0.0.4 </Text></Text>
                                            <IconButton style={stylesLocal.infoIcon} icon="android" size={25} />
                                        </View>
                                    </View>
                                    <View style={stylesLocal.line}></View>
                                </TouchableOpacity>

                            <TouchableOpacity onPress={() => onQuis("https://docs.google.com/forms/d/e/1FAIpQLSeOv3SV3SHazGIYvzwlTXqn0BTL1789bXJ_pMLn7VTcZU5k8Q/viewform?usp=sf_link")}>
                                <View style={{ marginLeft: 10 }}>
                                    <View style={stylesLocal.switch}>
                                        <Text style={[stylesLocal.textInfo, { color: COLORS.red, fontWeight: 'bold'}]}>Isi Kuisioner Disini </Text>
                                        <IconButton style={stylesLocal.infoIcon} icon="calendar-question" size={25} />
                                    </View>
                                </View>
                                <View style={stylesLocal.line}></View>
                            </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </KeyboardAvoidingView>
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={[190, 0]}
                    renderHeader={renderHeader}
                    renderContent={renderAlertLogout}
                    initialSnap={1}
                    callbackNode={fall}
                    enabledGestureInteraction={true}
                />
            </>
    );
}

// const { width, height } = Dimensions.get('window')

const stylesLocal = StyleSheet.create({
    searchView: {
        backgroundColor: COLORS.sans,
        height: 50
    },
    address: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.white,
        left: 10,
        top: 20
    },
    buttonDown: {
        color: COLORS.white,
        width: 20,
        left: 120,
        top: 17
    },
    logo: {
        alignSelf: 'flex-end',
        marginRight: 10,
        bottom: 20,
    },
    avatar: {
        alignSelf: "center",
        marginTop: 20
    },
    detailUsers: {
        marginLeft: 10,
        marginTop: 10
    },
    textTitle: {
        fontWeight: "bold"
    },
    textDesc: {
    },
    line: {
        width: width,
        height: 1,
        backgroundColor: COLORS.colorC4,
        alignSelf: "flex-start",
        marginTop: 5,
        marginHorizontal: 10
    },
    buttonGroup: {
        margin: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 15,
        // width: 200,
        color: COLORS.white,
    },
    switch: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInfo: {
        paddingTop: 15
    },
    bottomSheet: {
        backgroundColor: COLORS.white
    },
    panel: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 20,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#317A4A',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonLogout: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        marginVertical: 7,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
})
