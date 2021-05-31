import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from "react-native-loading-spinner-overlay";
import LottieView from 'lottie-react-native';

import * as registerActions from '../../../register/actions';
import { COLORS } from '../../../../utils/colors';
import { IHome, IOrderDetailData } from "../../../interfaces";
import { width } from '../../../../utils/theme';
import { convertToIdr, truncate } from '../../../../utils/stringUtils';

import AddressModal from './AddressModal';
import ShipmentModal from './ShipmentModal';

const LeftContent = props => <Avatar.Icon {...props} icon="map-marker-radius" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const LeftContentShipment = props => <Avatar.Icon {...props} icon="truck-outline" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const LeftContentItem = props => <Avatar.Icon {...props} icon="package-variant-closed" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const Loading = props => <LottieView {...props} source={require("../../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />

const RightContent = ({ onClick }) => {
    return(
    <Button 
    icon="plus" 
    mode="text" 
    color={COLORS.sans} 
    style={{ backgroundColor: COLORS.white }}
    onPress={onClick}
    >
        Tambah
    </Button>
    )
}
const RightContentShipment = ({ onClick }) => {
    return (
        <Button
            icon="update"
            mode="text"
            color={COLORS.sans}
            style={{ backgroundColor: COLORS.white }}
            onPress={onClick}
        >
            Ubah
        </Button>
    )
}
const UserAddress = (props) => {
    return(
        <Text style={{ color:COLORS.fontColor }}>{props.subdist + ' - ' + props.city}</Text>
    )
}
const RenderQuantityChanger = ({onIncrease, onDecrease, qty, disabled}) => {
    return(
        <View style={styles.count}>
            <IconButton
                icon="minus-circle-outline"
                color={COLORS.primaryColor}
                onPress={onDecrease}
                disabled={disabled}
            />
            <TextInput
                style={{
                    height: 30,
                    fontSize: 14,
                    padding: 5,
                    paddingLeft: 15,
                    borderColor: 'gray',
                    borderBottomWidth: 1
                }}
                defaultValue={qty || "0"}
            />
            <IconButton
                icon="plus-circle-outline"
                color={COLORS.primaryColor}
                onPress={onIncrease}
            />
        </View>
    )
}

export default function AddressOrderDetail(props){
    const [visible, setVisible] = useState(false);
    const [shipmentModalVisible, setShipmentModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [dataObjects, setDataObjects] = useState({})
    // let dataObjects:IOrderDetailData = {};

    const addressSelector: IHome = useSelector(state => state.homeReducer);
    const loadingIndicator = useSelector(state => state.registerReducer.loadingNext)
    const dispatch = useDispatch();
    const city = addressSelector.userAddress.city;
    const subdist = addressSelector.userAddress.subdistrict;

    useEffect(() => {
        const fetchAddress = async () => {
            await dispatch(registerActions.getAddress());
            // TODO: fetch user address
        }
        const clearAddress = async () => {
            await dispatch(registerActions.setClearAddress())
        }
        fetchAddress();
        return () => {
            console.log("clearing address")
            clearAddress();
        };
    }, []);

    useEffect(() => {
        if(quantity <= 1){
            setButtonVisible(true)
        }else if(quantity >= 1){
            setButtonVisible(false)
        }
    }, [quantity]);

    useEffect(() => {
        const { orderDetailData } = props;
        if (orderDetailData) {
            setDataObjects(orderDetailData)
            setQuantity(orderDetailData.quantity)
        }
    }, [null])

    const onIncrease = (e) => {
        if(quantity >= 1){
            setButtonVisible(false)
        }
        setQuantity(quantity + 1)
    }

    const onDecrease = (e) => {
        if(quantity < 2){
            setButtonVisible(false)
        }
        setQuantity(quantity - 1)
    }

    return (
        loadingIndicator ? <Loading /> :
        <ScrollView>
            <Spinner
                visible={loadingIndicator}
                textContent={''}
                textStyle={{ color: COLORS.white }}
            />
            <Card>
                <Card.Title 
                title="Alamat Pengiriman" 
                subtitle={ <UserAddress city={city} subdist={subdist} /> } 
                left={LeftContent} 
                right={ (props) => <RightContent {...props} onClick={() => setVisible(true)} /> } 
                />
            </Card>
            <View style={styles.line} />
            <Card style={{ marginBottom: 10, paddingBottom: 10 }}>
                <Card.Title
                    title="Informasi Pengiriman"
                    subtitle={'Pastikan info terverifikasi oleh Pembeli'}
                    left={LeftContentShipment}
                    right={(props) => <RightContentShipment {...props} onClick={() => setShipmentModalVisible(true)} />}
                />
                <Card.Content style={styles.shipmentContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: COLORS.blackSans }}>Kurir : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>JNE</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Penerima : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>{addressSelector.userProfile.name ? addressSelector.userProfile.name : '----' }</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Pengirim : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>{dataObjects.marketName ? dataObjects.marketName : '----'}</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Alamat Pengirim : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>Bandung</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>No Telepon : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>-</Text></Text>
                    </View>
                </Card.Content>
                <View style={styles.shipmentError}>
                    <Text style={styles.textError}>No Telepon Harus Diisi</Text>
                </View>
            </Card>
            <Card>
                <Card.Title
                    title="Informasi Barang"
                    subtitle={"Pastikan Barang yang Dibeli Benar"}
                    left={LeftContentItem}
                />
                <Card.Content>
                    <View style={styles.row}>
                        <Card.Cover style={styles.cardCover} source={{ uri: dataObjects.productAvatar ? dataObjects.productAvatar : 'https://i.stack.imgur.com/GNhxO.png' }} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{dataObjects.productName ? dataObjects.productName : '----'}</Text>
                            <Paragraph style={{ fontSize: 14 }}>{dataObjects.marketName ? dataObjects.marketName : '----'}</Paragraph>
                            <Paragraph style={{ fontSize: 14 }}>{dataObjects.category ? dataObjects.category : '----'}</Paragraph>
                            <Paragraph style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>{dataObjects.price ? convertToIdr(parseInt(parseInt(dataObjects.price))) : '----'}</Paragraph>
                        </View>
                            <RenderQuantityChanger
                            onIncrease={(e) => onIncrease(e)}
                            onDecrease={(e) => onDecrease(e)}
                            qty={String(quantity)}
                            disabled={buttonVisible}
                            />
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.line} />
            <Card style={{ paddingBottom: 10 }}>
                <Card.Title
                    title="Ringkasan Pembayaran"
                    subtitle={"Harga barang sudah termasuk PPN (10%)"}
                    left={LeftContentShipment}
                />
                <Card.Content>
                    <Paragraph style={{ fontSize: 14 }}>Total Harga : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> {dataObjects.price ? convertToIdr(parseInt(parseInt(dataObjects.price))) : '----'} x {String(quantity)} = {' '} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + dataObjects.price ? convertToIdr(parseInt(parseInt(dataObjects.price))) : '----' }
                    </Text></Text></Paragraph>

                </Card.Content>
            </Card>
            <Paragraph style={{ marginLeft: 10 }}>
                Dengan ini saya setuju akan <Text style={{ color: COLORS.sans }}>Kebijakan & Privasi </Text>
                Keeponic
            </Paragraph>
            <View style={styles.rowButton}>
                <Title
                style={{ marginTop: 10, fontWeight: "bold", color: COLORS.orange }}
                >{dataObjects.price ? convertToIdr(quantity * parseInt(dataObjects.price)) : '----'}</Title>
                <Button
                    color={COLORS.primaryColor}
                    mode="contained"
                    style={styles.buttonBuy}
                    onPress={props.onPressBuy}
                > Beli </Button>
            </View>
            <AddressModal visible={visible} key={1} onBackDropPressed={() => setVisible(false)} />
            <ShipmentModal visible={shipmentModalVisible} key={2} onBackDropPressed={() => setShipmentModalVisible(false)} />
        </ScrollView>
    );
};


