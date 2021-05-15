import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { width } from '../../../utils/theme';

export default function BottomSheetComponent(){
    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <Text>Awesome 🎉</Text>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: 'grey',
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        width: width
    },
    contentContainer: {
        alignItems: 'center',
        flex: 1
    },
});