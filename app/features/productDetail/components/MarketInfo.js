import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from "react-native";
import { Text, Avatar, Chip, Button } from "react-native-paper"
import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";
import { useDispatch, useSelector } from "react-redux"


export default function MarketInfo(){
    const [image, setImage] = useState("https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg")
    const dispatcher = useDispatch();
    const marketSelector = useSelector(state => state.detailProductReducer.mMarket);

    useEffect(() => {
        if(marketSelector.avatar){
            setImage(marketSelector.avatar)
        }else{
            setImage("https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg")
        }
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Informasi Toko</Text>
            </View>
            <View style={styles.rowInformation}>
                <View style={{ top: 10 }}>
                    <Avatar.Image size={70} source={{ uri: image }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View style={styles.rowChips,[{ marginLeft: 5 }]}>
                        <Text>{marketSelector.market_name}</Text>
                        {/* <Chip onPress={() => console.log('Pressed')}>Bandung</Chip> */}
                    </View>
                    <View style={[styles.rowChips,{ marginTop: 5 }]}>
                        <Chip icon="star" onPress={() => console.log('Pressed')}>3.6</Chip>
                        <Chip onPress={() => console.log('Pressed')}>{marketSelector.followers + " " + "Pengikut"}</Chip>
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