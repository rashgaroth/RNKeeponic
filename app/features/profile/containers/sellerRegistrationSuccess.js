import React, { useEffect, useRef, useCallback, useState, Alert } from "react";
import { View, StyleSheet, ScrollView, Text, Linking } from "react-native";
import LottieView from 'lottie-react-native';
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

import { height, width } from "../../../utils/theme";
import { COLORS } from "../../../utils/colors";
import { KpnButton } from "../../../components"
import * as homeActions from "../../home/actions";

export default function SellerRegistrationSuccess(props) {
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState("https://development.d3rwng03cwc4kn.amplifyapp.com/login")

    // redux
    const selector = useSelector(state => state.homeReducer)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const onPressHome = () => {
        setLoading(true)
        // setLoading(false)

        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });

        setLoading(false)
    }

    const onPressWebsites = useCallback(async () => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Tidak Bisa Membuka Website: ${url}`);
        }
    }, [url]);

    useEffect(() => {
        dispatch(homeActions.setSeller())

        setTimeout(() => {
            console.log(selector.isSeller)
        }, 5000)
    }, [null]);

    return (
        <ScrollView>
            <Spinner
                visible={loading}
                textContent={''}
                textStyle={{ color: COLORS.white }}
            />
            <View style={{ height: height, width: width }}>
                <LottieView source={require("../../../assets/anim/success.json")} autoPlay loop style={styles.anim} />
                <View>
                    <Text style={styles.content_success}> Pendaftaran Seller Sukses! </Text>
                    <Text style={styles.content_description} >
                        Kamu dapat menunggu beberapa waktu agar kamu dapat melakukan Login pada website
                        <Text style={{ color: COLORS.blue }}> Keeponic Seller</Text> kamu dapat melakukan login pada website <Text style={{ color: COLORS.blue }}> Keeponic Seller </Text>
                        setelah akunmu lolos pada pengecekan data yang dilakukan oleh tim <Text style={{ color: COLORS.primaryColor }}>Keeponic</Text>
                    </Text>
                </View>
                <View style={styles.open_website}>
                    <KpnButton 
                        text="Kembali Keberanda"
                        onPress={ () => onPressHome() }
                    />
                    <KpnButton
                        text="Buka Website Keeponic"
                        mode="outlined"
                        labelStyle={ COLORS.primaryColor }
                        style={{ marginTop: 10 }}
                        onPress={ () => onPressWebsites()}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    anim: {
        // position: 'absolute', 
        // top: 0, 
        // right: 0, 
        // left: 0, 
        height: height - (width + 100), 
        width: width,
        // backgroundColor: 'red',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    content_success: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.blackSans
    },
    content_description: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        textAlign: 'center',
        color: COLORS.fontColor,
        marginHorizontal: 10,
        fontSize: 17,
    },
    open_website: {
        marginHorizontal: 10,
        marginVertical: 10,
    }
})