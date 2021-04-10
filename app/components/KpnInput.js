import * as React from 'react';
import { TextInput, Text, IconButton } from 'react-native-paper';
import { StyleSheet, View, KeyboardAvoidingView } from "react-native"
import { COLORS } from '../utils/colors';
import AvoidKeyboard from './KpnKeyboardAvoidView'
import Icon from 'react-native-vector-icons/FontAwesome'

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
    isSecure,
    ...props
}) => {

    const [focus, setFocus] = React.useState(false)
    const [eye, setEye] = React.useState(false)

    return (
        <>
        {isError? <Text style={styles.errorText}>{errorText}</Text> : null}
        { isSecure ? 
        <AvoidKeyboard>
        <View>
            <TextInput
                label={label}
                value={value}
                mode="outlined"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                theme={{ colors: {
                    placeholder: placeholderColor || COLORS.primaryColor,
                    underlineColor: COLORS.white,
                    primary: primaryColor || COLORS.primaryColor,
                    background: COLORS.white,
                } }}
                onChangeText={onChangeText}
                style={[{...style}]}
                clearButtonMode="while-editing"
                disableFullscreenUI={true}
                inlineImageLeft='search_icon'
                secureTextEntry={isPassword ? eye ? false : true : false }
                {...props}
            />
            <IconButton
                icon={eye ? "eye-outline" : "eye-off-outline"}
                style={styles.iconButton}
                color={COLORS.primaryColor}
                size={25}
                onPress={() => setEye(!eye)}
            />
            {isError? <Text style={styles.errorText}>{errorText}</Text> : null}
        </View>
        </AvoidKeyboard>
        :
        <AvoidKeyboard>
            <TextInput
                label={label}
                value={value}
                mode="outlined"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                theme={{
                    colors: {
                        placeholder: placeholderColor || COLORS.primaryColor,
                        underlineColor: COLORS.white,
                        primary: primaryColor || COLORS.primaryColor,
                        background: COLORS.white,
                    }
                }}
                onChangeText={onChangeText}
                style={[{ ...style }]}
                clearButtonMode="while-editing"
                disableFullscreenUI={true}
                inlineImageLeft='search_icon'
                secureTextEntry={isPassword ? true : false}
                {...props}
            />
        </AvoidKeyboard>
        }
        </>
    );
};

const styles = StyleSheet.create({
    errorText:{
        color: COLORS.error,
        marginLeft: 10
    },
    passwordInput: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    iconButton: {
        position: 'absolute', 
        alignSelf: 'center', 
        right: 10, 
        top: 20, 
        zIndex: 100
    }
})

export default MyComponent;