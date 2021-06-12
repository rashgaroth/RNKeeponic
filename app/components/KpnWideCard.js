import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../utils/colors';
import Rating from "../assets/images/svg/Rating";
import * as detailProductAction from "../features/productDetail/actions";
import { useDispatch } from "react-redux";

const KpnWideCard = ({ rating, title, price, image, paragraph }) => {
    
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

    return (
        <Card style={styles.cardContainer}>
            <Card.Cover style={styles.cardCover} source={{ uri: image || 'https://picsum.photos/200' }} />
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardTitle}>
                    <TouchableOpacity>
                        <Text style={styles.text}>{title || 'Card Title'}</Text>
                        <Paragraph style={styles.paragraph}>{paragraph || 'Card Paragraph'}</Paragraph>
                    </TouchableOpacity>
                </View>
            </Card.Content>
        </Card>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        width: 250,
        height: 200,
        borderWidth: 1,
        borderColor: COLORS.colorC4,
        borderRadius: 10,
        // marginRight: 10
        margin: 10
    },
    cardCover: {
        height: 100,
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
        marginTop: 5
    },
    cardPrice: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    textPrice: {
        fontWeight: "bold"
    },
    paragraph: {
        color: COLORS.fontColor
    },
    text: {
        fontWeight: "bold",
        fontSize: 15
    }
})

export default KpnWideCard;