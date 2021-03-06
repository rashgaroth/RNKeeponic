import React, {useState, useEffect, useCallback} from 'react';
import { 
    View, 
    StyleSheet, 
    FlatList,
    SafeAreaView,
    RefreshControl
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import { COLORS } from '../../../utils/colors';
import { convertToIdr } from '../../../utils/stringUtils';
import OrderList from '../components/OrderList';
import OnEmptyList from '../components/OnEmptyList';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import * as orderActions from '../actions';
import { Alert } from 'react-native';
import { IData, IHome, IProductDetail } from "../../interfaces";
import { HeaderAuth } from "../../../services/header";
import { navigate } from '../../../navigation/NavigationService';
import { KpnLoading, KpnDialog } from '../../../components'

export default function OrderBefore(navigation) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [validatorErrorMsg, setValidatorErrorMsg] = useState('')
    const [errVisible, setErrVisible] = useState(false)
    const [isError, setIsError] = useState(false)
    const [dialogVisible, setDialogVisible] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const loginSelector = useSelector(state => state.loginReducer)
    const homeSelector:IHome = useSelector(state => state.homeReducer)
    const orderState = useSelector(state => state.orderReducer)
    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    
    const tokenUser = loginSelector.user.token
    const userId = loginSelector.user.user_id
    const wishlistData = detailProductSelector.productWishlistData
    const name = loginSelector.user.name
    const cartData = orderState.wishListData.cart
    const cartChange = detailProductSelector.addToWishlist

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
                await dispatch(orderActions.getWishlist())
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
                    await dispatch(orderActions.getWishlist())
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

    const onRefresh = async () => {
        await dispatch(orderActions.getWishlist())
        await dispatch(orderActions.getOrderedList())
    }

    const onPressDelete = async (id) => {
        setDeleteId(id)
        setDialogVisible(true)
    }

    const onPositive = () => {
        setDialogVisible(false)
        setDeleteId(null)
    }

    const deleteCart = async () => {
        const param = {
            user_id: userId,
            wishlist_id: deleteId,
        }
        try {
            setLoading(true)
            const _onFavorite = await apiServices.POST(API.BASE_URL +
                API.ENDPOINT.WISHLIST +
                `/order_list/delete`,
                param,
                HeaderAuth(tokenUser))
            if (_onFavorite.status === 200) {
                await dispatch(orderActions.getWishlist())
                setLoading(false)
                setDialogVisible(false)
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
    }

    const onPressBuy = async (id) => {
        const OrderDetailData:IData[] = cartData
        const detailOrder = {}
        for(let i in OrderDetailData) {
            if(OrderDetailData[i].id === id){
                console.log(OrderDetailData[i].product_id, "price")
                detailOrder.productName = OrderDetailData[i].name
                detailOrder.marketName = OrderDetailData[i].market_name
                detailOrder.category = OrderDetailData[i].category_name
                detailOrder.productId = OrderDetailData[i].product_id
                detailOrder.marketId = OrderDetailData[i].sec_market_id
                detailOrder.userId = userId
                detailOrder.price = OrderDetailData[i].price
                detailOrder.quantity = 1
                detailOrder.productAvatar = OrderDetailData[i].avatar
                detailOrder.ownerCityId = OrderDetailData[i].owner_market_city
                detailOrder.ownerSubdistrictId = OrderDetailData[i].owner_market_subdistrict
                detailOrder.ownerCityName = OrderDetailData[i].owner_market_city_name
                detailOrder.ownerSubdistrictName = OrderDetailData[i].owner_market_subdistrict_name
            }
        }
        navigate("OrderDetail", detailOrder)
        // navigate("OrderSuccess", { productName: OrderDetailData[0].name, marketName: OrderDetailData[0].market_name, avatar: OrderDetailData[0].avatar })
    }

    const onPressItem = (id) => {
        const param = {
            productId: id
        }
        console.log(param)
        // navigate("ProductDetail", param)
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

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    key={'#'}
                    data={cartData.length > 0 ? cartData : []}
                    keyExtractor={item => item.id}
                    style={styles.flatListContainer}
                    renderItem={({ item }) => (
                        <OrderList
                            address={homeSelector.userAddress.subdistrict}
                            avatar={item.avatar}
                            category={item.category_name}
                            isFavorite={item.isFavorite === 1 ? true : false}
                            marketName={item.market_name}
                            price={convertToIdr(item.price)}
                            title={item.name}
                            qty={"1"}
                            onPressBuy={() => onPressBuy(item.id)}
                            onCheck={(e) => onPressFav(item.id, e)}
                            onDecrease={() => onDecrease(item.id)}
                            onIncrease={() => onIncrease(item.id)}
                            onPressDelete={() => onPressDelete(item.id)}
                            onPressProduct={() => onPressItem(item.product_id)}
                            status="Di Keranjang"
                        />
                    )}
                    contentContainerStyle={styles.itemContainer}
                    ListEmptyComponent={(props) => (
                        <OnEmptyList
                            onRefresh={() => onRefresh()}
                        />
                    )}
                    // refreshing={orderState.loading}
                    // onRefresh={() => onRefresh()}
                    refreshControl={<RefreshControl
                        refreshing={orderState.loading}
                        onRefresh={onRefresh}
                        style={{ paddingTop: 60 }}
                    />}
                />
            </View>
            <KpnLoading visible={loading} />
            <KpnDialog
                key={1}
                negativeButtonText={"Hapus"}
                positiveButtonText={"Batal"}
                title="Hapus Produk"
                onBackDropPressed={() => setDialogVisible(false)}
                visible={dialogVisible}
                text={"Hapus Produk dari Keranjang?"}
                onPositive={() => onPositive()}
                onNegative={() => deleteCart() }
            />
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
