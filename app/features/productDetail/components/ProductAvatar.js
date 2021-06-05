import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Image,
    Animated,
} from "react-native";
import Swiper from 'react-native-swiper';
import { IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IProductDetail, IHome, IData } from '../../interfaces';
import styles from './styles';
import { COLORS } from '../../../utils/colors';
import { widthScreen } from '../../../utils/theme';

const imageW = widthScreen;
const imageH = imageW * 1;

const ProductAvatar = ({ onPressLove, onPressCart, onPressInfo, isLove }) => {

    const detailProductSelector: IProductDetail = useSelector(state => state.detailProductReducer);
    const loading = detailProductSelector.loading;

    return (
        <View>
            {
                detailProductSelector.avatar ?
                    <Swiper
                        style={styles.wrapper}
                        height={340}
                        dot={
                            <View
                                style={{
                                    backgroundColor: COLORS.colorC4,
                                    width: 5,
                                    height: 5,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3
                                }}
                            />
                        }
                        activeDot={
                            <View
                                style={{
                                    backgroundColor: COLORS.primaryColor,
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginLeft: 3,
                                    marginRight: 3,
                                    marginTop: 3,
                                    marginBottom: 3
                                }}
                            />
                        }
                        paginationStyle={{

                        }}
                        loop={false}
                    >
                        {
                            detailProductSelector.avatar.map((x, i) => (
                                <View
                                    style={styles.slide}
                                    key={i}
                                >
                                    <Image
                                        resizeMode="stretch"
                                        style={styles.image}
                                        source={{ uri: x }}
                                    />
                                </View>
                            ))
                        }
                    </Swiper>
                    :
                    <View style={[styles.itemContainer]}>
                        <Animated.Image
                            style={{
                                width: imageW,
                                height: imageH,
                                // borderRadius: 20,
                                resizeMode: 'cover',
                            }}
                            source={require('../../../assets/images/png/empty.png')}
                        />
                    </View>
            }
            {!loading ? <IconButton rippleColor={COLORS.blackSans} icon="share-variant" style={{ position: 'absolute', top: 10, left: 0, backgroundColor: COLORS.colorC4 }} color={COLORS.white} size={25} onPress={onPressCart} /> : null}
            {!loading ? <IconButton icon={isLove ? "heart" : "heart-outline"} style={{ position: 'absolute', top: 60, left: 0, backgroundColor: COLORS.colorC4 }} color={isLove ? COLORS.red : COLORS.white} size={25} onPress={onPressLove} /> : null}
            {!loading ? <IconButton icon="information-outline" style={{ position: 'absolute', top: 110, left: 0, backgroundColor: COLORS.colorC4 }} color={COLORS.white} size={25} onPress={onPressInfo} /> : null}
        </View>
    );
};


ProductAvatar.propTypes = {

};


export default ProductAvatar;
