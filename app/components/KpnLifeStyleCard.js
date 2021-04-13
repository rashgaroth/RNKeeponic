import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../utils/colors';
import Rating from "../assets/images/svg/Rating";

const KpnLifeStyleCard = ({}) => {

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
            <Card.Cover style={styles.cardCover} source={{ uri: 'https://picsum.photos/200/300' }} />
            <Card.Content style={styles.cardContent}>
                <View style={styles.cardTitle}>
                    <TouchableOpacity style={styles.touchable}>
                        <Title style={styles.title}>{'Card Title'}</Title>
                        <Paragraph style={styles.paragraph}>{'Card Paragraph'}</Paragraph>
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
        margin: 10
    },
    cardCover: {
        borderRadius: 10,
        height: 90,
        width: 200,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10
    },
    cardContent: {
        left: 0,
        position: "absolute"
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
    title: {
        fontWeight: "bold",
        color: COLORS.white
    },
    paragraph: {
        color: COLORS.white
    },
    touchable:{
        marginTop: 20
    }
})

export default KpnLifeStyleCard;