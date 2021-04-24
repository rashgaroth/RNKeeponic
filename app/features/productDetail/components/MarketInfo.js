import React from 'react';
import { View, StyleSheet } from "react-native";
import { Text, Avatar, Chip, Button } from "react-native-paper"
import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";

export default function MarketInfo(){
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Informasi Toko</Text>
            </View>
            <View style={styles.rowInformation}>
                <View style={{ top: 10 }}>
                    <Avatar.Image size={70} source={{ uri: "https://duniasapi.com/media/k2/items/cache/75b44b0e9c2e5d305fa323c6c51d3476_Generic.jpg" }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={styles.rowChips,[{ marginLeft: 5 }]}>
                        <Text>Hidroponik Bandung</Text>
                        {/* <Chip onPress={() => console.log('Pressed')}>Bandung</Chip> */}
                    </View>
                    <View style={[styles.rowChips,{ marginTop: 5 }]}>
                        <Chip icon="star" onPress={() => console.log('Pressed')}>3.6</Chip>
                        <Chip onPress={() => console.log('Pressed')}>Bandung</Chip>
                    </View>
                    <Button 
                    mode="outlined" 
                    color={COLORS.blue} 
                    style={{ 
                        borderRadius: 16, 
                        borderColor: COLORS.blue,
                        // height: 30,
                        marginTop: 5,
                        alignItems: 'center',
                        alignContent: 'center'
                    }}>Detail Toko</Button>
                </View>
                <Button
                    mode="outlined"
                    color={COLORS.primaryOpacity}
                    style={{
                        borderRadius: 16,
                        borderColor: COLORS.primaryOpacity,
                        height: 40,
                        marginTop: 5,
                        justifyContent: "flex-end",
                        left: 100
                    }}>Ikuti</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 10
    },
    title: {
        fontWeight: "bold",
        fontSize: 20
    },
    rowInformation: {
        flexDirection: "row",
        flexWrap: "nowrap",
        width: width
        // justifyContent: "space-between",
    },
    rowChips:{
        flexDirection: "row",
        // flexWrap: "nowrap",
    }
})