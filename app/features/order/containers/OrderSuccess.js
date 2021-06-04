import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

import { height, width } from '../../../utils/theme';
import { COLORS } from '../../../utils/colors';
import RatingModal from '../components/RatingModal';
import BottomSheetProduct from '../components/BottomSheetProduct';

const OrderSuccess = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [bottomVisible, setBottomVisible] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            setModalVisible(true)
        }, 1000)
    }, [null])

    useEffect(() => {

    },[null])

    const onRating = (t) => {
        console.log(t)
    }

    const onPressHome = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    }

    return (
        <>
        <View style={styles.container}>
            <LottieView source={ require('../../../assets/anim/order_success.json') } autoPlay style={styles.anim} />
            <View style={styles.textContainer}>
                <Text style={styles.textTitle}>Order Sukses!</Text>
                {/* <Text style={styles.textContent}>Produk yang kamu beli sedang menunggu konfirmasi Seller!</Text> */}
            </View>
            {/* <View>
                <Text style={styles.textBase}>Produk lainnya untuk kamu</Text>
            </View> */}
            <View style={styles.button}>
                <Button style={styles.button} onPress={() => onPressHome()} color={COLORS.primaryColor} mode="outlined">Lanjutkan Membeli</Button>
            </View>
            <RatingModal 
            visible={modalVisible} 
            onBackDropPressed={() => setModalVisible(false)} 
            onRating={(t) => onRating(t) }
            />
            <BottomSheetProduct />
        </View>
        </>
    );
};


OrderSuccess.propTypes = {

};

const styles = StyleSheet.create({
    anim: {
        height: 300,
        width: 300,
        alignSelf: 'center'
    },
    container: {
        height: height,
        width: width,
        backgroundColor: COLORS.white
    },
    textContainer: {
        alignSelf: 'center'
    },
    textTitle: {
        fontSize: 25,
        fontFamily: "Helvetica",
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textContent: {
        fontSize: 20,
        fontWeight: '200',
        alignSelf: 'center',
        textAlign: 'center'
    },
    textBase: {
        marginLeft: 10,
        marginTop: 20,
        fontWeight: 'bold'
    },
    button: { 
        width: 200,
        alignSelf: 'center', 
        marginTop: 20
    }
})

export default OrderSuccess;
