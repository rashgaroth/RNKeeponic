import React, { useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import {Button} from "react-native-paper";
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import { COLORS } from "../utils/colors";
import Error from "../assets/images/svg/Error";
export default function KpnErrorDialog({title, msg, snap, ref}){

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const renderInner = () => (
        <View style={styles.panel}>
            <View style={{ alignItems: 'center' }}>
                <Text style={styles.panelTitle}>{ title ||"Ups, Ada Error"}</Text>
                <Error />
                <Text style={styles.panelSubtitle}>{msg || "Gagal"}</Text>
            </View>
            <View style={styles.buttonGroup}>
                <Button mode="contained" labelStyle={{ color: COLORS.white }} onPress={() => bottomSheetErrorRef.current.snapTo(1)} style={styles.button} color={COLORS.sans}>Oke</Button>
            </View>
        </View>
    );

    const fall = new Animated.Value(1);
    const bottomSheetErrorRef = useRef(null);

    const open = (snap) => {
        bottomSheetErrorRef.current.snapTo(snap)
    }

    return (
        <BottomSheet
            ref={ref}
            snapPoints={[360, 0]}
            renderHeader={renderHeader}
            renderContent={renderInner}
            initialSnap={1}
            callbackNode={fall}
            enabledGestureInteraction={true}
        />
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelTitle: {
        fontSize: 20,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    buttonGroup: {
        margin: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 15,
        width: 200,
        color: COLORS.white,
    }
})
