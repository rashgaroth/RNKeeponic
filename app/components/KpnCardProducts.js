import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../utils/colors';
import Rating from "../assets/images/svg/Rating";
import NoRating from "../assets/images/svg/NoRating";
const KpnCardProducts = ({ style, rating, title, price, image, userId, productId, onPress, onPressAvatar, isBottomSheet}) => {
    const totalRating = 5;
    const Cart = props => <Avatar.Icon 
    {...props} 
    icon="cart-plus"
    size={25} 
    style={{
        alignSelf: "flex-end", 
        right: 0, 
        backgroundColor: COLORS.white
    }} 
    color={COLORS.black} />

    const convertToIdr = (angka) => {
        var rupiah = '';
        var angkarev = angka.toString().split('').reverse().join('');
        for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    return(
        isBottomSheet ? 
        <Card style={stylesBottomSheet.cardContainer}>
            <TouchableOpacity onPress={onPressAvatar}>
                <Card.Cover style={stylesBottomSheet.cardCover} source={{ uri: image || 'https://picsum.photos/200' }} />
            </TouchableOpacity>
            <Card.Content style={stylesBottomSheet.cardContent}>
                <View style={stylesBottomSheet.cardTitle}>
                    <TouchableOpacity onPress={onPress}>
                        <Paragraph>{title || 'Card Paragraph'}</Paragraph>
                    </TouchableOpacity>
                </View>
            <View style={stylesBottomSheet.cardRating}>
                {[...Array(totalRating)].map((x, i) => i < rating && i + 1 > rating ? (
                    // TODO: Ini untuk membuat rating setengah dari bintang
                    null
                ) : i < rating ? (
                    <Rating key={i} height={13} width={13} />
                ) : (
                    // TODO: Ini untuk membuat rating kosong
                    <NoRating height={13} width ={13} />
                )
                ) }
                {/* <TouchableOpacity>
                    <Cart />
                </TouchableOpacity> */}
            </View>
            <View style={stylesBottomSheet.cardPrice}>
                <Text style={stylesBottomSheet.textPrice}>{convertToIdr(price) || 'Rp 20.000'}</Text>
                <TouchableOpacity>
                    <Cart />
                </TouchableOpacity>
            </View>
            </Card.Content>
        </Card>
        :
        <Card style={styles.cardContainer}>
            <TouchableOpacity onPress={onPressAvatar}>
                <Card.Cover style={styles.cardCover} source={{ uri: image || 'https://picsum.photos/200' }} />
            </TouchableOpacity>
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardTitle}>
                    <TouchableOpacity onPress={onPress}>
                        <Paragraph>{title || 'Card Paragraph'}</Paragraph>
                    </TouchableOpacity>
                </View>
            <View style={styles.cardRating}>
                {[...Array(totalRating)].map((x, i) => i < rating && i + 1 > rating ? (
                    // TODO: Ini untuk membuat rating setengah dari bintang
                    null
                ) : i < rating ? (
                    <Rating key={i} height={13} width={13} />
                ) : (
                    // TODO: Ini untuk membuat rating kosong
                    <NoRating key={i} height={13} width ={13} />
                )
                ) }
                {/* <TouchableOpacity>
                    <Cart />
                </TouchableOpacity> */}
            </View>
            <View style={styles.cardPrice}>
                <Text style={styles.textPrice}>{convertToIdr(price) || 'Rp 20.000'}</Text>
                <TouchableOpacity>
                    <Cart />
                </TouchableOpacity>
            </View>
            </Card.Content>
        </Card>
    )
};

const stylesBottomSheet = StyleSheet.create({
    cardContainer: {
        width: 170,
        height: 240,
        borderWidth: 1,
        borderColor: COLORS.colorC4,
        borderRadius: 10,
        marginRight: 10,
        marginVertical: 10,
    },
    cardCover: {
        borderRadius: 10,
        height: 120,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    cardContent: {
        marginTop: 5
    },
    cardRating: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5
    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    cardPrice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    textPrice: {
        fontWeight: "bold"
    }
})

const styles = StyleSheet.create({
    cardContainer: {
        width: 170,
        // height: 200,
        borderWidth: 1,
        borderColor: COLORS.colorC4,
        borderRadius: 10,
        marginRight: 10,
        marginVertical: 10,
        marginHorizontal: 10
    },
    cardCover: {
        borderRadius: 10,
        height: 154,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    cardContent: {
        left: 0,
    },
    cardRating: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5
    },
    cardTitle: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    cardPrice:{
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    textPrice:{
        fontWeight: "bold"
    }
})

export default KpnCardProducts;