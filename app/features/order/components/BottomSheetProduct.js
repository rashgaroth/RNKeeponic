import React, { useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import BottomSheet, { BottomSheetFlatList, BottomSheetBackdropProps, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from 'react-native-reanimated';

import { KpnCardProducts } from '../../../components';
import { height, ITEM_WIDTH, SPACING, width } from "../../../utils/theme";
import { truncate } from "../../../utils/stringUtils";
import { navigate } from '../../../navigation/NavigationService';

const BottomSheetProduct = () => {
    // ref
    const bottomSheetRef = useRef(null);
    const homeSelector = useSelector(state => state.homeReducer)
    // variables
    const snapPoints = useMemo(() => ['15%', '40%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const onNavigateToDetail = (user_id, product_id) => {
        const param = {
            productId: product_id
        }
        navigate("ProductDetail", param)
    }

    return (
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={styles.bottomSheet}
                backdropComponent={(props) => ( <BottomSheetBackdrop {...props} enableTouchThrough={true} /> )}
            >
                <View style={styles.contentContainer}>
                <Text style={styles.title}>Produk Lainnya Untukmu! ✔</Text>
                <View style={styles.list}>
                    <BottomSheetFlatList
                        horizontal
                        data={homeSelector.products}
                        // snapToInterval={ITEM_WIDTH + SPACING * 1.6}
                        // contentContainerStyle={{
                        //     paddingRight: width - ITEM_WIDTH - SPACING * 2,
                        // }}
                        renderItem={({ item }) => (
                            <KpnCardProducts
                                isBottomSheet
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
                </View>
                </View>
            </BottomSheet>
    );
};


BottomSheetProduct.propTypes = {

};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: 'white',
    },
    contentContainer: {
        alignItems: 'center',
        width: width,
    },
    title: {
        fontWeight: 'bold',
    },
    list: {
        flex: 0,
        height: 250,
        left: 10,
        marginTop: 20
    },
    bottomSheet:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
    }
});

export default BottomSheetProduct;
