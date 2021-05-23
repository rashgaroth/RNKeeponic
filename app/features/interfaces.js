export interface IHome{
    isLoading: boolean,
    spinnerLoading: boolean,
    isSkeleton: boolean,
    isError: boolean,
    isSeller: boolean,
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
    updated_by: string
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
    price: string
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
        updated_date: string
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
    productWishlistData: IData[]
}