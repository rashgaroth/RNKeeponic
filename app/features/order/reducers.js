/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
    loading: false,
    isEmpty: true,
    userAddressList: null,
    shipmentAddress: {
        subdistrict: "",
        city: "",
        province: "",
        detail: "",
        postalCode: "",
        userAddressId: "",
    },
    shipmentDetail: {
        courier: "JNE",
        reciever: "",
        sender: "",
        senderAddress: "",
        phoneNumber: "",
        note: "",
        userName: "",
        paymentUrl: "",
    },
    wishListData: {
        cart: [],
        ordered: [],
        sended: []
    }
};

export const orderReducer = createReducer(initialState, {
    [types.SET_DATA_SHIPMENT](state, action) {
        return {
            ...state,
            shipmentDetail: {
                ...state.shipmentDetail,
                [action.field]: action.data
            },
        };
    },
    [types.SET_ADDRESS_LIST](state, action) {
        return {
            ...state,
            userAddressList: action.data
        };
    },
    [types.SET_LOADING](state, action) {
        return {
            ...state,
            loading: action.isLoading
        };
    },
    [types.GET_WISHLIST](state, action) {
        return {
            ...state,
            wishListData: {
                ...state.wishListData,
                cart: [],
                ordered: [],
                sended: []
            }
        };
    },
    [types.SET_EMPTY](state, action) {
        return {
            ...state,
            isEmpty: action.isEmpty
        };
    },
    [types.GET_ORDERED_LIST](state, action) {
        return {
            ...state,
            wishListData: {
                ...state.wishListData,
                ordered: []
            }
        };
    },
    [types.STORE_WISHLIST](state, action) {
        if(action.field === 'cart'){
            return {
                ...state,
                wishListData:{
                    ...state.wishListData,
                    [action.field]: [...state.wishListData.cart, action.data]
                }
            };
        }else if(action.field === 'ordered'){
            return {
                ...state,
                wishListData: {
                    ...state.wishListData,
                    [action.field]: [...state.wishListData.ordered, action.data]
                }
            };
        }else{
            return {
                ...state,
                wishListData: {
                    ...state.wishListData,
                    [action.field]: [...state.wishListData.sended, action.data]
                }
            };
        }
    },
});
