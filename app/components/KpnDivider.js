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
    borderWidth,
    borderColor,
    borderEndWidth,
    borderBottomWidth,
    borderStartWidth,
    borderTopWidth,
    style
}){
    return (
        <View style=
        {!radius ? {
        height: height || 15, 
        width: width || 15,
        backgroundColor: color || COLORS.primaryColor,
        borderBottomEndRadius: bottomEnd || 0,
        borderBottomStartRadius: bottomStart || 0,
        borderTopEndRadius: topEnd || 0,
        borderTopStartRadius: topStart || 0,
        borderWidth: borderWidth || 0,
        borderColor: borderColor || COLORS.secondColor,
        borderTopWidth: borderTopWidth || 0,
        borderBottomWidth: borderBottomWidth || 0,
        borderStartWidth: borderStartWidth || 0,
        borderEndWidth: borderEndWidth || 0,
        ...style
        }: {
        borderBottomEndRadius: radius || 0,
        borderBottomStartRadius: radius || 0,
        borderTopEndRadius: radius || 0,
        borderTopStartRadius: radius || 0,
        borderWidth: borderWidth || 0,
        borderColor: borderColor || COLORS.secondColor,
        borderTopWidth: borderTopWidth || 0,
        borderBottomWidth: borderBottomWidth || 0,
        borderStartWidth: borderStartWidth || 0,
        borderEndWidth: borderEndWidth || 0,
        height: height || 15,
        width: width || 15,
        backgroundColor: color || COLORS.primaryColor,
        ...style
        }}>

        </View>
    )
}

const styles = StyleSheet.create({

})