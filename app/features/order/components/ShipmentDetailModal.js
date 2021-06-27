import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Card,
    Text,
    IconButton,
    Button
} from 'react-native-paper';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { useSelector, useDispatch } from "react-redux";
import * as orderActions from '../actions';

import { COLORS } from '../../../utils/colors';
import { IHome } from "../../interfaces";
import { height, width } from '../../../utils/theme';
import { IOrderState } from "../../interfaces";
import PaymentInfo from './PaymentInfo';

const Loading = props => <LottieView {...props} source={require("../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />

const ModalView = ({ 
    invoice, 
    shipmentCode, 
    courier, 
    totalPrice,
    buyerName,
    marketName,
    category
}) => {
    const dispatch = useDispatch();
    const shipmentArray = [
        {
            name : 'Nomor Tagihan',
            value : invoice ? invoice : "-------"
        },
        {
            name: 'Kode Resi',
            value: shipmentCode || 'Barang belum dikirim'
        },
        {
            name: 'Kurir',
            value: courier || 'JNE'
        },
        {
            name: 'Total Harga',
            value: totalPrice || '--------'
        },
        {
            name: 'Penerima Barang',
            value: buyerName || '--------'
        },
        {
            name: 'Nama Toko',
            value: marketName || '--------'
        },
        {
            name: 'Kategori Produk',
            value: category || '--------'
        },
    ]

    const onPressCopy = () => {

    }

    const scrollRef = useRef();
    return (
        <ScrollView
            ref={(ref) => (scrollRef.current = ref)}
            style={styles.modalView}
            automaticallyAdjustContentInsets={true}
            contentContainerStyle={{
                
            }}
            onScroll={(e) => {
                console.log(e.nativeEvent.contentOffset.y, "scroll")
            }}
        >
            <View>
                <View style={styles.row}>
                    <IconButton
                        icon="credit-card"
                        size={20}
                        color={COLORS.primaryColor}
                    />
                    <Text style={[styles.textBold, { fontSize: 20 }]}>Detail Pembayaran</Text>
                </View>
                <View style={styles.rating}>
                    <PaymentInfo invoiceId={invoice} key="1" />
                </View>
                <View style={styles.row}>
                    <IconButton
                        icon="package"
                        size={20}
                        color={COLORS.primaryColor}
                    />
                    <Text style={[styles.textBold, { fontSize: 20 }]}>Detail Pesanan</Text>
                </View>
                <View style={styles.rating}>
                    {
                        shipmentArray.map((x, i) => (
                            <View key={i}>
                            <Text style={styles.productName}>{x.name}</Text>
                            <Text style={styles.productCommon}>{x.value}</Text>
                            </View>
                        ))
                    }
                </View>
                <TrackerView
                    shipmentCode={shipmentCode}
                />
            </View>
        </ScrollView>
    )
}

const RenderSkeleton = () => (
    <View style={{ flexDirection: "column-reverse" }}>
        <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
                width: 90,
                height: 20,
                borderRadius: 16,
                marginVertical: 5,
                marginLeft: 10
            }}
        />
        <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
                width: 90,
                height: 20,
                borderRadius: 16,
                marginVertical: 5,
                marginLeft: 10
            }}
        />
    </View>
)

const RenderBelumDikirim = () => (
    <View>
        <Text style={styles.addressName}>Barang Belum Dikirim</Text>
    </View>
)

const TrackerView = ({ shipmentCode }) => {
    const dispatch = useDispatch();
    const orderState:IOrderState = useSelector(state => state.orderReducer)
    const scrollRef = useRef();
    const loadingModal = orderState.loadingModal
    const historyTracker = orderState.trackingData.history[0]

    useEffect(() => {
        const fetchTracker = async () => {
            await dispatch(orderActions.getTracking(shipmentCode))
        }
        fetchTracker();
        // return () => {
        //     cleanup
        // };
    }, [null]);

    return (
        <View
        >
                <View style={styles.row}>
                    <IconButton
                        icon="truck-fast"
                        size={20}
                        color={COLORS.primaryColor}
                    />
                    <Text style={[styles.textBold, { fontSize: 20 }]}>Trek Pengiriman</Text>
                </View>
            <View style={styles.modalView}>
                <View style={styles.rating}>
                    {
                        loadingModal ? <RenderSkeleton /> : 
                            historyTracker ? historyTracker.map((x, i) => (
                                <View key={i}>
                                    <View style={styles.row}>
                                        <View style={styles.dot} />
                                        <Text style={styles.addressName}>{x.date}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.div} />
                                        <Text style={[styles.productCommonAddress]}>{x.desc}</Text>
                                    </View>
                                </View>
                            )) : <RenderBelumDikirim />
                    }
                </View>
            </View>
        </View>
    )
}

