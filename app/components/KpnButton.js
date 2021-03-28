import * as React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';
import { COLORS } from '../utils/colors';

const KpnButton = ({text, icon, onPress, mode, key, color, isRounded, onLongPress, theme, style}) => (
    <TouchableOpacity>
        <Button 
        key={key || null}
        style={isRounded ? {...styles.Button, ...style} : {...style}}
        icon={icon || null}
        theme={theme}
        uppercase
        onLongPress={onLongPress}
        mode={mode || "contained"} 
        color={color || COLORS.secondColor}
        onPress={onPress}>
            {text}
        </Button>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    Button: {
        borderRadius: 15,
        padding: 3,
        marginHorizontal: 50,
        textAlign: 'center',
        justifyContent: 'center',
    }
})



export default KpnButton