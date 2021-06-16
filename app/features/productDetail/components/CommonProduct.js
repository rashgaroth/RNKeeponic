import React from 'react';
import {
    View,
    Text
} from "react-native";
import { useSelector } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { IProductDetail } from '../../interfaces';
import styles from './styles';


const CommonProduct = () => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const loading = detailProductSelector.loading;
    const { mProducts } = detailProductSelector;

    return (
        <>
            {
                loading ?
                    <View style={styles.productDescription}>
                        <ShimmerPlaceHolder
                            LinearGradient={LinearGradient}
                            // visible={homeSelector.isLoading}
                            style={{
                                width: 170,
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
                                marginVertical: 10,
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
                    </View> :
                    <View style={styles.productDescription}>
                        <Text style={{ fontWeight: "bold", fontSize: 17 }}>{mProducts.name}</Text>
                        <Text style={{ marginTop: 10 }}>
                            <Text>
                                {"Terjual" + " "}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {detailProductSelector.mProducts.is_sold}
                            </Text>
                        </Text>
                        <Text style={{ marginTop: 10 }}>
                            <Text>
                                {"Berat" + " "}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {detailProductSelector.mProducts.weight}
                            </Text>
                            {" Gram / Produk"}
                        </Text>
                        <Text style={{ marginTop: 10 }}>
                            <Text>
                                {'Stok' + ' '}
                            </Text>
                            <Text style={{ fontWeight: "bold" }}>
                                {detailProductSelector.mProducts.stock - detailProductSelector.mProducts.is_sold}
                            </Text>
                        </Text>
                    </View>
            }
        </>
    );
};


CommonProduct.propTypes = {

};


export default CommonProduct;
