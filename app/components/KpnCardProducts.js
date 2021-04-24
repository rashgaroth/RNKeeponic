import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../utils/colors';
import Rating from "../assets/images/svg/Rating";
import { navigate } from "../navigation/NavigationService";
import { LiquidLike } from 'react-native-animated-pagination-dots';

const KpnCardProducts = ({rating, title, price, image, userId, productId}) => {

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

    return(
        <Card style={styles.cardContainer}>
            <Card.Cover style={styles.cardCover} source={{ uri: image || 'https://picsum.photos/200' }} />
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardTitle}>
                    <TouchableOpacity onPress={() => navigate("ProductDetail", {userId, productId})}>
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
                    null
                )
                ) }
                {/* <TouchableOpacity>
                    <Cart />
                </TouchableOpacity> */}
            </View>
            <View style={styles.cardPrice}>
                <Text style={styles.textPrice}>{price || 'Rp 20.000'}</Text>
                <TouchableOpacity>
                    <Cart />
                </TouchableOpacity>
            </View>
            </Card.Content>
        </Card>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 170,
        // height: 200,
        borderWidth: 1,
        borderColor: COLORS.colorC4,
        borderRadius: 10,
        marginRight: 10
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