const ModalHeader = ({ onPress }) => {
    return (
        <Card.Title
            titleStyle={{ fontSize: 14 }}
            title={"Informasi Pesanan"}
            left={
                (props) =>
                    <IconButton
                        {...props}
                        size={20}
                        icon="keyboard-backspace"
                        color={COLORS.sans}
                        style={{ backgroundColor: COLORS.white }}
                        onPress={onPress}
                    />
            }
        />
    )
}

const ModalContent = ({ 
    onBackPressed, 
    productName, 
    marketName, 
    productImage, 
    invoice,
    shipmentCode,
    courier,
    totalPrice,
    buyerName,
    category
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <ModalHeader onPress={onBackPressed} />
            <ModalView
                productName={productName}
                productImage={productImage}
                invoice={invoice}
                shipmentCode={shipmentCode}
                courier={courier}
                totalPrice={totalPrice}
                buyerName={buyerName}
                marketName={marketName}
                category={category}
            />
        </View>
    )
}

const ShipmentDetailModal = ({
    visible,
    onBackDropPressed,
    martketName,
    productName,
    productImage,
    invoice,
    shipmentCode,
    courier,
    totalPrice,
    buyerName,
    marketName,
    category
}) => {
    return (
            <Modal
                isVisible={visible}
                onBackdropPress={onBackDropPressed}
                deviceWidth={width}
                deviceHeight={height}
                animationIn="fadeIn"
                animationInTiming={1000}
                animationOut="fadeOut"
                animationOutTiming={10}
            >
                <ModalContent
                    onBackPressed={onBackDropPressed}
                    marketName={martketName}
                    productName={productName}
                    productImage={productImage}
                    invoice={invoice}
                    shipmentCode={shipmentCode}
                    courier={courier}
                    totalPrice={totalPrice}
                    buyerName={buyerName}
                    marketName={marketName}
                    category={category}
                />
            </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height - 300,
        marginHorizontal: 20,
        backgroundColor: COLORS.white
    },
    modalView: {
        marginHorizontal: 10
    },
    addressCard: {
        marginVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primaryColor,
        backgroundColor: COLORS.greenSans,
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 12,
        color: COLORS.primaryColor,
        textAlign: "center"
    },
    textNormal: {
        fontSize: 12,
        color: COLORS.primaryColor
    },
    containerAddressCard: {
        margin: 10
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    switch: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    anim: {
        height: 200,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textInput: {
        height: 40,
        fontSize: 12
    },
    errorMsg: {
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: COLORS.redOpacity,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: COLORS.red
    },
    rating: {

    },
    card: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    productName: {
        marginLeft: 10,
        color: COLORS.blackSans,
        marginTop: 10,
        fontSize: 15,
        fontWeight: "bold",
    },
    marketName: {
        marginLeft: 10,
        color: COLORS.colorC4,
        fontWeight: 'bold'
    },
    productCommon: {
        marginLeft: 10,
        color: COLORS.fontColor,
        fontSize: 12,
        fontWeight: "100",
    },
    productCommonAddress: {
        marginLeft: 22,
        color: COLORS.fontColor,
        fontSize: 12,
        fontWeight: "100",
    },
    dot: {
        height: 10,
        width: 10,
        backgroundColor: COLORS.primaryColor,
        borderRadius: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "nowrap",
        alignItems: "center",
        marginVertical: 5
    },
    addressName: {
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 12,
        marginLeft: 10,
        alignSelf: "center",
    },
    div: {
        height: 20,
        width: 1,
        backgroundColor: COLORS.fontColor,
        alignSelf: "center",
        marginLeft: 3
    }
})

ShipmentDetailModal.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func
};


export default ShipmentDetailModal;
