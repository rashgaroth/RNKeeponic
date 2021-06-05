import React from 'react';
import PropTypes from 'prop-types';
import { View } from "react-native";
import { useSelector } from "react-redux";
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { KpnLifeStyleCard } from '../../../components';
import styles from './styles';
import { navigationRef } from '../../../navigation/NavigationService';

const RenderSkeleton = () => (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ marginHorizontal: 10 }}>
            <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                // visible={homeSelector.isLoading}
                style={{
                    width: 170,
                    height: 80,
                    borderRadius: 16,
                    marginTop: 10,
                    // marginLeft: 10
                }}
            />
            <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                // visible={homeSelector.isLoading}
                style={{
                    width: 170,
                    height: 80,
                    borderRadius: 16,
                    marginTop: 10,
                    // marginLeft: 10
                }}
            />
        </View>
        <View style={{}}>
            <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                // visible={homeSelector.isLoading}
                style={{
                    width: 170,
                    height: 80,
                    borderRadius: 16,
                    marginTop: 10,
                    // marginLeft: 10
                }}
            />
            <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                // visible={homeSelector.isLoading}
                style={{
                    width: 170,
                    height: 80,
                    marginTop: 10,
                    borderRadius: 16,
                    // marginLeft: 10
                }}
            />
        </View>
    </View>
)

const LifeStyleContainer = () => {
    const homeSelector = useSelector(state => state.homeReducer)

    return (
        <View style={styles.cardLifestyle}>
            {
                homeSelector.isLoading ? <RenderSkeleton /> :
                    <>
                        <View style={styles.cardLifestyle1}>
                            <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles.png" />
                            <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_2.jpg" />
                        </View>
                        <View style={styles.cardLifestyle2}>
                            <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_3.jpg" />
                            <KpnLifeStyleCard onPress={() => navigationRef.current?.navigate("LifeStyleDetail")} uri="https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles_4.jpg" />
                        </View>
                    </>
            }
        </View>
    );
};


LifeStyleContainer.propTypes = {

};


export default LifeStyleContainer;
