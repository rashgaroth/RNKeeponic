import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
    Card,
    Text,
    IconButton,
    Switch,
    Button,
    TextInput,
} from 'react-native-paper';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';

import { useSelector, useDispatch } from "react-redux";
import * as registerActions from '../../../register/actions';

import { COLORS } from '../../../../utils/colors';
import { IHome } from "../../../interfaces";
import { height, width } from '../../../../utils/theme';

const Loading = props => <LottieView {...props} source={require("../../../../assets/anim/loading_apps.json")} autoPlay loop style={styles.anim} />

const RenderForm = ({
    name,
    phone,
    note,
    onChangePhone,
    onChangeName,
    onChangeNote,
}) => {

    const onChangePicker = (v, i) => {
        // disabled
    }

    return (
        <KeyboardAvoidingView behavior="position">
            <Text style={[styles.textBold, { color: COLORS.blackSans }]} >Kurir</Text>
            <Picker
                mode='dropdown'
                enabled={false}
                onValueChange={(itemValue, itemIndex) =>
                    onChangePicker(itemValue, itemIndex)
                }
            >
                <Picker.Item key={1} label={'JNE'} value={1} />
            </Picker>
            <Text style={[styles.textBold, { color: COLORS.blackSans }]} >Nama Penerima</Text>
            <TextInput
                label="Nama Penerima"
                value={name}
                // disabled
                theme={{
                    colors: {
                        placeholder: COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: COLORS.primaryColor,
                        background: COLORS.white,
                    }
                }}
                style={[styles.textInput, { marginBottom: 10 }]}
                mode="outlined"
                onChangeText={onChangeName}
            />
            <Text style={[styles.textBold, { color: COLORS.blackSans }]} >Nomor Telepon</Text>
            <TextInput
                label="+62"
                value={phone}
                keyboardType="number-pad"
                // disabled
                theme={{
                    colors: {
                        placeholder: COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: COLORS.primaryColor,
                        background: COLORS.white,
                    },
                }}
                style={styles.textInput}
                mode="outlined"
                onChangeText={onChangePhone}
            />
            <Text style={[styles.textBold, { color: COLORS.blackSans, marginTop: 10 }]} >Catatan Lainnya</Text>
            <TextInput
                label="Isi Catatan"
                value={note}
                // disabled
                theme={{
                    colors: {
                        placeholder: COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: COLORS.primaryColor,
                        background: COLORS.white,
                    },
                }}
                numberOfLines={5}
                multiline={true}
                style={{ marginBottom: 10, textAlignVertical: 'top', fontSize: 12 }}
                mode="outlined"
                onChangeText={onChangeNote}
            />
            <Button
                icon="check-all"
                mode="outlined"
                onPress={() => console.log('Pressed')}
                style={{
                    marginTop: 10
                }}
                color={COLORS.sans}
            >
                Selesai
            </Button>
        </KeyboardAvoidingView>
    )
}

const ModalView = ({ subdistrict, city, province }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [scrollPadding, setScrollPadding] = useState(20)

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
                <Text style={styles.textBold}>Masukan Detail Pengiriman</Text>
                <RenderForm
                    name={name}
                    phone={phone}
                    onChangeName={(t) => setName(t)}
                    onChangePhone={(t) => setPhone(t)}
                />
            </View>
        </ScrollView>
    )
}

const ModalHeader = ({ onPress }) => {
    return (
        <Card.Title
            titleStyle={{ fontSize: 14 }}
            title={"Ubah Data Pengiriman"}
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

const ModalContent = ({ onBackPressed }) => {
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const addressSelector = useSelector(state => state.registerReducer.address);
    const subdistrict = addressSelector.subdistrict;
    const city = addressSelector.city;
    const province = addressSelector.province;

    return (
        <View style={styles.container}>
            <ModalHeader onPress={onBackPressed} />
            {
                loading ?
                    <Loading /> :
                    <ModalView
                        subdistrict={subdistrict ? subdistrict : null}
                        city={city ? city : null}
                        province={province ? province : null}
                    />
            }
        </View>
    )
}

const ShipmentModal = ({ visible, onBackDropPressed }) => {
    const addressSelector: IHome = useSelector(state => state.homeReducer);

    return (
        <View>
            <Modal
                isVisible={visible}
                onBackdropPress={onBackDropPressed}
                deviceWidth={width}
                deviceHeight={height}
                animationIn="slideInLeft"
                animationInTiming={1000}
                animationOut="slideOutLeft"
                animationOutTiming={1000}
                avoidKeyboard={true}
            >
                <ModalContent onBackPressed={onBackDropPressed} />
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height - 200,
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
        color: COLORS.primaryColor
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
    }
})

ShipmentModal.propTypes = {
    visible: PropTypes.bool,
    onBackDropPressed: PropTypes.func
};


export default ShipmentModal;
