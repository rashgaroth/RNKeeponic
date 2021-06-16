import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
// import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';

import { KpnCardProducts } from '../../../components';
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from '../../../utils/stringUtils';
import { navigate } from '../../../navigation/NavigationService';
import styles from './styles';
import { IProducts, IHome } from '../../interfaces';
import * as productDetailActions from "../../productDetail/actions";
import * as homeActions from "../actions";
import { COLORS } from '../../../utils/colors';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";

const RenderSkeleton = () => (
    <View style={{ flexDirection: "row" }}>
        <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
                width: 170,
                height: 170,
                borderRadius: 16,
                marginLeft: 10
            }}
        />
        <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
                width: 170,
                height: 170,
                borderRadius: 16,
                marginLeft: 10
            }}
        />
        <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            // visible={homeSelector.isLoading}
            style={{
                width: 170,
                height: 170,
                borderRadius: 16,
                marginLeft: 10
            }}
        />
    </View>
)

const Footer = ({ onPressLoad, onLoad }) => {
    return (
        <View>
            {
                onLoad ? <ActivityIndicator color={COLORS.primaryColor} />
                    : <Button
                        mode="outlined"
                        icon={"refresh"}
                        color={COLORS.primaryColor}
                        style={{
                            // width: 200,
                            height: 30,
                            fontSize: 15,
                            marginLeft: 10,
                            justifyContent: "center",
                        }}
                        theme={{
                            fonts: {
                                thin: 15
                            },
                            mode: "adaptive",
                            animation: 20,
                            roundness: 10
                        }}
                        onPress={onPressLoad}
                    >
                        Selanjutnya
                    </Button>
            }
        </View>
    )
}

const ProductList = ({ category }) => {
    const homeSelector:IHome = useSelector(state => state.homeReducer);
    const loginState = useSelector(state => state.loginReducer);

    const [isLoad, setIsLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [listData, setListData] = useState([])

    const dispatch = useDispatch();

    const token = loginState.user.token;

    const onNavigateToDetail = async (user_id, product_id, props) => {
        const image = []
        image.push(props.avatar)
        if (props.second_avatar) {
            image.push(props.second_avatar)
        }
        if (props.third_avatar) {
            image.push(props.third_avatar)
        }
        if (props.fourth_avatar) {
            image.push(props.fourth_avatar)
        }
        await dispatch(productDetailActions.setProductOnReducer(props, image))
        const param = {
            ...props,
            productId: product_id
        }
        navigate("ProductDetail", param)
    }

    const loadData = async (p) => {
        setIsLoad(true)
        try {
            const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PRODUCT + `/findAll?page=${p}&size=4`, HeaderAuth(token))
            if (_result.status === 200 || _result.data.data) {
                setIsLoad(false)
                const data = _result.data.response.product;
                // console.log(data, "LOCAL DATA ------------ ")
                setPage(p)
                setListData([...listData, ...data])
            }
        } catch (error) {
            setIsLoad(false)
            console.log(error)
        }
    }

    const onloadMore = async () => {
        console.log(page + 1, "PAGE -- ")
        await loadData(page + 1)
    }

    useEffect(() => {
        return () => setListData([])
    }, [null])

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true

            const fetchFlatListData = async () => {
                if(isActive){
                    // setPage(0)
                    setListData([])
                    console.log(page, "PAGE")
                    await loadData(page)
                }
            }

            fetchFlatListData()

            return () => {
                isActive = false
            }
        }, [])
    )

    return (
        <View style={styles.cardProducts}>
            <FlatList
                key={'#'}
                data={listData}
                keyExtractor={item => item.id}
                // style={{ alignItems: 'center'}}
                renderItem={({ item }) => (
                    <KpnCardProducts
                        key={item.id}
                        rating={item.rating}
                        title={truncate(item.name, 30)}
                        image={item.avatar}
                        price={item.price}
                        onPress={() => onNavigateToDetail(item.id, item)}
                        style={{ paddingHorizontal: 10 }}
                        onPressAvatar={() => onNavigateToDetail(item.id, item)}
                    />
                )}
                contentContainerStyle={{ 
                    justifyContent: "space-between"
                }}
                ListEmptyComponent={(props) => (
                    <RenderSkeleton />
                )}
                enableEmptySections={true}
                removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                initialNumToRender={4}
                legacyImplementation={true}
                numColumns={2}
                ListFooterComponent={(props) => (
                    <Footer onLoad={isLoad} onPressLoad={() => onloadMore()} />
                )}
                // onEndReached={() => onloadMore()}
            />
        </View>
    );
};


ProductList.propTypes = {

};


export default ProductList;
