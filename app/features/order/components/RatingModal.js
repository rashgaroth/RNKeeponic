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

import { useSelector, useDispatch } from "react-redux";
import * as orderActions from '../actions';

import { COLORS } from '../../../utils/colors';
import { IHome } from "../../interfaces";
import { height, width } from '../../../utils/theme';

const Loading = props => <LottieView {...props} source={require("../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />

const ModalView = ({ onComplete, productName, marketName, productImage }) => {
    const dispatch = useDispatch();

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
            <View>
                <Text style={styles.textBold}>Berikan rating untuk Seller agar kami dapat memberikan rekomendasi terbaik untukmu</Text>
                <View style={styles.rating}>
                    <AirbnbRating 
                    size={20} 
                    defaultRating={0} 
                    showRating={false} 
                    onFinishRating={onComplete}
                    />
                </View>
                <View style={styles.card}>
                    <View>
                        <Card.Cover source={{ uri: productImage || 'https://media.tarkett-image.com/large/TH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg' }} style={{ width: 100, height: 100, borderRadius: 16 }} />
                    </View>
                    <View>
                        <Text style={styles.productName}>{ productName || '--------' }</Text>
                        <Text style={styles.marketName}>{ marketName || '---------' }</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const ModalHeader = ({ onPress }) => {
    return (
        <Card.Title
            titleStyle={{ fontSize: 14 }}
            title={"Berikan penilaian untuk seller"}
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

const ModalContent = ({ onBackPressed, productName, marketName, productImage, onComplete }) => {
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <ModalHeader onPress={onBackPressed} />
            {
                loading ?
                    <Loading /> :
                    <ModalView
                        onComplete={onBackPressed}
                        productName={productName}
                        marketName={marketName}
                        productImage={productImage}
                        onComplete={onComplete}
                    />
            }
        </View>
    )
}

const ShipmentModal = ({ 
    visible, 
    onBackDropPressed, 
    onRating, 
    martketName, 
    productName, 
    productImage 
}) => {
    const addressSelector: IHome = useSelector(state => state.homeReducer);

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
                animationOutTiming={1000}
                style={{ height: 300 }}
            >
                <ModalContent 
                onBackPressed={onBackDropPressed} 
                onComplete={onRating}
                marketName={martketName}
                productName={productName}
                productImage={productImage}
                />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height - 550,
        marginHorizontal: 20,
        backgroundColor: COLORS.white
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
        marginLeft: 10,
        color: COLORS.blackSans,
        fontSize: 15,
    },
    marketName: {
        marginLeft: 10,
        color: COLORS.colorC4,
        fontWeight: 'bold'
    }
})

ShipmentModal.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func
};


export default ShipmentModal;
