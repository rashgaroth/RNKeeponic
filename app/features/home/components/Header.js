import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";


const Header = ({ name }) => {
    return (
        <View style={styles.textMenuHidroponik}>
            <Text style={styles.textPaketHidroponik}>{name || 'Paket Hidroponik'}</Text>
            <TouchableOpacity onPress={(e) => console.log("homeSelector", "masuk")}>
                <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
        </View>
    );
};


Header.propTypes = {

};


export default Header;
