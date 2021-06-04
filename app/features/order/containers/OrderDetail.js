import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput, ScrollView, Alert } from "react-native";
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';

import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';
import AddressOrderDetail from '../components/orderDetail/AdressOrderDetail';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";
import { KpnLoading } from "../../../components";
import { IHome } from "../../interfaces";
import * as orderActions from "../actions";
import { truncate } from '../../../utils/stringUtils';

export default function OrderDetail(props){
    return (
        <View style={styles.containerView}>
            <AddressOrderDetail 
                orderDetailData={props.route.params}
            />
        </View>
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
