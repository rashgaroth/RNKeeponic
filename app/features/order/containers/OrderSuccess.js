import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import { height, width } from '../../../utils/theme';
import { COLORS } from '../../../utils/colors';
import ProductList from "../../home/components/ProductList";
import Header from "../../home/components/Header";
import PaymentInfo from "../components/PaymentInfo";

const OrderSuccess = (props) => {
    const navigation = useNavigation();
    const { params } = props.route;

    const onPressHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    return (
        <>
        <ScrollView style={styles.container}>
            <LottieView source={ require('../../../assets/anim/order_success.json') } autoPlay style={styles.anim} />
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Order Sukses, saat nya melakukan pembayaran</Text>
            </View>
            <View style={styles.card}>
                <View>
                    <Card.Cover source={{ uri: params.avatar ? params.avatar : 'https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg' }} style={{ width: 100, height: 100, borderRadius: 16 }} />
                </View>
                <View>
                    <Text style={styles.productName}>{params.productName ? params.productName : '--------'}</Text>
                    <Text style={styles.marketName}>{params.marketName ? params.marketName : '---------'}</Text>
                </View>
            </View>
            <PaymentInfo invoiceId={params.invoiceId} />
            {/* PaymentInfo */}
            <Text style={styles.textInfo}>Data pembayaran akan tersimpan secara otomatis pada menu pemesanan</Text>
            <View style={styles.button}>
                <Button style={styles.button} onPress={() => onPressHome()} color={COLORS.primaryColor} mode="outlined">Kembali keberanda</Button>
            </View>
            <View style={styles.productList}>
                <Header onPress={() => onPressHome()} name="Produk Lainnya" icon="fire" color={COLORS.red} />
                <Text style={styles.textLebihHemat}>Produk serupa lainnya yang mungkin kamu cari</Text>
                <ProductList />
            </View>
        </ScrollView>
            {/* <BottomSheetProduct /> */}
        </>
    );
};


OrderSuccess.propTypes = {

};

const styles = StyleSheet.create({
    anim: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
    container: {
        height: height,
        width: width,
        backgroundColor: COLORS.white
    },
    textContainer: {
        alignSelf: 'center'
    },
    textTitle: {
        fontSize: 17,
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    textContent: {
        fontSize: 20,
        fontWeight: '200',
        alignSelf: 'center',
        textAlign: 'center'
    },
    textBase: {
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold'
    },
    button: { 
        width: 200,
        alignSelf: 'center', 
        marginTop: 20,
        borderRadius: 10
    },
    orderData: {
        marginVertical: 10,
        alignSelf: 'center'
    },
    textCommon: {
        fontSize: 13,
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginTop: 5,
        textAlign: 'left',
        color: COLORS.primaryColor
    },
    orderDetail: {
        // height: 200,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.primaryColor,
        marginVertical: 10,
        backgroundColor: COLORS.greenSans,
        paddingVertical: 10,
    },
    textInfo: {
        marginHorizontal: 20,
        color: COLORS.red,
        fontWeight: 'bold',
        fontSize: 12
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    card: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 20,
        maxWidth: 300,
        justifyContent: 'flex-start'
    },
    productName: {
        marginLeft: 10,
        color: COLORS.blackSans,
        fontSize: 15,
        fontWeight: 'bold'
    },
    marketName: {
        marginLeft: 10,
        color: COLORS.colorC4,
        // fontWeight: 'bold'
    },
    productList: {
        marginVertical: 10,
    },
    textLebihHemat: {
        fontSize: 13,
        color: COLORS.fontColor,
        left: 10
    },
})

export default OrderSuccess;
