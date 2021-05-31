import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IconButton, Button } from "react-native-paper";

import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';
import EmptyCart from '../../../assets/images/svg/EmptyCart';

const OnEmptyList = ({
    text,
    onRefresh,
    onExplore
}) => {

    return (
        <View style={styles.containerView}>
            <View style={styles.svgComponent}>
                <EmptyCart />
            </View>
            <View>
                <Text style={styles.baseText}> {text || "Anda Tidak Memiliki Pesanan"} </Text>
            </View>
            <View style={styles.row}>
                {/* <TouchableOpacity onPress={onExplore}>
                    <Button 
                    mode={'outlined'} 
                    color={COLORS.sans}
                    labelStyle={{ color: COLORS.sans }}
                    style={styles.button}
                    icon="compass"
                    >Beli Produk</Button>
                </TouchableOpacity> */}
                <IconButton
                    color={COLORS.orange}
                    labelStyle={{ color: COLORS.orange }}
                    style={styles.button}
                    icon="refresh"
                    size={20}
                />
                <Text style={[styles.baseText, { alignSelf: "center", color: COLORS.orange, marginTop: 0, fontSize: 12}]}>Scroll Layar Untuk Muat Ulang</Text>
            </View>
        </View>
    );
}


const containerHeight = 210
const imageHeight = 100
const containerWidth = width - 20
const imageWidth = containerWidth - 250
const styles = StyleSheet.create({
    containerView: {
        width: width - 20,
        height: containerHeight + 100,
        marginBottom: 20,
        backgroundColor: COLORS.white,
        borderRadius: 16,
        alignSelf: "center",
        marginTop: 10,
    },
    container: {
        // borderColor: COLORS.primaryColor,
        height: containerHeight,
        width: containerWidth,
        // borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        // backgroundColor: COLORS.white,
        flexDirection: "row"
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
    row:{
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
        // marginHorizontal: 10,
        alignSelf: "center"
    },
    button: {
        zIndex: 100,
        alignSelf: "flex-start",
        justifyContent: "center",
    }
})

export default OnEmptyList;
