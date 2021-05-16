import React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { COLORS } from '../../../utils/colors';
import styles from '../containers/styles';
import { SwiperData } from "../selectors";

const SwiperComponent = () => {
    return (
        <View style={styles.sliderContainer}>
            <Swiper
                autoplay
                horizontal={false}
                height={200}
                autoplayTimeout={2000}
                activeDotColor={ COLORS.primaryColor }>
                { SwiperData.map((x, i) => (
                    <View style={styles.slide} key={i}>
                        <Image
                            source={{ uri: x }}
                            resizeMode="cover"
                            style={styles.sliderImage}
                        />
                    </View>
                )) }
            </Swiper>
        </View>
    );
}

export default SwiperComponent;
