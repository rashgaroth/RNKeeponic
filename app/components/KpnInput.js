import * as React from 'react';
import { TextInput } from 'react-native-paper';
import { COLORS } from '../utils/colors';

const MyComponent = ({placeholder, style, label, primaryColor, onChangeText, value}) => {
    return (
        <TextInput
            label={label}
            value={value}
            mode="outlined"
            theme={{ colors: {
                placeholder: COLORS.primaryColor,
                underlineColor: COLORS.white,
                primary: primaryColor || COLORS.primaryColor,
                background: COLORS.white,
            } }}
            onChangeText={onChangeText}
            style={[{...style}]}
        />
    );
};

export default MyComponent;