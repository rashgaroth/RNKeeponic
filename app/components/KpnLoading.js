import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../utils/colors';

const Loading = props => <LottieView {...props} source={require("../assets/anim/loading_components.json")} autoPlay loop style={styles.anim} />

const ModalContent = () => {

    return(
        <View style={styles.containerLoading}>
            <Loading />
        </View>
    )
}

const KpnLoading = ({ visible }) => {
    return (
        <View style={styles.container}>
            <Modal
                isVisible={visible}
                animationIn="bounceIn"
                animationInTiming={500}
                animationOut="bounceOut"
                animationOutTiming={500}
                avoidKeyboard={true}
            >
                <ModalContent />
            </Modal>
        </View>
    );
};


KpnLoading.propTypes = {
    visible: PropTypes.bool
};


const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        backgroundColor: COLORS.white
    },
    anim: {
        height: 100,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 10
    },
    containerLoading: {
        height: 120,
        width: 120,
        maxHeight: 'auto',
        maxWidth: 'auto',
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    textLoading: {
        fontWeight: "bold",
        alignSelf: 'center',
        fontSize: 15
    }
})

export default KpnLoading;
