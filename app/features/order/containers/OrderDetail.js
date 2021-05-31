import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';

import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';
import AddressOrderDetail from '../components/orderDetail/AdressOrderDetail';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";

export default function OrderDetail(props){
    const [isBuyed, setIsBuyed] = useState(false)

    const onPressBuy = () => {
        const {
            productName,
            marketName,
            category,
            productId,
            marketId,
            userId,
            price,
            quantity,
            ownerCityId,
            ownerSubdistrictId,
            ownerCityName,
            ownerSubdistrictName,
        } = props.route.params
        const jsonObjects = {
            items: [
                {
                    id: productId,
                    price: price,
                    quantity: quantity,
                    name: productName
                },
                {
                    id: 100,
                    price: 9000,
                    quantity: 1,
                    name: "Ongkos Kirim (JNE)"
                }
            ]
        }
        const jsonString = JSON.stringify(jsonObjects)
        console.log(jsonString, "JSON STRING")
        console.log(ownerCityId)
        console.log(ownerCityName)
        console.log(ownerSubdistrictId)
        console.log(ownerSubdistrictName)
        setIsBuyed(!isBuyed)
    }

    return (
        <View style={styles.containerView}>
            <AddressOrderDetail 
                orderDetailData={props.route.params}
                onPressBuy={(e) => onPressBuy(e)}
            />
        </View>
        // <WebView
        //     source={{ uri: "https://development.d3rwng03cwc4kn.amplifyapp.com/login" }}
        // />
    );
}


const containerHeight = height
const imageHeight = 100
const containerWidth = width
const imageWidth = containerWidth - 250
const styles = StyleSheet.create({
    containerView: {
        width: containerWidth,
        height: containerHeight,
        backgroundColor: COLORS.white,
    },
    svgComponent: {
        alignSelf: 'center',
    },
    baseText: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 15,
        fontWeight: "bold",
        fontSize: 17,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    button: {
        zIndex: 100,
        alignSelf: "flex-start",
        justifyContent: "center",
    }
})
