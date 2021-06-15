import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput, ScrollView, BackHandler, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Text, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { WebView } from 'react-native-webview';
import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import * as registerActions from '../../../register/actions';
import * as orderActions from '../../actions';
import { COLORS } from '../../../../utils/colors';
import { IHome, IOrderDetailData } from "../../../interfaces";
import { height, width } from '../../../../utils/theme';
import { convertToIdr, truncate } from '../../../../utils/stringUtils';
import * as apiServices from "../../../../services/index"
import API from '../../../../api/ApiConstants';
import { HeaderAuth } from "../../../../services/header";
import { KpnLoading, KpnNotFound } from "../../../../components";
import BottomSheetComponent from '../../../home/components/BottomSheet';

import AddressModal from './AddressModal';
import ShipmentModal from './ShipmentModal';
import { navigate } from '../../../../navigation/NavigationService';
import { KpnDialog } from '../../../../components';

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
        Ubah
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
    const [userAddressId, setUserAddressId] = useState();
    const [paymentUrl, setPaymentUrl] = useState();
    const [actualPrice, setActualPrice] = useState();
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const [isStockEmpty, setIsStockEmpty] = useState(false);
    const [errorTitle, setErrorTitle] = useState('Stok Barang Sedang Kosong');
    const [errorCommon, setErrorCommon] = useState('Kamu bisa menunggu sampai Seller mengupdate barang');
    const [ownerAddress, setOwnerAddress] = useState();
    const [courierCost, setCourierCost] = useState('');
    const [etd, setEtd] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false);

    const dispatch = useDispatch();
    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [0, "47%"], []);

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
        ownerCityId
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
                    const data = _result.data.data
                    const city = _result.data.city
                    console.log("success", data.id)
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
    }, [homeState.userAddress.subdistrict, loginState.user.phone]);
    // =============================================================================================================

    useEffect(() => {
        if(quantity <= 1){
            setButtonVisible(true)
        }else if(quantity >= 1){
            setButtonVisible(false)
        }
    }, [quantity]);

    const onFinishLoading = (subdistName, cityName, phone, postalCode) => {
        bottomSheetRef.current.snapTo(0)
        setCity(cityName)
        setSubdist(subdistName)
        setPhone(phone)
        setPostalCode(postalCode)
        if(phone !== ""){
            setIsPhoneNull(false)
        }
    }

    useEffect(() => {
        const token = loginState.user.token
        const { orderDetailData } = props;
        const { productId } = orderDetailData;
        console.log(productId, "id")
        const getCommonProduct = async () => {
            try {
                setIsLoading(true)
                const _result = await apiServices.GET(API.BASE_URL + API.ENDPOINT.GET_PRODUCT + '/commonProduct/' + productId, HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    console.log("success common")
                    const weightData = _result.data.data
                    setWeight(String(weightData.actual_weight))
                    setActualPrice(weightData.price)
                    setOwnerAddress(weightData.market_address_id)
                    console.log(weightData.market_address_id, "OWNER")
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
    }, [])

    useEffect(() => {

        const clearPayment = async () => {
            await dispatch(orderActions.setData('', 'paymentUrl'))
            console.log("clean up")
        }

        return () => clearPayment()
    }, [null])

    useEffect(() => {
        const fetchOngkir = async () => {
            const token = loginState.user.token
            console.log(ownerAddress, "ALAMAT")
            try {
                const body = {
                    origin: cityId,
                    destination: ownerAddress,
                    weight: weight,
                    courier: 'jne',
                }
                console.log(body)
                const _result = await apiServices.POST(API.BASE_URL + 'ongkos', body, HeaderAuth(token))
                if (_result.status === 200) {
                    const data = _result.data.data
                    // console.log(data[0].costs[0].cost[0], "harga")
                    const harga = data[0].costs[0].cost[0].value;
                    const waktu = data[0].costs[0].cost[0].etd;
                    console.log(harga, "harga", waktu, "waktu")
                    if(harga && waktu){
                        setEtd(waktu)
                        setCourierCost(harga)
                    }else{
                        setEtd("3-4")
                        setCourierCost(9000)
                    }
                    setIsLoading(false)
                } else {
                    console.log(_result.data, "not success")
                    setIsLoading(false)
                    setEtd("3-4")
                    setCourierCost(9000)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
                setEtd("3-4")
                setCourierCost(9000)
            }
        }

        if(weight && ownerAddress){
            fetchOngkir()
        }

    }, [weight, ownerAddress])

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
            navigate("OrderSuccess")
            await dispatch(orderActions.updateProduct(productId))
        }
    }

    const onPressBuy = async () => {
        const address = homeState.userAddress.subdistrict;
        console.log(address, "asdas", isPhoneNull)
        console.log(actualPrice, "ACTUAL")
        console.log((quantity * actualPrice) + (0.1 * (actualPrice * quantity)) + (0.05 * (actualPrice * quantity)) + courierCost, "HASIL TAMBAHAN")
        if(!isPhoneNull && address !== ""){
            setIsLoading(true)
            const token = loginState.user.token
            const jsonObjects = {
                items: [
                    {
                        id: productId,
                        price: actualPrice,
                        quantity: quantity,
                        name: truncate(productName, 20)
                        // TODO: jadi 50
                    },
                    {
                        id: 2,
                        price: courierCost,
                        quantity: 1,
                        name: "Ongkos Kirim (JNE)"
                    },
                    {
                        id: 3,
                        price: Math.ceil((actualPrice * quantity) * (10 / 100)),
                        quantity: 1,
                        name: "Pajak (PPN) 10%"
                    },
                    {
                        id: 4,
                        price: 2000,
                        quantity: 1,
                        name: "Biaya Admin"
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

            console.log(paramOrder, "STRING")

            try {
                const _result = await apiServices.POST(API.BASE_URL + API.ENDPOINT.GET_PROFILE + '/order', paramOrder, HeaderAuth(token))
                if (_result.status === 200) {
                    const data = _result.data
                    console.log(data.data, "order")
                    if (data.data.payment_url) {
                        setPaymentUrl(data.data.payment_url)
                        dispatch(orderActions.setData(data.data.payment_url, "paymentUrl"))
                        // setIsOrderSuccess(true)
                        navigate("OrderDetailWebview", 
                        { 
                            url: data.data.payment_url,
                            productId, 
                            invoiceId: data.data.invoice_id, 
                            productName: productName, 
                            marketName: marketName, avatar: dataObjects.productAvatar
                        })
                    } else {
                        setIsStockEmpty(true)
                    }
                    setIsLoading(false)
                } else {
                    console.log(_result.data, "not success order")
                    setIsStockEmpty(true)
                    setErrorCommon("Terjadi Kesalahan")
                    setErrorTitle("Terdapat kesalahan tidak terduga saat melakukan transaksi")
                    setIsLoading(false)
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }else{
            setIsStockEmpty(true)
            setErrorCommon("Sebelum Membeli Produk, Kamu Harus Mengisi Alamat atau Nomor Telepon!")
            setErrorTitle("Alamat atau Nomor Telepon kosong")
        }
    }

    const onLoadProgress = async (e) => {
        console.log(e, "ON OPEN")
    }

    const onChangeAddress = () => {
        bottomSheetRef.current.expand()
    }

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

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

    const onPositive = () => {
        navigate("Home")
        setDialogVisible(false)
    }

    const onNegative = () => {
        setDialogVisible(false)
    }

    useEffect(() => {
        console.log("hit use Effect!")
        const backAction = () => {
            setDialogVisible(true)
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [null])

    return (
        !isOrderSuccess ? 
        <>
        <ScrollView style={{ paddingBottom: 30 }} >
            <Card>
                <Card.Title 
                title="Alamat Pengiriman" 
                subtitle={<Text {...props} style={{ color: COLORS.fontColor }}>{subdist + ' - ' + city + ' - ' + postalCode}</Text> }
                left={LeftContent} 
                right={ (props) => <RightContent {...props} onClick={() => onChangeAddress()} /> } 
                />
            </Card>
            <View style={styles.line} />
            <Card style={{ marginBottom: 10, paddingBottom: 10 }}>
                <Card.Title
                    title="Informasi Pengiriman"
                    subtitle={'Pastikan info terverifikasi oleh Pembeli'}
                    left={LeftContentShipment}
                    // right={(props) => <RightContentShipment {...props} onClick={() => setShipmentModalVisible(true)} postalCode={postalCode} />}
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
                    subtitle={"Ringkasan Pembayaran Produk"}
                    left={LeftContentCheckout}
                />
                <Card.Content>
                    <Paragraph style={{ fontSize: 14 }}>Harga Produk : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> {!isLoading ? dataObjects.price ? convertToIdr((actualPrice * quantity)) : '----' : "-----"} x {String(quantity)} = {' '} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + !isLoading ? dataObjects.price ? convertToIdr(quantity * actualPrice) : '----' : "-----" }
                    </Text></Text></Paragraph>

                    <Paragraph style={{ fontSize: 14 }}>Pajak PPN (10%) : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> {!isLoading ? dataObjects.price ? convertToIdr((actualPrice * quantity)) : '----' : "-----"} x {"10%"} = {' '} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + !isLoading ? dataObjects.price ? convertToIdr(Math.ceil(0.1 * (actualPrice * quantity))) : '----' : "-----"}
                    </Text></Text></Paragraph>

                    <Paragraph style={{ fontSize: 14 }}>Biaya Admin : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> {!isLoading ? dataObjects.price ? convertToIdr((actualPrice * quantity)) : '----' : "-----"} + {"2000"} = {' '} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + !isLoading ? dataObjects.price ? convertToIdr(2000) : '----' :"-----" }
                    </Text></Text></Paragraph>

                    <Paragraph style={{ fontSize: 14 }}>Ongkos Kirim : 
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> JNE {!isLoading ? "(" + etd + " " + "Hari" + ")" : "-----"} = {" "} 
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {!isLoading ? convertToIdr(courierCost) : "-----"}
                    </Text></Text></Paragraph>

                    <Paragraph style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.red }}>Total Harga {"\n"}
                    <Text style={{ fontSize: 14, fontWeight: "bold" }}> 
                    {!isLoading ? dataObjects.price ? convertToIdr(quantity * actualPrice) : '----' : "-----"} {"\n"} 
                    {!isLoading ? convertToIdr(Math.ceil(0.1 * (actualPrice * quantity))) : "-----"} {' '} {"\n"}
                    {!isLoading ? convertToIdr(2000) : "-----"} {"\n"} 
                    {!isLoading ? convertToIdr(courierCost) : "-----"} {' '} {"\n"}
                    {/* {"---------------------"}{"\n"} */}
                    <Text style={{ fontSize: 14, fontWeight: "bold", color: COLORS.orange }}>
                    {' ' + !isLoading ? dataObjects.price ? convertToIdr( (quantity * actualPrice) + Math.ceil((0.1 * (actualPrice * quantity))) + Math.ceil(2000) + courierCost) : '----' :"-----" }
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
                >{!isLoading ? dataObjects.price ? convertToIdr( (quantity * actualPrice) + Math.ceil((0.1 * (actualPrice * quantity))) + Math.ceil(2000) + courierCost) : '----' : "-----"}</Title>
                <Button
                    color={COLORS.primaryColor}
                    mode="contained"
                    style={styles.buttonBuy}
                    onPress={() => onPressBuy()}
                > Beli </Button>
            </View>
            <ShipmentModal visible={shipmentModalVisible} key={2} onBackDropPressed={() => setShipmentModalVisible(false)} />
        </ScrollView>
        <KpnLoading visible={isLoading} key={1} />
        <KpnNotFound title={errorTitle} common={errorCommon} visible={isStockEmpty} onBackDropPressed={() => setIsStockEmpty(false)} />
        <KpnDialog
                key={`@a$`}
                negativeButtonText={"Tidak"}
                positiveButtonText={"Ya"}
                title="Pembatalan Chekout"
                onBackDropPressed={() => setDialogVisible(false)}
                visible={dialogVisible}
                text={"Batalkan Pembelian ?"}
                onPositive={() => onPositive()}
                onNegative={() => onNegative()}
            />
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.bottomSheet}
            backdropComponent={(props) => (<BottomSheetBackdrop {...props} enableTouchThrough={true} />)}
        >
          <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}> Isi Lokasi Pengiriman Mu ✔</Text>
            <BottomSheetComponent
            onFinishLoading={(subdistName, cityName, phone, postalCode) => onFinishLoading(subdistName, cityName, phone, postalCode)}
            />
          </BottomSheetScrollView>
        </BottomSheet>
        </>
        :
        <View style={{ height: height - 30, width: width }}>
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
        marginBottom: 10,
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
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    },
    contentContainer: {
        alignItems: 'center',
        width: width,
        paddingBottom: 30,
        height: 400,
        maxHeight: 500
    },
    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,

        elevation: 18,
    },
    title: {
        fontWeight: 'bold',
    },
})
