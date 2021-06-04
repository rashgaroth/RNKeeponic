import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';

import * as registerActions from '../../../register/actions';
import * as orderActions from '../../actions';
import { COLORS } from '../../../../utils/colors';
import { IHome, IOrderDetailData } from "../../../interfaces";
import { height, width } from '../../../../utils/theme';
import { convertToIdr, truncate } from '../../../../utils/stringUtils';
import * as apiServices from "../../../../services/index"
import API from '../../../../api/ApiConstants';
import { HeaderAuth } from "../../../../services/header";
import { KpnLoading, KpnNotFound } from "../../../../components"

import AddressModal from './AddressModal';
import ShipmentModal from './ShipmentModal';
import { navigate } from '../../../../navigation/NavigationService';

const LeftContent = props => <Avatar.Icon {...props} icon="map-marker-radius" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const LeftContentShipment = props => <Avatar.Icon {...props} icon="truck-outline" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const LeftContentItem = props => <Avatar.Icon {...props} icon="package-variant-closed" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />
const LeftContentCheckout = props => <Avatar.Icon {...props} icon="cash" color={COLORS.sans} style={{ backgroundColor: COLORS.white }} />

const RightContent = ({ onClick }) => {
    return(
    <Button 
    icon="home-map-marker"
    mode="text" 
    color={COLORS.sans} 
    style={{ backgroundColor: COLORS.white }}
    onPress={onClick}
    >
        Pilih
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
        <Text style={{ color:COLORS.fontColor }}>{props.subdist + ' - ' + props.city + ' - ' + props.postalCode}</Text>
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

type IAddress = {
    created_date: string,
    detail: string,
    id: number,
    postal_code: number,
    sec_user_id: number,
    status: number,
    t_subdistrict_id: number,
    updated_date: string
}

export default function AddressOrderDetail(props){
    const homeState: IHome = useSelector(state => state.homeReducer);
    const orderState = useSelector(state => state.orderReducer);
    const loginState = useSelector(state => state.loginReducer);
    const registerState = useSelector(state => state.registerReducer);

    const [visible, setVisible] = useState(false);
    const [shipmentModalVisible, setShipmentModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [buttonVisible, setButtonVisible] = useState(false);
    const [dataObjects, setDataObjects] = useState({});
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [isPhoneNull, setIsPhoneNull] = useState(false);
    const [city, setCity] = useState(homeState.userAddress.city);
    const [subdist, setSubdist] = useState(homeState.userAddress.subdistrict);
    const [isLoading, setIsLoading] = useState(false);
    const [weight, setWeight] = useState('');
    const [subdistrictId, setSubdistrictId] = useState('');
    const [cityId, setCityId] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [userAddressId, setUserAddressId] = useState('');
    const [paymentUrl, setPaymentUrl] = useState();
    const [actualPrice, setActualPrice] = useState();
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const [isStockEmpty, setIsStockEmpty] = useState(false);

    const dispatch = useDispatch();
    const loginPhone = loginState.user.phone;
    const orderPhone = orderState.shipmentDetail.phoneNumber;
    const loginName = homeState.userProfile.name;
    const orderName = orderState.shipmentDetail.userName;
    const url = orderState.shipmentDetail.paymentUrl;

    const {
        productName,
        marketName,
        category,
        productId,
        marketId,
        userId,
        price,
        ownerCityId,
        ownerSubdistrictId,
        ownerCityName,
        ownerSubdistrictName,
    } = dataObjects

    // * Dipakai saat nanti saat enhancement
    // ==========================================================================================================
    useEffect(() => {
        const token = loginState.user.token
        // origin, destination, weight, courier, productId

        const fetchAddressData = async () => {
            setIsLoading(true)
            try {
                const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PROFILE + '/list/address/' + loginState.user.user_id, HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    console.log('success address')
                    console.log("success")
                    const data = _result.data.data
                    const city = _result.data.city
                    setUserAddressId(data.id)
                    setSubdistrictId(data.t_subdistrict_id)
                    setPostalCode(data.postal_code)
                    setCityId(city.city_id)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    console.log(_result.data, "not success address")
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }
        fetchAddressData();
        // const fetchAddress = async () => {
        //     await dispatch(registerActions.getAddress());
        //     // TODO: fetch user address
        // }
        // const clearAddress = async () => {
        //     await dispatch(registerActions.setClearAddress())
        // }
        // fetchAddress();
    }, [null]);
    // =============================================================================================================

    useEffect(() => {
        if(quantity <= 1){
            setButtonVisible(true)
        }else if(quantity >= 1){
            setButtonVisible(false)
        }
    }, [quantity]);



    useEffect(() => {
        const token = loginState.user.token
        const productId = dataObjects.productId
        const getCommonProduct = async () => {
            try {
                const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PRODUCT + '/commonProduct/' + productId, HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    console.log("success common")
                    const weightData = _result.data.data
                    setWeight(String(weightData.actual_weight))
                    setActualPrice(weightData.price)
                    setIsLoading(false)
                } else {
                    console.log(_result.data, "not success get product")
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }

        getCommonProduct()
    }, [subdistrictId])

    useEffect(() => {

        const clearPayment = async () => {
            await dispatch(orderActions.setData('', 'paymentUrl'))
            console.log("clean up")
        }

        return () => clearPayment()
    }, [null])

    useEffect(() => {

        // const fetchOngkir = async () => {
        //     const token = loginState.user.token
        //     const productId = dataObjects.productId
        //     try {
        //         const body = {
        //             origin: cityId,
        //             destination: ownerCityId,
        //             weight: weight,
        //             courier: 'jne',
        //         }
        //         console.log(body)
        //         const _result = await apiServices.POST(API.BASE_URL + 'ongkos', body, HeaderAuth(token))
        //         if (_result.status === 200) {
        //             const data = _result.data.data
        //             console.log(data, "harga")
        //             setIsLoading(false)
        //         } else {
        //             console.log(_result.data, "not success")
        //             setIsLoading(false)
        //         }
        //     } catch (error) {
        //         setIsLoading(false)
        //         console.log(error)
        //     }
        // }

        // fetchOngkir()

    }, [weight])

    useEffect(() => {
        const { orderDetailData } = props;
        if (orderDetailData) {
            setDataObjects(orderDetailData)
            setQuantity(orderDetailData.quantity)
        }
    }, [null])

    useEffect(() => {
        if(loginPhone === '' && orderPhone === ''){
            setIsPhoneNull(true)
            setPhone('-')
        }else if(loginPhone != ''){
            setPhone(loginPhone)
            setIsPhoneNull(false)
        }else if(loginPhone != '' && orderPhone != ''){
            setPhone(orderPhone)
            setIsPhoneNull(false)
        }
        
        if (loginName === '' && orderName === '') {
            setName('-')
        } else if (loginName != '') {
            setName(loginName)
        } else if (loginName != '' && orderName != '') {
            setName(orderName)
        }else{
            setPhone('-')
            setName('-')
            setIsPhoneNull(true)
        }
    }, [orderState.shipmentDetail.userName, orderState.shipmentDetail.phoneNumber])

    const onIncrease = (e) => {
        if(quantity >= 1){
            setButtonVisible(false)
        }
        console.log(actualPrice, "PAY")
        console.log(orderState.shipmentDetail)
        setQuantity(quantity + 1)
    }

    const onDecrease = (e) => {
        if(quantity < 2){
            setButtonVisible(false)
        }
        setQuantity(quantity - 1)
    }

    const onNavChange = async (e) => {
        console.log(e.url, e, "event")
        const navFinish = "finish";
        if (e.title === navFinish ){
            await dispatch(orderActions.updateProduct(productId))
            navigate("OrderSuccess")
        }
    }

    const onPressBuy = async () => {
        setIsLoading(true)
        const token = loginState.user.token
        const jsonObjects = {
            items: [
                {
                    id: productId,
                    price: actualPrice,
                    quantity: quantity,
                    name: truncate(productName, 20)
                },
                {
                    id: 100,
                    price: 9000,
                    quantity: 1,
                    name: "Ongkos Kirim (JNE)"
                }
            ]
        }
        const jsonString = String(JSON.stringify(jsonObjects))
        const paramOrder = {
            buyerName: homeState.userProfile.name,
            buyerEmail: homeState.userProfile.email,
            buyerPhone: phone,
            buyerId: userId,
            buyerAddressId: userAddressId,
            secMarketId: marketId,
            productDetails: jsonString
        }

        try {
            const _result = await apiServices.POST(API.BASE_URL + API.ENDPOINT.GET_PROFILE + '/order', paramOrder, HeaderAuth(token))
            if (_result.status === 200) {
                const data = _result.data
                console.log(data.data, "order")
                if(data.data.payment_url){
                    setPaymentUrl(data.data.payment_url)
                    dispatch(orderActions.setData(data.data.payment_url, "paymentUrl"))
                    setIsOrderSuccess(true)
                }else{
                    setIsStockEmpty(true)
                }
                setIsLoading(false)
            } else {
                console.log(_result.data, "not success order")
                setIsStockEmpty(true)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const onLoadProgress = async (e) => {
        console.log(e, "ON OPEN")
    }

    //dipakai saat enhancement nanti!
    // const addressChecker = (data: IAddress[]) => {
    //     // for the next enhancement!
    //     const cit = registerState.address.city;
    //     const sub = registerState.address.subdistrict;

    //     if(data.length > 0 && data.length < 2){
    //         const kecamatan = sub.filter((v, i, a) => {
    //             return v.subdistrict_id === data[0].t_subdistrict_id
    //         })
    //         if(kecamatan){
    //             const kota = cit.filter((v, i, a) => {
    //                 return v.city_id === kecamatan[0].city_id
    //             })
    //             if (kota){
    //                 setCity(kota[0].city_name)
    //                 setSubdist(kecamatan[0].subdistrict_name)
    //             }
    //         }
    //     }else{
    //         for(let ix in data){
    //             const kecamatan = sub.filter((v, i, a) => {
    //                 return v.subdistrict_id === data[i].t_subdistrict_id
    //             })
    //             if (kecamatan) {
    //                 const kota = cit.filter((v, i, a) => {
    //                     return v.city_id === kecamatan[i].city_id
    //                 })
    //                 if (kota) {
    //                     console.log(kecamatan, "kecamatan")
    //                     console.log(kota, "kota")
    //                 }
    //             }
    //         }
    //     }
    // }

    return (
        !isOrderSuccess ? 
        <>
        <ScrollView>
            <Card>
                <Card.Title 
                title="Pilih Alamat Pengiriman" 
                subtitle={<Text {...props} style={{ color: COLORS.fontColor }}>{subdist + ' - ' + city + ' - ' + postalCode}</Text> }
                left={LeftContent} 
                // right={ (props) => <RightContent {...props} onClick={() => setVisible(true)} /> } 
                />
            </Card>
            <View style={styles.line} />
            <Card style={{ marginBottom: 10, paddingBottom: 10 }}>
                <Card.Title
                    title="Informasi Pengiriman"
                    subtitle={'Pastikan info terverifikasi oleh Pembeli'}
                    left={LeftContentShipment}
                    right={(props) => <RightContentShipment {...props} onClick={() => setShipmentModalVisible(true)} postalCode={postalCode} />}
                />
                <Card.Content style={styles.shipmentContainer}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: COLORS.blackSans }}>Kurir : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>JNE</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Penerima : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>{name}</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Pengirim : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>{dataObjects.marketName ? dataObjects.marketName : '----'}</Text></Text>
                        <Text style={{ color: COLORS.blackSans }}>Alamat Pengirim : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>Bandung</Text></Text>
                            <Text style={{ color: COLORS.blackSans }}>No Telepon : <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>{phone}</Text></Text>
                    </View>
                </Card.Content>
                {
                    isPhoneNull ? 
                            <View style={styles.shipmentError}>
                                <Text style={styles.textError}>No Telepon Harus Diisi</Text>
                            </View>
                            : null
                }
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
                    left={LeftContentCheckout}
                />
                <Card.Content>
                    <Paragraph style={{ fontSize: 14 }}>Total Harga : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> {dataObjects.price ? convertToIdr(actualPrice) : '----'} x {String(quantity)} = {' '} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + dataObjects.price ? convertToIdr(quantity * actualPrice) : '----' }
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
                >{dataObjects.price ? convertToIdr(quantity * actualPrice) : '----'}</Title>
                <Button
                    color={COLORS.primaryColor}
                    mode="contained"
                    style={styles.buttonBuy}
                    onPress={() => onPressBuy()}
                > Beli </Button>
            </View>
            <AddressModal visible={visible} key={1} onBackDropPressed={() => setVisible(false)} />
            <ShipmentModal visible={shipmentModalVisible} key={2} onBackDropPressed={() => setShipmentModalVisible(false)} />
        </ScrollView>
        <KpnLoading visible={isLoading} key={1} />
        <KpnNotFound visible={isStockEmpty} onBackDropPressed={() => setIsStockEmpty(false)} />
        </>
        :
        <View style={{ height: height - 100, width: width }}>
            <WebView 
            source={{ uri: url }} 
            onNavigationStateChange={(e) => onNavChange(e)}
            onLoadProgress={(e) => onLoadProgress(e)}
            />
        </View>
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
