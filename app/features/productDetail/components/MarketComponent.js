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
import MarketInfo from './MarketInfo';

const MarketComponent = () => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const loading = detailProductSelector.loading;

    return (
        <View>
            {
                loading ? <View style={{ flexDirection: "row" }}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 60,
                            marginLeft: 10,
                            marginTop: 10
                        }}
                    />
                    <View style={{ flexDirection: "column", marginTop: 10 }}>
                        <ShimmerPlaceHolder
                            LinearGradient={LinearGradient}
                            style={{
                                width: 170,
                                height: 20,
                                borderRadius: 16,
                                marginLeft: 10,
                                marginTop: 10
                            }}
                        />
                        <ShimmerPlaceHolder
                            LinearGradient={LinearGradient}
                            style={{
                                width: 170,
                                height: 20,
                                borderRadius: 16,
                                marginLeft: 10,
                                marginTop: 10
                            }}
                        />
                        <ShimmerPlaceHolder
                            LinearGradient={LinearGradient}
                            style={{
                                width: 170,
                                height: 20,
                                borderRadius: 16,
                                marginLeft: 10,
                                marginTop: 10
                            }}
                        />
                    </View>
                </View> :
                    <View>
                        <MarketInfo />
                    </View>
            }
        </View>
    );
};


MarketComponent.propTypes = {

};


export default MarketComponent;
