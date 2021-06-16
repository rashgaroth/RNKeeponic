import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from "react-native";
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";
import { useSelector } from 'react-redux';
import { COLORS } from '../../../utils/colors';

const PaymentInfo = ({ invoiceId }) => {
    const [state, setState] = useState({
        paymentId: "",
        paymentCode: "",
        method: "",
        total: "",
        status: ""
    })
    const loginState = useSelector(state => state.loginReducer)
    const token = loginState.user.token
    const ITEMS = [
        {
            title: "ID Pembayaran",
            value: state.paymentId ? state.paymentId : "-----"
        },
        {
            title: "Kode Pembayaran",
            value: state.paymentCode ? state.paymentCode : "-----"
        },
        {
            title: "Jenis Pembayaran",
            value: state.method ? state.method : "-----"
        },
        {
            title: "Total Pembayaran",
            value: state.total ? "Rp. " + state.total : "-----"
        },
        {
            title: "Status Pembayaran",
            value: state.status ? state.status : "-----"
        },
    ]

    useEffect(() => {
        const fetchPaymentInfo = async () => {
            // setIsLoading(true)
            try {
                const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PROFILE + '/order/info/' + invoiceId, HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    console.log('success info order')
                    const { data } = _result.data
                    if (data.hasOwnProperty('va_numbers')){
                        const va_numbers = data.va_numbers[0].va_number;
                        const method = "Transfer Bank" + ` (${data.va_numbers[0].bank})`;
                        const paymentId = data.order_id;
                        const grossAmount = data.gross_amount;
                        const status = data.transaction_status;
                        setState({
                            ...state,
                            paymentId: paymentId,
                            paymentCode: va_numbers,
                            method: method,
                            total: grossAmount,
                            status: status
                        });
                        console.log(va_numbers, "VA")
                        console.log(data, "DATA")
                        console.log("ada va")
                    }else{
                        const payment_code = data.payment_code;
                        const method = data.store;
                        const paymentId = data.order_id;
                        const grossAmount = data.gross_amount;
                        const status = data.transaction_status;
                        setState({
                            ...state,
                            paymentId: paymentId,
                            paymentCode: payment_code,
                            method: method,
                            total: grossAmount,
                            status: status
                        });
                        console.log("payment code")
                        console.log(data, "DATA")
                    }

                    console.log("success", data)
                } else {
                    // setIsLoading(false)
                    console.log(_result.data, "not success address")
                }
            } catch (error) {
                // setIsLoading(false)
                console.log(error)
            }
        }

        fetchPaymentInfo()

        return () => setState({
            ...state,
            paymentId: "",
            paymentCode: "",
            method: "",
            total: "",
            status: ""
        })
    }, [null])

    return (
        <View style={styles.orderDetail}>
            {
                ITEMS.map((x, i) => (
                    <View style={styles.row}>
                        <Text style={styles.textCommon}>{x.title}</Text>
                        <Text style={[styles.textCommon, { color: x.value.includes("pending") ? COLORS.red : x.value.includes("settlement") ? COLORS.primaryColor : COLORS.black, textAlign: 'right' }]}>
                            {x.value.includes("settlement") ? "Dibayar" : x.value}
                        </Text>
                    </View>
                ))
            }
        </View>
    );
};


PaymentInfo.propTypes = {
    invoiceId: PropTypes.string
};

const styles = StyleSheet.create({
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
        // marginHorizontal: 20,
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

export default PaymentInfo;
