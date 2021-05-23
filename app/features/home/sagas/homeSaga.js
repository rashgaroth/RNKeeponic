/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as homeAction from '../actions';
import * as loginAction from "../../login/actions";
import * as productDetailAction from "../../productDetail/actions";

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IProductDetail } from "../../interfaces";

let homeState = state => state.homeReducer;
let loginState = state => state.loginReducer;

export default function* homeGetProducts(state){

    // state home
    const getHomeState:IHome = yield select(homeState)
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token
    const userId = getLoginState.user.user_id

    if (state.isFromWishlist) {
        try{
            yield put(homeAction.showLoading())
            const wishListData = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.WISHLIST +
                `/order_list?user_id=${userId}`,
                HeaderAuth(token)
            )

            if (wishListData.status === 200 && wishListData.data.error < 1) {
                yield put(productDetailAction.setWishlistData(null))
                const wishList: IWishList[] = wishListData.data.data
                const productList: IProductWishList[] = wishListData.data.product
                const marketList: IMarket[] = wishListData.data.market
                const categoryList: ICategory[] = wishListData.data.category
                // ======================================================== //
                let dataArr: IData[] = [];
                if (wishList && productList && marketList && categoryList) {
                    const wishListFiltered = wishList.filter((v, i, a) => {
                        return v.status === 1
                    })
                    for (let i in wishListFiltered) {
                        let dataObj: IData = {}
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
                        dataObj.address = getHomeState.userAddress.subdistrict ? getHomeState.userAddress.subdistrict : ""

                        // console.log(productList[i].name, ": Title")
                        dataArr.push(dataObj)
                    }
                    // TODO: tambah ke reducer
                    yield put(productDetailAction.setWishlistData(dataArr))
                    yield put(homeAction.hideLoading())
                }
            } else {
                yield put(homeAction.hideLoading())
            }
        }catch(error){
            yield put(homeAction.hideLoading())
            Alert.alert("Daftar Order", "Error saat mengambil data")
            console.log(error)
        }
    } else {
        try {
            yield put(homeAction.showLoading())
            // if(token){
            console.log(token, "----TOKEN----")
            const products = getHomeState.products;
            if (products) {
                const length = products.length;
                for (let i = length; i > 0; i--) {
                    products.pop();
                }
            }

            const [productList, allProduct, wishListData] = yield all([
                call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PRODUCT +
                    `?page=${state.page}&size=5`,
                    HeaderAuth(token)
                ),
                call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PRODUCT,
                    HeaderAuth(token)
                ),
                call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.WISHLIST +
                    `/order_list?user_id=${userId}`,
                    HeaderAuth(token)
                ),
            ])
            if (productList.data.error < 1) {
                const productData = productList.data.response.product
                yield put(homeAction.getProductSuccess(productData))
                if (allProduct.data.error < 1) {
                    const productAll = allProduct.data.response.product
                    yield put(homeAction.getAllProducts(productAll))
                    yield put(homeAction.hideLoading())
                    if (wishListData.status === 200 && wishListData.data.error < 1) {
                        yield put(productDetailAction.setWishlistData(null))
                        const wishList: IWishList[] = wishListData.data.data
                        const productList: IProductWishList[] = wishListData.data.product
                        const marketList: IMarket[] = wishListData.data.market
                        const categoryList: ICategory[] = wishListData.data.category
                        // ======================================================== //
                        let dataArr: IData[] = [];
                        if (wishList && productList && marketList && categoryList) {
                            const wishListFiltered = wishList.filter((v, i, a) => {
                                return v.status === 1
                            })
                            for (let i in wishListFiltered) {
                                let dataObj: IData = {}
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
                                dataObj.address = getHomeState.userAddress.subdistrict ? getHomeState.userAddress.subdistrict : ""

                                // console.log(productList[i].name, ": Title")
                                dataArr.push(dataObj)
                            }
                            // TODO: tambah ke reducer
                            yield put(productDetailAction.setWishlistData(dataArr))
                            yield put(homeAction.hideLoading())
                        }
                    } else {
                        yield put(homeAction.hideLoading())
                    }
                } else {
                    yield put(homeAction.hideLoading())
                }
            } else {
                yield put(homeAction.hideLoading())
                // yield put(loginAction.logOut())
                setTimeout(() => {
                    Alert.alert('Keeponic', "Tidak Dapat Memuat Data Produk :)");
                }, 200);
                yield put(loginAction.logOut())
            }
        } catch (error) {
            yield put(homeAction.hideLoading())
        }
    }
}