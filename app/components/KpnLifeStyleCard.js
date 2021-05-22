import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { COLORS } from '../utils/colors';
import Rating from "../assets/images/svg/Rating";
import { navigationRef } from "../navigation/NavigationStack";
import { width } from '../utils/theme';

const KpnLifeStyleCard = ({ uri, onPress }) => {
    return (
        <Card style={styles.cardContainer}>
            <Card.Cover style={styles.cardCover} source={{ uri: uri ? uri : 'https://picsum.photos/200/300' }} />
        </Card>
    )
};

const styles = StyleSheet.create({
    cardContainer: {
        // height: 200,
        borderWidth: 1,
        borderColor: COLORS.colorC4,
        borderRadius: 10,
        margin: 10
    },
    cardCover: {
        borderRadius: 10,
        height: 90,
        width: width / 2 - 20,
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