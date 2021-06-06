import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styles from "./styles";
import { COLORS } from '../../../utils/colors';


const Header = ({ name, icon, color }) => {
    return (
        <View style={styles.textMenuHidroponik}>
            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                <IconButton size={20} icon={icon || "leaf"} color={color ||  COLORS.primaryColor} />
                <Text style={[styles.textPaketHidroponik, { justifyContent: "flex-start", alignSelf: 'center'}]}>{name || 'Paket Hidroponik'}</Text>
            </View>
            <TouchableOpacity onPress={(e) => console.log("homeSelector", "masuk")}>
                <Text style={styles.textLihatSemua}>Lihat Semua</Text>
            </TouchableOpacity>
        </View>
    );
};


Header.propTypes = {

};


export default Header;
