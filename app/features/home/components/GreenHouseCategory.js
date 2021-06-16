import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';

import { KpnCardProducts } from '../../../components';
import { ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from '../../../utils/stringUtils';
import { navigate } from '../../../navigation/NavigationService';
import styles from './styles';
import { IProducts, IHome } from '../../interfaces';
import * as productDetailActions from "../../productDetail/actions";
import * as homeActions from "../actions";

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

const GreenHouseCategory = ({ category }) => {
    const homeSelector: IHome = useSelector(state => state.homeReducer);
    const dispatch = useDispatch();

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

    // useEffect(() => {
    //     console.log("Hitting use Effect !")

    //     const getCategory = async () => {
    //         const param = {
    //             page: 0,
    //             size: 10
    //         }
    //         await dispatch(homeActions.categoryGetGreenHouse(param))
    //     }
    //     getCategory()

    // }, [null])

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true

            const fetchFlatListData = async () => {
                if (isActive) {
                    const param = {
                        page: 0,
                        size: 10
                    }
                    await dispatch(homeActions.categoryGetGreenHouse(param))
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
                horizontal
                data={homeSelector.category.greenHouse}
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
        </View>
    );
};


GreenHouseCategory.propTypes = {

};


export default GreenHouseCategory;