import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper"
import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux"
import { KpnButton } from "../../../components";


export default function MarketInfo({ cart }) {
    return (
        <View style={styles.container}>
            <KpnButton
                text="Beli Sekarang"
                // mode="outlined"
                icon="package-down"
                style={styles.button}
            />
            <KpnButton
                text={"Keranjang" + " " + cart}
                mode="outlined"
                icon="cart-plus"
                style={styles.button}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        // opacity: 0.5,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    button: {
        height: 35, 
        marginHorizontal: 10,
        marginBottom: 10,
        // alignSelf: "center",
    }
})