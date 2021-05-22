import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import { Snackbar, Button, Dialog, Portal } from 'react-native-paper';
import Spinner from "react-native-loading-spinner-overlay";

import { COLORS } from '../../../utils/colors';
import { convertToIdr } from '../../../utils/stringUtils';
import OrderList from '../components/OrderList';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { Alert } from 'react-native';
import { ICategory, IData, IMarket, IProductWishList, IWishList, IHome } from "../../interfaces";
import { HeaderAuth } from "../../../services/header";
import { navigate } from '../../../navigation/NavigationService';

export default function OrderBefore() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('');
    const [errVisible, setErrVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const [dialogVisible, setDialogVisible] = React.useState(false);

    const loginSelector = useSelector(state => state.loginReducer)
    const homeSelector:IHome = useSelector(state => state.homeReducer)
    const tokenUser = loginSelector.user.token
    const userId = loginSelector.user.user_id

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
                await getWishlistData(data)
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
        const dataIdFiltered:Array = data.filter((v, i, a) => {
            return v.quantity <= 1
        })

        const param = {
            user_id: userId,
            wishlist_id: id,
            category: "kurang",
            update_type: "qty"
        }
        if(dataIdFiltered.length){
            await onPressDelete(id)
        }else{
            try {
                setLoading(true)
                const _onFavorite = await apiServices.POST(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/update`, param, HeaderAuth(tokenUser))
                if (_onFavorite.status === 200) {
                    console.log(_onFavorite.data)
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
                            await getWishlistData(null)
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
        console.log("buyed")
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

    const getWishlistData = async (data) => {
        setData(data)
        setLoading(true)
        try {
            const _resultData = await apiServices.GET(API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list?user_id=${userId}`, HeaderAuth(tokenUser))
            if (_resultData.status === 200 && _resultData.data.error < 1) {
                const wishList: IWishList[] = _resultData.data.data
                const productList: IProductWishList[] = _resultData.data.product
                const marketList: IMarket[] = _resultData.data.market
                const categoryList: ICategory[] = _resultData.data.category
                // ======================================================== //
                let dataArr:IData[] = [];
                if(wishList && productList && marketList && categoryList){
                    const wishListFiltered = wishList.filter((v, i, a) => {
                        return v.status === 1
                    })
                    for(let i in wishListFiltered){
                        let dataObj:IData = {}
                        dataObj.id = wishListFiltered[i].id
                        dataObj.product_id = wishListFiltered[i].t_product_id
                        dataObj.t_category_product_id = wishListFiltered[i].t_category_product_id
                        dataObj.quantity = wishListFiltered[i].quantity
                        dataObj.isFavorite = wishListFiltered[i].is_favorite
                        // product
                        dataObj.productTitle = productList[i].name
                        dataObj.avatar = productList[i].avatar
                        dataObj.price = productList[i].price * wishListFiltered[i].quantity
                        // market
                        dataObj.marketName = marketList[i].market_name
                        dataObj.category = categoryList[i].name
                        dataObj.address = homeSelector.userAddress.subdistrict ? homeSelector.userAddress.subdistrict : ""

                        // console.log(productList[i].name, ": Title")
                        dataArr.push(dataObj)
                    }
                    setData(dataArr)
                }

                setLoading(false)
            } else {
                setLoading(false)
                
            }
        } catch (error) {
            setLoading(false)
            Alert.alert("Kesalahan Server", "Gagal Mengambil Daftar Produk")
        }
    }

    useEffect(() => {
        // effect
        console.log("useEffect")
        getWishlistData(null)
    }, [null]);

    return (
        <>
        <View>
            <Spinner
            visible={loading}
            textContent={''}
            textStyle={{ color: COLORS.white }}
            />
            <ScrollView style={styles.container}>
                { data ? data.map((x, i) => (
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
                )) : null }
            </ScrollView>
        </View>
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
