import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { IconButton } from "react-native-paper"
import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux"
import { KpnButton } from "../../../components";


export default function MarketInfo({ cart }) {

    const onPressBuy = (e) => {
        console.log("BUY", e)
    }

    return (
        <View style={styles.container}>
            <KpnButton
                text="Beli Sekarang"
                // mode="outlined"
                icon="package-down"
                style={styles.button}
                onPress={ (e) => onPressBuy(e) }
            />
            {/* <KpnButton
                text={"Keranjang" + " " + cart}
                mode="outlined"
                icon="cart-plus"
                style={[styles.button, { backgroundColor: COLORS.red }]}
            /> */}
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
        // backgroundColor: COLORS.white,
        height: 50,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        zIndex: 100
    },
    button: {
        height: 35, 
        width: Dimensions.get('screen').width - 20,
        marginHorizontal: 10,
        justifyContent: "center", 
        alignSelf: "center",
        elevation: 4,
        zIndex: 100
        // alignSelf: "center",
    }
})