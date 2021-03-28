import * as React from "react"
import { StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { COLORS } from "../utils/colors"

export default function KpnDivider({
    height, 
    width, 
    radius, 
    color, 
    bottomEnd, 
    bottomStart, 
    topEnd, 
    topStart,
    style
}){
    return (
        <View style=
        {{
        height: height || 15, 
        width: width || 15,
        backgroundColor: color || COLORS.primaryColor,
        borderBottomEndRadius: bottomEnd || 0,
        borderBottomStartRadius: bottomStart || 0,
        borderTopEndRadius: topEnd || 0,
        borderTopStartRadius: topStart || 0,
        ...style
        }}>

        </View>
    )
}

const styles = StyleSheet.create({

})