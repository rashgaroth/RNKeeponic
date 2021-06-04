import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Button, Dialog, Portal } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';

import { COLORS } from '../../../utils/colors';
import { convertToIdr } from '../../../utils/stringUtils';
import OrderList from '../components/OrderList';
import OnEmptyList from '../components/OnEmptyList';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import * as orderActions from '../actions';
import { Alert } from 'react-native';
import { ICategory, IData, IMarket, IProductWishList, IWishList, IHome, IProductDetail } from "../../interfaces";
import { HeaderAuth } from "../../../services/header";
import { navigate } from '../../../navigation/NavigationService';
import * as productDetailActions from "../../productDetail/actions";
import { KpnLoading } from '../../../components'

export default function OrderCart(navigation) {
    const [loading, setLoading] = useState(false)
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('')
    const [errVisible, setErrVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const dispatch = useDispatch();

    const loginSelector = useSelector(state => state.loginReducer)
    const orderState = useSelector(state => state.orderReducer)
    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);

    const tokenUser = loginSelector.user.token
    const userId = loginSelector.user.user_id
    const orderData = orderState.wishListData.ordered

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    const onPressAction = () => {
        setErrVisible(false)
    }

    const onRefresh = async () => {
        await dispatch(orderActions.getWishlist())
    }

    const onPressItem = (id) => {
        const param = {
            productId: id
        }
        console.log(param)
        navigate("ProductDetail", param)
    }

    const onPressFav = async (id, e) => {
        setLoading(true)
        const param = {
            user_id: userId,
            wishlist_id: id,
            category: e ? "tambah" : "kurang",
            update_type: "favorite"
        }
        const condition = e ? "Gagal Saat Menambahkan Order Ke Favorit" : "Gagal Saat Menghapus Order"
        try {
            const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/update`, param, HeaderAuth(tokenUser))
            if (_onFavorite.status === 200) {
                console.log(_onFavorite.data)
                setValidatorErrorMsg("Tambah Ke Favorit Berhasil")
                setIsError(false)
                setErrVisible(true)
                setLoading(false)
            } else {
                console.log(_onFavorite.data)
                Alert.alert("Terjadi Kesalahan", condition)
                setValidatorErrorMsg(_onFavorite.data.msg)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order Ke Favorit" + error)
        }
    }


    return (
        <>
            <ScrollView style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={orderState.loading}
                        onRefresh={onRefresh}
                        style={{ paddingTop: 60 }}
                    />
                }
            >
                <View>
                    {isEmpty ? <OnEmptyList
                        onRefresh={() => onRefresh()}
                        text={'Kamu Belum Membeli Produk'}
                    /> : orderData.length > 0 ? orderData.map((x, i) => (
                        <OrderList
                            key={i}
                            address={x.address}
                            avatar={x.avatar}
                            category={x.category}
                            isFavorite={x.isFavorite === 1 ? true : false}
                            marketName={x.marketName}
                            price={convertToIdr(x.price)}
                            title={x.productTitle}
                            onCheck={(e) => onPressFav(x.id, e)}
                            onPressProduct={() => onPressItem(x.product_id)}
                            status="Menunggu Konfirmasi"
                            isOrdered
                        />
                    )) :
                        <OnEmptyList
                            onRefresh={() => onRefresh()}
                            text={'Kamu Belum Membeli Produk'}
                        />}
                </View>
            </ScrollView>
            <KpnLoading visible={loading} />
            <Snackbar
                visible={errVisible}
                onDismiss={onDismissSnackBar}
                style={{ backgroundColor: isError ? COLORS.red : COLORS.primaryOpacity, borderRadius: 16 }}
                theme={{
                    colors: {
                        primary: COLORS.white,
                        onBackground: COLORS.white,
                        accent: COLORS.white,
                    }
                }}
                action={{
                    label: `Oke`,
                    onPress: () => onPressAction(),
                }}>
                {validatorErrorMsg}
            </Snackbar>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.colorF4
    }
})
