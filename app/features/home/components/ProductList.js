import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { KpnCardProducts } from '../../../components';
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from '../../../utils/stringUtils';
import { navigate } from '../../../navigation/NavigationService';
import styles from './styles';

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

const ProductList = () => {
    const homeSelector = useSelector(state => state.homeReducer)

    const onNavigateToDetail = (user_id, product_id) => {
        const param = {
            // userId: user_id, 
            productId: product_id
        }
        navigate("ProductDetail", param)
    }

    return (
        <View style={styles.cardProducts}>
            {homeSelector.isLoading ? <RenderSkeleton /> :
                <FlatList
                    horizontal
                    data={homeSelector.products}
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
                            onPress={() => onNavigateToDetail(0, item.id)}
                            onPressAvatar={() => onNavigateToDetail(0, item.id)}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                />
            }
        </View>
    );
};


ProductList.propTypes = {

};


export default ProductList;
