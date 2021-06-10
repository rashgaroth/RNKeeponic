export interface IWishList {
    id: number,
    t_product_id: number,
    sec_user_id: number,
    t_category_product_id: number,
    is_favorite: number,
    quantity: number,
    status: number,
    created_date: string,
    updated_date: string,
    created_by: string,
    updated_by: string,
    sec_market_id: number
}

export interface IProductWishList {
    id: number,
    name: string,
    t_category_id: number,
    description: string,
    price: number,
    avatar: string,
    second_avatar: string,
    thrid_avatar: string,
    fourth_avatar: string,
    stock: number,
    length: number,
    width: number,
    height: number,
    actual_weight: number,
    status: number,
    rating: number,
    is_sold: number,
}

export interface IMarket {
    id: number,
    owner_sec_user_id: number,
    market_name: string,
    description: string,
    avatar: string,
    banner: string,
    status: string,
    created_date: string,
    updated_date: string
}

export interface ICategory {
    id: number,
    name: string,
    status: number
}

export interface IData {
    id: number,
    product_id: number,
    t_category_product_id: number,
    avatar: string,
    productTitle: string,
    category: string,
    address: string,
    marketName: string,
    isFavorite: number,
    quantity: number,
    price: string,
    sec_market_id: number,
    owner_market_subdistrict: number,
    owner_market_city: number,
    owner_market_subdistrict_name: string,
    owner_market_city_name: string
}

export interface IOrderDetailData {
    productName: string,
    marketName: string,
    category: string,
    productId: number,
    marketId: number,
    userId: number,
    price: number,
    quantity: number,
    productAvatar: string,
}

export interface IWishlistReducer {
    product: IData[],
}

interface IMarketAddress {
    owner_market_subdistrict: number,
    owner_market_subdistrict_name: string,
    owner_market_city: number,
    owner_market_city_name: string
}

interface IOrderedData {
    id: number,
    kode_pembayaran: string,
    kode_resi: string,
    status: number,
    buyer_id: number,
    t_product_id: number,
    harga: number,
    total_harga: number,
    kurir: string,
    sec_market_id: number,
    name: string,
    avatar: string,
    t_category_id: number,
    market_name: string,
    category: string
}

interface IHistoryData {
    date: string,
    desc: string,
    location: string
}

// ==================== reducer ===========================

export interface IOrderState {
    loading: boolean,
    isEmpty: boolean,
    userAddressList: Array<Object>,
    shipmentAddress: {
        subdistrict: string,
        city: string,
        province: string,
        detail: string,
        postalCode: string,
        userAddressId: string,
    },
    shipmentDetail: {
        courier: string,
        reciever: string,
        sender: string,
        senderAddress: string,
        phoneNumber: string,
        note: string,
        userName: string,
        paymentUrl: string,
    },
    wishListData: {
        cart: Array<Object>,
        ordered: IOrderedData[],
        sended: Array<Object>
    },
    trackingData: {
        summary: {
            awb: string,
            courier: string,
            service: string,
            status: string,
            date: string,
            desc: string,
            amount: string,
            weight: string
        },
        detail: {
            origin: string,
            destination: string,
            shipper: string,
            receiver: string
        },
        history: IHistoryData[]
    }
}

export interface IProductDetail {
    loading: boolean,
    market_id: number,
    avatar: string,
    category: {
        id: number,
        name: string,
        status: number,
    },
    mMarket: {
        id: number,
        owner_sec_user_id: number,
        market_name: string,
        description: string,
        avatar: string,
        banner: string,
        followers: number,
        status: number,
        created_date: string,
        updated_date: string,
        address: IMarketAddress
    },
    mProducts: {
        id: number,
        name: string,
        t_category_id: number,
        description: string,
        price: number,
        avatar: string,
        second_avatar: string,
        third_avatar: string,
        fourth_avatar: string,
        stock: number,
        weight: number,
        status: number,
        rating: number,
        is_sold: number,
        created_date: string,
        updated_date: string,
        m_product_model: number
    },
    productInWishList: IData[],
    productWishlistData: IData[],
    isFavorite: number
}

export interface IHome {
    isLoading: boolean,
    spinnerLoading: boolean,
    isSkeleton: boolean,
    isError: boolean,
    isSeller: boolean,
    isUserAddress: boolean,
    userProfile: {
        name: string,
        email: string,
        username: string,
        is_email_validated: number,
        phone: string,
        is_phone_validated: number,
        avatar: string,
        auth_provider: string,
        auth_profile_id: number,
        auth_data: string,
        is_admin: number,
        status: number,
    },
    userAddress: {
        subdistrict: string,
        city: string,
        prov: string
    },
    user: {
        username: string,
        email: string,
    },
    address: {
        province: string,
        subdistricts: string,
        city: string,
        detail: string
    },
    dummyProducts: Object,
    products: Object[],
    allProducts: Object[],
}
