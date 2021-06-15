import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { KpnCardProducts } from '../../../components';
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from '../../../utils/stringUtils';
import { navigate } from '../../../navigation/NavigationService';
import styles from './styles';
import { IProducts, IHome } from '../../interfaces';
import * as productDetailActions from "../../productDetail/actions";
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";
import EmptyCart from '../../../assets/images/svg/EmptyCart';
import { COLORS } from '../../../utils/colors';

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
const EmptyData = () => {
    return (
        <View style={{ alignSelf: 'center', alignItems: 'center'}}>
            <EmptyCart />
            <View style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginTop: 10,
                        color: COLORS.red,
                    }}
                >Kami belum dapat memberikanmu rekomendasi 😌</Text>
            </View>
            <View style={{ alignSelf: 'center', marginTop: 5}}>
                <Text style={{ 
                    alignSelf: 'center', 
                    textAlign: 'center',

                }}>Beli produk akan membantu kami untuk mencari rekomendasi untukmu!✌</Text>
            </View>
        </View>
    )
}

const RecommendationList = ({ category }) => {
    const homeSelector: IHome = useSelector(state => state.homeReducer);
    const loginState = useSelector(state => state.loginReducer);
    const dispatch = useDispatch();
    const userId = loginState.user.user_id;
    const token = loginState.user.token;
    // const loading = homeSelector.isLoading;

    const [recommendationData, setRecommendationData] = useState([]);
    const [loading, setLoading] = useState(false);

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
            // userId: user_id, 
            ...props,
            productId: product_id
        }
        navigate("ProductDetail", param)
    }

    useEffect(() => {

        const fetchRecommendationData = async () => {
            try {
                setLoading(true)
                const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PRODUCT + '/recommendation/' + userId, HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    setLoading(false)
                    console.log("success common")
                    const recommendData = _result.data.data
                    console.log(recommendData)
                    setRecommendationData(recommendData.products);
                } else {
                    setLoading(false)
                    console.log(_result.data, "ERROR RECOMEN")
                }
            } catch (error) {
                setLoading(false)
                console.log(error, "CATCH RECOMEN")
            }
        }

        fetchRecommendationData();

        return () => setRecommendationData([])
    }, [dispatch])

    return (
        <View style={styles.cardProducts}>
            {
                (!loading) ? (
                recommendationData.length > 0 ?
                (
                    <FlatList
                        horizontal
                        data={recommendationData}
                        snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                        contentContainerStyle={{
                            paddingRight: width - ITEM_WIDTH - SPACING * 2,
                        }}
                        renderItem={({ item }) => (
                            <KpnCardProducts
                                key={item.id}
                                rating={item.rating}
                                title={truncate(item.name, 30)}
                                image={item.avatar}
                                price={item.price}
                                onPress={() => onNavigateToDetail(0, item.id, item)}
                                onPressAvatar={() => onNavigateToDetail(0, item.id, item)}
                            />
                        )}
                        ListEmptyComponent={() => <RenderSkeleton />}
                        keyExtractor={(item) => item.id}
                    />
                ): (<EmptyData />)
            ) : (<RenderSkeleton /> )
            }
        </View>
    );
};


RecommendationList.propTypes = {

};


export default RecommendationList;
