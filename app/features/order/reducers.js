/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
    loading: false,
    modalLoading: false,
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
    },
    trackingData: {
        summary: {
            awb: "",
            courier: "",
            service: "",
            status: "",
            date: "",
            desc: "",
            amount: "",
            weight: ""
        },
        detail: {
            origin: "",
            destination: "",
            shipper: "",
            receiver: ""
        },
        history: []
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
    [types.GET_TRACKING](state, action) {
        return {
            ...state,
            trackingData: {
                ...state.trackingData,
                summary: {
                    ...state.trackingData.summary,
                    awb: "",
                    courier: "",
                    service: "",
                    status: "",
                    date: "",
                    desc: "",
                    amount: "",
                    weight: ""
                },
                detail: {
                    ...state.trackingData.detail,
                    origin: "",
                    destination: "",
                    shipper: "",
                    receiver: ""
                },
                history: []
            }
        };
    },
    [types.GET_TRACKING_SUCCESS](state, action){
        return {
            ...state,
            trackingData: {
                ...state.trackingData,
                summary: {
                    ...state.trackingData.summary,
                    awb: action.data.summary.awb,
                    courier: action.data.summary.courier,
                    service: action.data.summary.service,
                    status: action.data.summary.status,
                    date: action.data.summary.date,
                    desc: action.data.summary.desc,
                    amount: action.data.summary.amount,
                    weight: action.data.summary.weight
                },
                detail: {
                    ...state.trackingData.detail,
                    origin: action.data.detail.origin,
                    destination: action.data.summary.destination,
                    shipper: action.data.summary.shipper,
                    receiver: action.data.summary.receiver
                },
                history: [...state.trackingData.history, action.data.history]
            }
        }
    },
    [types.SET_ADDRESS_LIST](state, action) {
        return {
            ...state,
            userAddressList: action.data
        };
    },
    [types.SET_LOADING_MODAL](state, action) {
        return {
            ...state,
            modalLoading: action.data
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
                cart: []
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
                ordered: [],
                sended: []
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
