import React, { useEffect, useState } from "react";
import { View, ScrollView, Image, StatusBar, Text, StyleSheet, Dimensions } from "react-native";
import {

} from "react-native-paper"
import SplashScreen from "react-native-splash-screen";
import {
    GoogleSigninButton,
    statusCodes,
    GoogleSignin
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from 'react-redux';

import * as loginAction from "../../login/actions";
import { COLORS } from "../../../utils/colors";
import { KpnButton } from "../../../components"
import Welcome3 from "../../../assets/images/svg/Welcome3";
import Logo from "../../../assets/images/svg/Logo"

export default function UserNotLoggedIn({ }) {
    const [signingProcess, setSigningProcess] = useState(false)
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onPressRegisterSeller = async () => {
        const param = {
            isNewUser: true
        }
        await navigation.navigate("Register", param)
    }

    const onPressExploration = async () => {
        await dispatch(loginAction.setExplore())
        await dispatch(loginAction.setUserAlreadyExplored(true))
    }

    const onGoogleLogin = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(userInfo)
            if (userInfo.user) {
                dispatch(loginAction.loginGoogleAuth(userInfo.idToken))
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log("Canceled login")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log("In Progress")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("Outdated")
            } else {
                // some other error happened
                console.log(error)
            }
        }
    }

    useEffect(() => {
        SplashScreen.hide()
        GoogleSignin.configure({
            webClientId: '871007962536-lboqlstf7fm24d6ovlmqopjsc3up0sql.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, [null])

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <View style={styles.slide3}>
                <View style={[styles.logos, { marginBottom: 20 }]}>
                    <Logo />
                </View>
                <Welcome3 style={{ marginTop: 170 }} />
                <Text style={styles.text}>Login Sekarang!</Text>
                <Text style={styles.innerText}>
                    Kami akan berikan rekomendasi terbaik untuk anda
                </Text>
                <KpnButton
                    text={"Lihat Beranda"}
                    isRounded
                    color={COLORS.primaryColor}
                    style={styles.button}
                    onPress={() => onPressExploration()}
                >
                </KpnButton>
                {/* <KpnButton
                        text={"Login Keeponic Seller"}
                        isRounded
                        style={styles.button}
                        onPress={() => onPressLoginButton()}
                    /> */}
                <KpnButton
                    text={"Daftar Seller"}
                    isRounded
                    style={styles.button}
                    color={COLORS.blue}
                    onPress={() => onPressRegisterSeller()}
                />
                <View style={styles.loginGoogle}>
                    <View style={styles.line}></View>
                    <Text style={[styles.innerText, { color: COLORS.fontColor }]}>Atau Login Dengan</Text>
                    <View style={styles.line} ></View>
                </View>
                <GoogleSigninButton
                    style={{ width: '74%', alignSelf: 'center', marginTop: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={onGoogleLogin}
                    disabled={signingProcess} />
            </View>
        </ScrollView>
    )
}

var styles = StyleSheet.create({
    wrapper: {
        color: COLORS.primaryColor,
        backgroundColor: COLORS.primaryColor
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    text: {
        color: COLORS.primaryColor,
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold'
    },
    innerText: {
        color: COLORS.primaryColor,
        marginTop: 10,
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    button: {
        width: Dimensions.get("screen").width - 100,
        marginTop: 10,
    },
    logos: {
        alignSelf: "flex-start",
        top: 15,
        left: 10,
        position: "absolute"
    },
    line: {
        height: 2,
        backgroundColor: COLORS.colorC4,
        marginTop: 10,
        width: Dimensions.get("screen").width * 0.29,
        justifyContent: "center",
        alignSelf: "center",
        marginHorizontal: 10
    },
    loginGoogle: {
        flexDirection: "row"
    }
});