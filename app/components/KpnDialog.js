import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Card,
    Text,
    IconButton,
    Title,
    Paragraph,
    Button
} from 'react-native-paper';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import { AirbnbRating } from 'react-native-elements';

import { COLORS } from '../utils/colors';
import { height, width } from '../utils/theme';
import Question from '../assets/images/svg/Question';

const ModalView = ({ text, positiveButtonText, negativeButtonText, onPositive, onNegative }) => {

    const scrollRef = useRef();
    return (
        <ScrollView
            ref={(ref) => (scrollRef.current = ref)}
            style={styles.modalView}
            automaticallyAdjustContentInsets={true}
            contentContainerStyle={{
                paddingBottom: 20
            }}
            onScroll={(e) => {
                console.log(e.nativeEvent.contentOffset.y, "scroll")
            }}
        >
            <View style={{ alignSelf: "center"}}>
                <Question />
            </View>
            <View style={{ alignSelf: "center", marginTop: 10 }}>
                <Text style={styles.productName}>{text || 'Apakah Anda Yakin?'}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 10 }}>
                <Button 
                mode="outlined" 
                color={COLORS.primaryColor}
                onPress={onPositive}
                theme={{
                    fonts: {
                        thin: 15
                    },
                    mode: "adaptive",
                    animation: 20,
                    roundness: 10
                }}
                >{ positiveButtonText || "Ya" }</Button>
                <Button 
                mode="outlined"
                color={COLORS.red}
                onPress={onNegative}
                theme={{
                    fonts: {
                        thin: 15
                    },
                    mode: "adaptive",
                    animation: 20,
                    roundness: 10,
                    colors: COLORS.red
                }}
                >{ negativeButtonText || "Tidak"}</Button>
            </View>
        </ScrollView>
    )
}

const ModalHeader = ({ onPress, title }) => {
    return (
        <Card.Title
            titleStyle={{ fontSize: 14 }}
            title={title || "Keeponic"}
            left={
                (props) =>
                    <IconButton
                        {...props}
                        size={20}
                        icon="keyboard-backspace"
                        color={COLORS.sans}
                        style={{ backgroundColor: COLORS.white }}
                        onPress={onPress}
                    />
            }
        />
    )
}

const ModalContent = ({ 
    onBackPressed, 
    text, 
    title, 
    positiveButtonText, 
    negativeButtonText,
    onPositive,
    onNegative
}) => {
    return (
        <View style={styles.container}>
            <ModalHeader onPress={onBackPressed} title={title}/>
            <ModalView
                text={text}
                positiveButtonText={positiveButtonText}
                negativeButtonText={negativeButtonText}
                onPositive={onPositive}
                onNegative={onNegative}
            />
        </View>
    )
}

const KpnDialog = ({
    visible,
    onBackDropPressed,
    text,
    title,
    positiveButtonText, 
    negativeButtonText,
    onPositive,
    onNegative
}) => {
    return (
        <View>
            <Modal
                isVisible={visible}
                onBackdropPress={onBackDropPressed}
                deviceWidth={width}
                deviceHeight={height}
                animationIn="bounceIn"
                animationInTiming={1000}
                animationOut="bounceOut"
                animationOutTiming={200}
                style={{ /* height: 300, */ borderRadius: 16 }}
            >
                <ModalContent
                    onBackPressed={onBackDropPressed}
                    text={text}
                    title={title}
                    positiveButtonText={positiveButtonText}
                    negativeButtonText={negativeButtonText}
                    onPositive={onPositive}
                    onNegative={onNegative}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: height - 550,
        marginHorizontal: 20,
        backgroundColor: COLORS.white,
        borderRadius: 16,
    },
    modalView: {
        marginHorizontal: 10
    },
    addressCard: {
        marginVertical: 3,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.primaryColor,
        backgroundColor: COLORS.greenSans,
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 12,
        color: COLORS.primaryColor,
        textAlign: "center"
    },
    textNormal: {
        fontSize: 12,
        color: COLORS.primaryColor
    },
    containerAddressCard: {
        margin: 10
    },
    deleteButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    switch: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    anim: {
        height: 200,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    textInput: {
        height: 40,
        fontSize: 12
    },
    errorMsg: {
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: COLORS.redOpacity,
        justifyContent: 'center',
    },
    errorText: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        color: COLORS.red
    },
    rating: {
        marginTop: 20,
    },
    card: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'flex-start'
    },
    productName: {
        color: COLORS.blackSans,
        fontSize: 20,
        fontWeight: 'bold'
    },
    marketName: {
        marginLeft: 10,
        color: COLORS.colorC4,
        fontWeight: 'bold'
    }
})

KpnDialog.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func,
    text: PropTypes.string,
    onPositive: PropTypes.func,
    onNegative: PropTypes.func,
    title: PropTypes.string,
    positiveButtonText: PropTypes.string,
    negativeButtonText: PropTypes.string
};


export default KpnDialog;