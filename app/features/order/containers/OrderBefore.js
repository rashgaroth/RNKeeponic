import React, {useState, useEffect, useCallback} from 'react';
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
import { Alert } from 'react-native';
import { ICategory, IData, IMarket, IProductWishList, IWishList, IHome, IProductDetail } from "../../interfaces";
import { HeaderAuth } from "../../../services/header";
import { navigate } from '../../../navigation/NavigationService';
import * as productDetailActions from "../../productDetail/actions";

export default function OrderBefore(navigation) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('')
    const [errVisible, setErrVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false)

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loginSelector = useSelector(state => state.loginReducer)
    const homeSelector:IHome = useSelector(state => state.homeReducer)
    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const tokenUser = loginSelector.user.token
    const userId = loginSelector.user.user_id
    const wishlistData = detailProductSelector.productWishlistData;
    const name = loginSelector.user.name

    const onDismissSnackBar = () => {
        setErrVisible(false)
    }

    const onPressAction = () => {
        setErrVisible(false)
    }

    const onIncrease = async (id) => {
        setLoading(true)
        const param = {
            user_id: userId,
            wishlist_id: id,
            category: "tambah",
            update_type: "qty"
        }
        try {
            const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/update`, param, HeaderAuth(tokenUser))
            if (_onFavorite.status === 200) {
                setLoading(false)
                await getWishlistData(data)
                // await dispatch(homeAction.requestHome(name, userId, 0, true))
            } else {
                Alert.alert("Terjadi Kesalahan", "Terjadi Kesalahan Ketika Mengurangi Produk")
                setValidatorErrorMsg(_onFavorite.data.msg)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order" + error)
        }
    }

    const onDecrease = async (id) => {
        const dataIdFiltered: Array = data.filter((v, i, a) => {
            if(v.id === id){
                return v.quantity <= 1
            }else{
                return null
            }
        })

        const param = {
            user_id: userId,
            wishlist_id: id,
            category: "kurang",
            update_type: "qty"
        }
        console.log(dataIdFiltered.length, "panjang")
        if(dataIdFiltered.length){
            await onPressDelete(id)
        }else{
            try {
                setLoading(true)
                const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/update`, param, HeaderAuth(tokenUser))
                if (_onFavorite.status === 200) {
                    console.log(_onFavorite.data)
                    setLoading(false)
                    await getWishlistData(data)
                } else {
                    console.log(_onFavorite.data)
                    Alert.alert("Terjadi Kesalahan", "Gagal Saat Mengurangi Order")
                    setValidatorErrorMsg(_onFavorite.data.msg)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                Alert.alert("Terjadi Kesalahan", "Gagal Saat Mengurangi Order" + error)
            }
        }
    }

    const onRefresh = async() => {
        setLoading(true)
        await getWishlistData(data, false)
    }

    const getWishlistData = async (data, loading) => {
        setData(data)
        setLoading(loading ? loading : true)
        dispatch(productDetailActions.setWishlistData(null))
        try {
            const _resultData = await apiServices.GET(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list?user_id=${userId}`, HeaderAuth(tokenUser))
            if (_resultData.status === 200 && _resultData.data.error < 1) {
                const wishList: IWishList[] = _resultData.data.data
                const productList: IProductWishList[] = _resultData.data.product
                const marketList: IMarket[] = _resultData.data.market
                const categoryList: ICategory[] = _resultData.data.category
                // console.log(productList, "ARRAY2")
                // ======================================================== //
                let dataArr: IData[] = [];
                if (wishList && productList && marketList && categoryList) {
                    const wishListFiltered = wishList.filter((v, i, a) => {
                        return v.status === 1
                    })
                    const productListFiltered = productList.filter((v,i,a) => {
                        if(wishList[i].status === 1){
                            return wishList[i].t_product_id === a[i].id
                        }
                    })
                    for (let i in wishListFiltered) {
                        let dataObj: IData = {}
                        dataObj.id = wishListFiltered[i].id
                        dataObj.product_id = wishListFiltered[i].t_product_id
                        dataObj.t_category_product_id = wishListFiltered[i].t_category_product_id
                        dataObj.quantity = wishListFiltered[i].quantity
                        dataObj.isFavorite = wishListFiltered[i].is_favorite
                        dataObj.owner_market_id = wishListFiltered[i].owner_market_id
                        dataObj.owner_market_subdistrict = wishListFiltered[i].owner_market_subdistrict
                        dataObj.owner_market_city = wishListFiltered[i].owner_market_city
                        dataObj.owner_market_subdistrict_name = wishListFiltered[i].owner_market_subdistrict_name
                        dataObj.owner_market_city_name = wishListFiltered[i].owner_market_city_name
                        // product
                        dataObj.productTitle = productListFiltered[i].name
                        dataObj.avatar = productListFiltered[i].avatar
                        dataObj.price = productListFiltered[i].price * wishListFiltered[i].quantity
                        // market
                        dataObj.marketName = marketList[i].market_name
                        dataObj.category = categoryList[i].name
                        dataObj.sec_market_id = wishListFiltered[i].sec_market_id
                        dataObj.address = homeSelector.userAddress.subdistrict ? homeSelector.userAddress.subdistrict : ""
                        dataArr.push(dataObj)
                    }
                    if(dataArr.length < 1){
                        setIsEmpty(true)
                    }else{
                        setIsEmpty(false)
                    }
                    setData(dataArr)
                    console.log(isEmpty, "isEmpty")
                }

                setLoading(false)
                setLoading(false)
            } else {
                setLoading(false)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setLoading(false)
            console.log(error, "error")
            Alert.alert("Kesalahan Server", "Gagal Mengambil Daftar Produk")
        }
    }

    const onPressDelete = (id) => {
        const param = {
            user_id: userId,
            wishlist_id: id,
        }
        Alert.alert("Hapus Daftar Produk", "Hapus Produk Dari Daftar Produk ?", [
            {
                text: "Hapus",
                onPress: async () => {
                    try {
                        setLoading(true)
                        const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/delete`, param, HeaderAuth(tokenUser))
                        if (_onFavorite.status === 200) {
                            await getWishlistData(data)
                            setLoading(false)
                            // await dispatch(homeAction.requestHome(name, userId, 0, true))
                        } else {
                            Alert.alert("Terjadi Kesalahan")
                            setValidatorErrorMsg(_onFavorite.data.msg)
                            setLoading(false)
                        }
                    } catch (error) {
                        setLoading(false)
                        Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order" + error)
                    }
                },
                style: "cancel"
            },
            { text: "Batalkan", onPress: () => {} }
        ], { cancelable: true });
    }

    const onPressBuy = async (id) => {
        const OrderDetailData:IData[] = data
        const detailOrder = {}
        for(let i in OrderDetailData) {
            if(OrderDetailData[i].id === id){
                detailOrder.productName = OrderDetailData[i].productTitle
                detailOrder.marketName = OrderDetailData[i].marketName
                detailOrder.category = OrderDetailData[i].category
                detailOrder.productId = OrderDetailData[i].product_id
                detailOrder.marketId = OrderDetailData[i].sec_market_id
                detailOrder.userId = userId
                detailOrder.price = OrderDetailData[i].price
                detailOrder.quantity = OrderDetailData[i].quantity
                detailOrder.productAvatar = OrderDetailData[i].avatar
                detailOrder.ownerCityId = OrderDetailData[i].owner_market_city
                detailOrder.ownerSubdistrictId = OrderDetailData[i].owner_market_subdistrict
                detailOrder.ownerCityName = OrderDetailData[i].owner_market_city_name
                detailOrder.ownerSubdistrictName = OrderDetailData[i].owner_market_subdistrict_name
            }
        }
        navigate("OrderDetail", detailOrder)
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
        try{
            const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/update`,param, HeaderAuth(tokenUser))
            if(_onFavorite.status === 200){
                console.log(_onFavorite.data)
                setValidatorErrorMsg("Tambah Ke Favorit Berhasil")
                setIsError(false)
                setErrVisible(true)
                setLoading(false)
            }else{
                console.log(_onFavorite.data)
                Alert.alert("Terjadi Kesalahan", condition)
                setValidatorErrorMsg(_onFavorite.data.msg)
                setLoading(false)
            }
        }catch(error){
            setLoading(false)
            Alert.alert("Terjadi Kesalahan", "Gagal Saat Menambahkan Order Ke Favorit" + error)
        }
    }

    useEffect(() => {
        console.log("hit useEffect!", navigation.navigation.addListener)
        const subscribe = navigation.navigation.addListener('focus', () => {
            getWishlistData(null)
        });
        return subscribe
    }, [navigation.navigation]);


    return (
        <>
            <ScrollView style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={onRefresh}
                    style={{ paddingTop: 60 }}
                />
            }
            >
            <View>
                {/* <Spinner
                visible={loading}
                textContent={''}
                textStyle={{ color: COLORS.white }}
                /> */}
                    { isEmpty ? <OnEmptyList /> : data ? data.map((x, i) => (
                        <OrderList 
                        key={i}
                        address={x.address}
                        avatar={x.avatar}
                        category={x.category}
                        isFavorite={x.isFavorite === 1 ? true : false}
                        marketName={x.marketName}
                        price={convertToIdr(x.price)}
                        title={x.productTitle}
                        qty={x.quantity.toString()}
                        onPressBuy={ () => onPressBuy(x.id) }
                        onCheck={(e) => onPressFav(x.id, e)}
                        onDecrease={() => onDecrease(x.id)}
                        onIncrease={() => onIncrease(x.id)}
                        onPressDelete={() => onPressDelete(x.id)}
                        onPressProduct={() => onPressItem(x.product_id)}
                        />
                    )) : 
                    <OnEmptyList
                        onRefresh={ () => onRefresh() }
                    />}
                </View>
            </ScrollView>
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
