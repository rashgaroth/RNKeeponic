import React, { useState, useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

import { Input, Text } from 'react-native-elements';
import { KpnInput } from "../../../components"
import * as registerActions from "../actions";

export default function PasswordForm() {
    const dispatch = useDispatch();
    const userDataSelector = useSelector(state => state.registerReducer.userData);

    const onChangePassword = (t) => {
        dispatch(registerActions.onChangePassword(t))
    }

    const onChangeConfirmation = (t) => {
        dispatch(registerActions.onChangeConfirmationPassword(t))
    }

    // let count = 0
    // useEffect(() => {
    //     count++
    //     console.log("Rendering : ", count)
    // })

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <KpnInput
                            onChangeText={text => onChangePassword(text)}
                            value={userDataSelector.password}
                            style={styles.input}
                            isSecure
                            isPassword
                        />
                    </View>
                    <View style={styles.form}>
                        <Text style={styles.inputTitle}>Konfirmasi Password</Text>
                        <KpnInput
                            onChangeText={text => onChangeConfirmation(text)}
                            value={userDataSelector.confirmationPassword}
                            // isError
                            style={styles.input}
                            isPassword
                            isSecure
                        />
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}