UserAddress.propTypes = {
    subdist: PropTypes.string,
    city: PropTypes.string,
};

AddressOrderDetail.propTypes = {

};

const styles = StyleSheet.create({
    line: {
        height: 2,
        backgroundColor: COLORS.colorF4,
        width: width,
        marginHorizontal: 10,
    },
    shipmentContainer: { 
        borderColor: COLORS.sans, 
        borderRadius: 10, 
        borderWidth: 1, 
        marginHorizontal: 10,
        padding: 10
    },
    shipmentError:{
        marginLeft: 10,
        marginTop: 8,
        borderColor: COLORS.red,
        borderRadius: 5,
        borderWidth: 1,
        width: 150,
        height: 20,
        backgroundColor: COLORS.redOpacity
    },
    textError: {
        fontSize: 10,
        fontWeight: "bold",
        justifyContent: "center",
        alignSelf: "center",
        color: COLORS.red,
        marginTop: 2,
    },
    cardCover: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    count: {
        flexDirection: "row",
        justifyContent: "flex-end",
        position: "absolute",
        right: 0,
        bottom: 0    
    },
    buttonBuy: {
        width: 180,
        marginTop: 10,
        alignSelf: "flex-end",
        borderRadius: 10
    },
    rowButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
    },
    anim: {
        height: 200,
        width: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    }
})
