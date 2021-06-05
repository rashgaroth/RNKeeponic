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

const ProductListComponent = ({ }) => {
    const dispatch = useDispatch();
    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const homeSelector: IHome = useSelector(state => state.homeReducer);
    const loading = detailProductSelector.loading;

    const onNavigateToDetail = async (id) => {
        const param = {
            product_id: id
        }
        await dispatch(detailProductAction.getDetailProduct(param));
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
                            data={homeSelector.products}
                            renderItem={({ item }) => (
                                <KpnCardProducts
                                    key={item.id}
                                    rating={item.rating}
                                    title={truncate(item.name, 30)}
                                    image={item.avatar}
                                    price={item.price}
                                    onPress={() => onNavigateToDetail(item.id)}
                                    onPressAvatar={() => onNavigateToDetail(item.id)}
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
