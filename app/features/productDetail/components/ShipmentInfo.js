import React from 'react';
import {
    View,
    Text
} from "react-native";
import { useSelector } from 'react-redux';
import { IconButton } from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';

import { IProductDetail, IHome } from '../../interfaces';
import styles from './styles';

const ShipmentInfo = () => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const homeState: IHome = useSelector(state => state.homeReducer);
    const loading = detailProductSelector.loading;

    return (
        <>
            {
                loading ? <View style={styles.productDescription}>
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 170,
                            height: 20,
                            borderRadius: 16,
                            marginLeft: 10
                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 180,
                            height: 20,
                            borderRadius: 16,
                            marginVertical: 10,
                            marginLeft: 10
                        }}
                    />
                    <ShimmerPlaceHolder
                        LinearGradient={LinearGradient}
                        // visible={homeSelector.isLoading}
                        style={{
                            width: 190,
                            height: 20,
                            borderRadius: 16,
                            marginLeft: 10
                        }}
                    />
                </View> :
                    <>
                        <Text style={styles.title}>Informasi Pengiriman</Text>
                        <View style={styles.row}>
                            <IconButton
                                icon="truck-check"
                                size={20}
                            />
                            <Text style={{ alignSelf: "center" }}>
                                <Text>{"Diantar ke" + " "}</Text>
                                <Text style={{ fontWeight: "bold" }}> { homeState.userAddress.subdistrict } </Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <IconButton
                                icon="clock-outline"
                                size={20}
                            />
                            <Text style={{ alignSelf: "center" }}>
                                <Text>{"3 - 5 Jam"}</Text>
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <IconButton
                                icon="package-variant"
                                size={20}
                            />
                            <Text style={{ alignSelf: "center" }}>
                                <Text>{"Kurir :" + " "}</Text>
                                <Text style={{ fontWeight: "bold" }}>{"JNE"}</Text>
                            </Text>
                        </View>
                    </>
            }
        </>
    );
};


ShipmentInfo.propTypes = {

};


export default ShipmentInfo;
