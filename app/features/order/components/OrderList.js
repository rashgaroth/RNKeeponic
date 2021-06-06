import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IconButton, Button } from "react-native-paper";

import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';
import { KpnButton } from '../../../components';
import ShipmentDetailModal from './ShipmentDetailModal'

const OrderList = ({ 
    title, 
    category, 
    address, 
    marketName, 
    price, 
    isFavorite, 
    avatar,
    onCheck,
    onPressBuy,
    onPressDelete,
    onPressProduct,
    status,
    orderedStatus,
    isOrdered,
    // modal
    invoice,
    shipmentCode
}) => {

    const [color, setColor] = useState(COLORS.red)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() =>{
        if(status === 'Di Keranjang'){
            setColor(COLORS.orange)
        }else if(status === 'Menunggu Konfirmasi') {
            setColor(COLORS.blue)
        }else{
            setColor(COLORS.success)
        }
    }, [null])

    if(isOrdered){
        return (
            <>
            <View style={!isOrdered ? styles.containerView : [styles.containerView, { height: 230 }]}>
                <View style={[styles.container, { backgroundColor: COLORS.white }]}>
                    <View>
                        <Image style={styles.image} source={{ uri: avatar || "https://semantic-ui.com/images/wireframe/image.png" }} />
                    </View>
                    <View style={styles.price}>
                        <TouchableOpacity onPress={onPressProduct}>
                            <Text style={styles.titleText}>{title || "-----------------"}</Text>
                        </TouchableOpacity>
                        <Text style={styles.category}>{category || "--------------"}</Text>
                        <Text style={styles.category}>{marketName || "---------------------"}</Text>
                        {/* <IconButton
                            icon="checkbox-multiple-marked-circle"
                            color={COLORS.blackSans}
                            size={15}
                        /> */}
                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Status Pesanan : {' '} 
                        <Text style={{ 
                            fontWeight: "bold", 
                            color: orderedStatus === 0 ? COLORS.red :
                            orderedStatus === 1 ? COLORS.blue :
                            orderedStatus === 2 ? COLORS.primaryColor :
                            "black", 
                            textDecorationLine: 'underline',
                        }}> 
                        {
                            orderedStatus === 0 ? "Menunggu Pembayaran" :
                            orderedStatus === 1 ? "Menunggu Konfirmasi Seller" :
                            orderedStatus === 2 ? "Barang Dikirim" :
                            "--------"
                        }
                        </Text></Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.count}>
                        <Text style={styles.priceTextOrdered}>{price || "Rp 000.000"}</Text>
                    </View>
                </View>
                <Button 
                mode="outlined" 
                icon="package-variant-closed" 
                color={COLORS.blue} 
                style={{ 
                    width: 200, 
                    height: 30,
                    fontSize: 15,
                    marginLeft: 10,
                    justifyContent: "center",
                }} 
                theme={{ 
                    fonts: {
                        thin: 15
                    },
                    mode: "adaptive",
                    animation: 20,
                    roundness: 10
                }}
                onPress={ () => setModalVisible(true) }
                > 
                Detail Pesanan
                </Button>
            </View>
            <ShipmentDetailModal visible={modalVisible} onBackDropPressed={() => setModalVisible(false)} />
            </>
        );
    }else{
        return (
            <View style={!isOrdered ? styles.containerView : [styles.containerView, { height: 230 }]}>
                <View style={{ flexDirection: "row" }}>
                    <BouncyCheckbox
                        size={20}
                        fillColor={COLORS.primaryColor}
                        unfillColor="#FFFFFF"
                        text="Masukan Ke Favorit"
                        isChecked={isFavorite || false}
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
                            <Text style={styles.titleText}>{title || "-----------------"}</Text>
                        </TouchableOpacity>
                        <Text style={styles.category}>{category || "--------------"}</Text>
                        <Text style={styles.category}>Dikirim ke <Text style={{ fontWeight: "bold" }}>{address || "------"}</Text> Via <Text style={{ fontWeight: "bold" }}>JNE</Text></Text>
                        <Text style={styles.category}>{marketName || "---------------------"}</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.count}>
                        <IconButton
                            icon="checkbox-multiple-marked-circle"
                            color={COLORS.blackSans}
                            size={15}
                        />
                        <Text style={{ fontWeight: "bold", marginTop: 5 }}>Status Pesanan : <Text style={{ fontWeight: "bold", color: color, textDecorationLine: 'underline' }}>{status || 'Di Keranjang'}</Text></Text>
                    </View>
                </View>
                <Text style={styles.priceText}>{price || "Rp 000.000"}</Text>
                {
                    !isOrdered ?
                        <>
                            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                <Button
                                    color={COLORS.primaryColor}
                                    icon="check-circle-outline"
                                    mode="outlined"
                                    style={styles.buttonHapus}
                                    onPress={onPressBuy}
                                    disabled={isOrdered ? true : false}
                                > Bayar </Button>
                                <Button
                                    color={COLORS.red}
                                    icon="delete-outline"
                                    mode="outlined"
                                    style={styles.buttonHapus}
                                    onPress={onPressDelete}
                                    disabled={isOrdered ? true : false}
                                > Hapus </Button>
                            </View>
                            <View style={styles.lineLarge}></View>
                        </>
                        : null
                }
            </View>
        );
    }
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
    priceTextOrdered: {
        fontSize: 20,
        color: COLORS.red,
        marginTop: 10,
        marginLeft: 10,
        fontWeight: "bold",
        alignSelf: "flex-start",
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
        bottom: 10,
        alignSelf: "flex-end",
        justifyContent: "center",
        // justifyContent: "flex-start"
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
