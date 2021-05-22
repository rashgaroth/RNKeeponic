import React from 'react';
import { Snackbar } from "react-native-paper";
import { View } from "react-native";
import { COLORS } from '../utils/colors';

const KpnSnackBar = ({errVisible, onDismissSnackBar, isError, onPressAction, validatorErrorMsg}) => {
    return (
        <View>
            <Snackbar
                visible={errVisible}
                onDismiss={onDismissSnackBar}
                style={{ backgroundColor: isError ? COLORS.red : COLORS.primaryOpacity, borderRadius: 16 }}
                theme={{
                    colors: {
                        primary: COLORS.white,
                        onBackground: COLORS.white,
                        accent: COLORS.white,
                    }
                }}
                action={{
                    label: `Oke`,
                    onPress: onPressAction,
                }}>
                {validatorErrorMsg}
            </Snackbar>
        </View>
    );
}

export default KpnSnackBar;
