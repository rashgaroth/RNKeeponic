import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet} from 'react-native';
import {
    Text,
    Button
} from 'react-native-paper';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

import { COLORS } from '../utils/colors';
import { height, width } from '../utils/theme';
import NotFound from '../assets/images/svg/NotFound';

const ModalView = ({ onComplete, title, common }) => {
    return (
        <View style={styles.view}>
            <NotFound />
            <Text style={styles.text}>{title || 'Maaf Stok Barang Sedang Kosong' }</Text>
            <Text style={styles.textCommon}>{common || 'Kamu bisa menunggu sampai Seller mengupdate stok barang' }</Text>
            <Button mode="outlined" style={styles.button} color={COLORS.primaryColor} onPress={onComplete}>Oke</Button>
        </View>
    )
}

const ShipmentModal = ({
    visible,
    onBackDropPressed,
    title,
    common
}) => {
    return (
        <View>
            <Modal
                isVisible={visible}
                onBackdropPress={onBackDropPressed}
                deviceWidth={width}
                deviceHeight={height}
                animationIn="bounceIn"
                animationInTiming={300}
                animationOut="bounceOut"
                animationOutTiming={300}
                // style={{ height: 300 }}
            >
                <View style={styles.container}>
                    <ModalView
                        onComplete={onBackDropPressed}
                        title={title}
                        common={common}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height - 510,
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        borderRadius: 16
    },
    view: {
        alignSelf: 'center',
        margin: 10
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10
    },
    textCommon: {
        alignSelf: 'center',
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 10
    },
    button: {
        width: 200,
        alignSelf: 'center',
        color: COLORS.primaryColor,
        marginTop: 10
    }
})

ShipmentModal.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func
};


export default ShipmentModal;
