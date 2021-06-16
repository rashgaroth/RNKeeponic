import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    FlatList
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { IProductDetail, IHome } from '../../interfaces';
import { truncate } from '../../../utils/stringUtils';
import * as detailProductAction from "../actions";
import { KpnCardProducts } from "../../../components" 

const ProductListComponent = ({ onPress }) => {
    const dispatch = useDispatch();
    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const homeSelector: IHome = useSelector(state => state.homeReducer);
    const loading = detailProductSelector.loading;

    const onNavigateToDetail = async (id, props) => {
        onPress();
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
        await dispatch(detailProductAction.setProductOnReducer(props, image))
        const param = {
            // userId: user_id, 
            ...props,
            productId: id
        }
        console.log(param, "AVATAR 2")
    }

    return (
        <>
            {
                loading ? <View style={{ flexDirection: "row" }}>
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
                </View> :
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <FlatList
                            horizontal
                            data={homeSelector.category.mediaTanam}
                            renderItem={({ item }) => (
                                <KpnCardProducts
                                    key={item.id}
                                    rating={item.rating}
                                    title={truncate(item.name, 30)}
                                    image={item.avatar}
                                    price={item.price}
                                    onPress={() => onNavigateToDetail(item.id, item)}
                                    onPressAvatar={() => onNavigateToDetail(item.id, item)}
                                />
                            )}
                            keyExtractor={(item) => item.id}
                        />
                    </View>
            }
        </>
    );
};


ProductListComponent.propTypes = {

};


export default ProductListComponent;
