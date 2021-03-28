import * as React from 'react';
import { TextInput, Text } from 'react-native-paper';
import { StyleSheet } from "react-native"
import { COLORS } from '../utils/colors';

const MyComponent = ({placeholder, 
    style, 
    label, 
    primaryColor, 
    onChangeText, 
    value, 
    placeholderColor, 
    isPassword,
    isError,
    errorText,
    ...props
}) => {
    return (
        <>
        <TextInput
            label={label}
            value={value}
            mode="outlined"
            theme={{ colors: {
                placeholder: placeholderColor || COLORS.primaryColor,
                underlineColor: COLORS.white,
                primary: primaryColor || COLORS.primaryColor,
                background: COLORS.white,
            } }}
            onChangeText={onChangeText}
            style={[{...style}]}
            secureTextEntry={isPassword ? true : false}
            {...props}
        />
        {isError? <Text style={styles.errorText}>{errorText}</Text> : null}
        </>
    );
};

const styles = StyleSheet.create({
    errorText:{
        color: COLORS.error,
        marginLeft: 10
    }
})

export default MyComponent;