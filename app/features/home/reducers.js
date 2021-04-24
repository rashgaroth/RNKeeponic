/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";

const initialState = {
    isLoading: false,
    spinnerLoading: false,
    isSkeleton: false,
    isError: false,
    user: {
        username: "",
        email: "",
    },
    address: {
        province: "",
        subdistricts: "",
        city: "",
        detail: ""
    },
    dummyProducts: {
        flatListData: [
            {
                id: 1,
                name: "Hidroponik berharga aaaaa sekali...",
                rating: 3,
                price: "21.000",
                image: "https://images.pexels.com/photos/7267618/pexels-photo-7267618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                id: 2,
                name: "Hidroponik dengan keaslian ....",
                rating: 2,
                price: "30.000",
                image: "https://images.pexels.com/photos/1418893/pexels-photo-1418893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                id: 3,
                name: "Hidroponik beda beematna ....",
                rating: 5,
                price: "19.000",
                image: "https://images.pexels.com/photos/7301521/pexels-photo-7301521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                id: 4,
                name: "Hidroponik dengan makna yang ...",
                rating: 4,
                price: "19.000",
                image: "https://images.pexels.com/photos/2106707/pexels-photo-2106707.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
            {
                id: 5,
                name: "KEeponic dengan keaslian ....",
                rating: 1,
                price: "191.000",
                image: "https://images.pexels.com/photos/2569206/pexels-photo-2569206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            },
        ],
        flatListWideView: [
            {
                id: 1,
                name: "Hidroponik berharga mehoong sekali...",
                image: "https://images.pexels.com/photos/7267618/pexels-photo-7267618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
            {
                id: 2,
                name: "Product2",
                image: "https://images.pexels.com/photos/1418893/pexels-photo-1418893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
            {
                id: 3,
                name: "Product3",
                image: "https://images.pexels.com/photos/7301521/pexels-photo-7301521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
        ]
    },
    products: []
};

export const homeReducer = createReducer(initialState, {
    [types.SHOW_LOADING](state){
        return {
            ...state,
            isLoading: true
        }
    },
    [types.HIDE_LOADING](state) {
        return {
            ...state,
            isLoading: false
        }
    },
    [types.HOME_GET_PRODUCTS](state, action) {
        return {
            ...state,
            products : action.products
        }
    },
    [types.HOME_TOKEN_EXPIRED](state) {
        return {
            ...state,
            isError: true
        }
    },
});
