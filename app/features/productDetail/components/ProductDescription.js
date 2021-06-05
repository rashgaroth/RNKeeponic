import React from 'react';
import {
    View,
    Text
} from "react-native";
import { useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { IProductDetail } from '../../interfaces';
import styles from './styles';
import { truncate } from '../../../utils/stringUtils';
import { COLORS } from '../../../utils/colors';
import { width } from '../../../utils/theme';

const ProductDescription = ({ description, readableDesc, onRead }) => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const loading = detailProductSelector.loading;
    const { mProducts } = detailProductSelector;
    
    return (
        <>
            {
                loading ? <View>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 190,
                            height: 20,
                            marginTop: 10,
                            borderRadius: 16,
                            marginLeft: 10
                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: width,
                            height: 140,
                            marginTop: 10,
                            borderRadius: 16,
                            marginHorizontal: 10
                        }}
                    />
                </View> :
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ marginBottom: 10, marginTop: 10 }}> {description ? description : truncate(mProducts.description, 200)} </Text>
                        <Text style={{ color: COLORS.blue }} onPress={onRead}>{readableDesc ? "Minimalkan" : "Baca Selengkapnya"}</Text>
                    </View>
            }
        </>
    );
};


ProductDescription.propTypes = {

};


export default ProductDescription;
