import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IconButton, Button } from "react-native-paper";

import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';
import { KpnButton } from '../../../components';

const OrderList = ({ 
    title, 
    category, 
    address, 
    marketName, 
    price, 
    qty, 
    isFavorite, 
    avatar,
    onCheck,
    onPressBuy,
    onIncrease,
    onDecrease,
    onPressDelete,
    onPressProduct
}) => {

    return (
        <View style={styles.containerView}>
            <View style={{ flexDirection: "row" }}>
                <BouncyCheckbox
                    size={20}
                    fillColor={COLORS.primaryColor}
                    unfillColor="#FFFFFF"
                    text="Masukan Ke Favorit"
                    isChecked={ isFavorite || false }
                    style={styles.checkbox}
                    iconStyle={{ borderColor: COLORS.primaryColor, height: 20, width: 20 }}
                    useNativeDriver
                    textStyle={{ fontSize: 15 }}
                    onPress={onCheck}
                />
            </View>
                <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                    <View>
                    <Image style={styles.image} source={{ uri: avatar || "https://semantic-ui.com/images/wireframe/image.png" }} />
                    </View>
                    <View style={styles.price}>
                        <TouchableOpacity onPress={onPressProduct}>
                            <Text style={styles.titleText}>{title || "-----------------" }</Text>
                        </TouchableOpacity>
                        <Text style={styles.category}>{ category || "--------------" }</Text>
                        <Text style={styles.category}>Dikirim ke <Text style={{ fontWeight: "bold" }}>{ address || "------" }</Text> Via <Text style={{ fontWeight: "bold" }}>JNE</Text></Text>
                        <Text style={styles.category}>{ marketName || "---------------------" }</Text>
                        <View style={styles.line}></View>
                    </View>
                <View style={styles.count}>
                    <IconButton
                        icon="minus-circle-outline"
                        color={COLORS.primaryColor}
                        onPress={onDecrease}
                    />

                    <TextInput
                        style={{
                            height: 30,
                            fontSize: 14,
                            padding: 5,
                            paddingLeft: 15,
                            borderColor: 'gray',
                            borderBottomWidth: 1
                        }}
                        defaultValue={qty || "0"}
                    />
                    <IconButton
                        icon="plus-circle-outline"
                        color={COLORS.primaryColor}
                        onPress={onIncrease}
                    />
                </View>
                </View>
            <Text style={styles.priceText}>{price || "Rp 000.000"}</Text>
                <View style={{ flexDirection: "row", justifyContent: "flex-start"}}>
                    <Button
                        color={COLORS.primaryColor}
                        icon="check-circle-outline"
                        mode="outlined"
                        style={styles.buttonHapus}
                        onPress={onPressBuy}
                    > Bayar </Button>
                    <Button
                        color={COLORS.red}
                        icon="delete-outline"
                        mode="outlined"
                        style={styles.buttonHapus}
                        onPress={onPressDelete}
                    > Hapus </Button>
                </View>
                <View style={styles.lineLarge}></View>
        </View>
    );
}


const containerHeight = 160
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
    image: {
        height: imageHeight,
        width: imageWidth,
        alignSelf: "center",
        bottom: 0,
        top: 3,
        left: 3,
        borderRadius: 16,
        // position: "absolute"
    },
    price:{
        marginLeft: 20,
        maxWidth: 230,
        marginTop: 10,
        flexDirection: "column"
    },
    titleText: {
        // fontWeight: "bold",
        fontSize: 15,
        color: COLORS.blackSans
    },
    category: {
        fontSize: 10,
        marginTop: 3,
        color: COLORS.fontColor,
    },
    priceText: {
        fontSize: 20,
        color: COLORS.red,
        right: 0,
        position: "absolute",
        marginTop: 10,
        marginRight: 10,
        fontWeight: "bold",
        alignSelf: "center",
        textDecorationLine: "underline"
    },
    checkbox: {
        marginLeft: 10,
        marginTop: 10
    },
    count: { 
        flexDirection: "row",
        position: "absolute",
        left: 0,
        bottom: 0,
        alignSelf: "flex-end",
        justifyContent: "flex-start"
    },
    line: {
        height: 1,
        width: containerWidth - 200,
        marginTop: 5,
        backgroundColor: COLORS.colorC4
    },
    button: {
        marginLeft: 10,
        marginTop: 10,
        height: 35,
        width: 90,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    buttonHapus: {
        marginLeft: 10,
        marginTop: 10,
        height: 35,
        // width: 110,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    lineLarge: {
        height: 20,
        width: width,
        marginTop: 15,
        backgroundColor: COLORS.colorF4
    }
})

export default OrderList;
