import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text
} from "react-native";
import { Chip } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { IProductDetail, IHome, IData } from '../../interfaces';
import styles from './styles';
import { convertToIdr } from '../../../utils/stringUtils';

const ProductName = () => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const loading = detailProductSelector.loading;
    const { mProducts } = detailProductSelector;

    return (
        <View style={styles.price}>
            {
                loading ? <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    // visible={homeSelector.isLoading}
                    style={{
                        width: 170,
                        height: 30,
                        borderRadius: 16,
                        marginLeft: 10
                    }}
                /> : <Text style={styles.priceText}>{mProducts.price ? convertToIdr(mProducts.price) : "0"}</Text>
            }
            {
                loading ? <View style={{ flexDirection: "row" }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 60,
                            height: 30,
                            borderRadius: 16,
                            marginLeft: 10
                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 60,
                            height: 30,
                            borderRadius: 16,
                            marginLeft: 10
                        }}
                    />
                </View> : <View style={styles.chip}>
                    <Chip icon="star" onPress={() => console.log(isLove, "IsLove")}>Rating Produk : {mProducts.rating} (40)</Chip>
                </View>
            }
        </View>
    );
};


ProductName.propTypes = {

};


export default ProductName;
