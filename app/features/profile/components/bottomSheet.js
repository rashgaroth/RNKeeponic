import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Avatar, Text } from 'react-native-paper';
import { COLORS } from '../../../utils/colors';
import { KpnButton } from '../../../components';
import { width } from '../../../utils/theme';

const BottomSheetComponent = ({snapPoints, profileImages, indexBottomSheet}) => {
    const bottomSheetRef = useRef(null);
    return (
        <View>
            <BottomSheet
                ref={bottomSheetRef}
                index={indexBottomSheet}
                snapPoints={snapPoints}
                // onChange={handleSheetChanges}
                backdropComponent={(backdropProps) => (
                    <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
                )}
            >
                <BottomSheetScrollView>
                    <View>
                        <Avatar.Image
                            source={{ uri: profileImages ? profileImages : "https://d1f31mzn1ab53p.cloudfront.net/images/hidroponik_lifestyles.png" }}
                            size={100}
                        />
                        <Text style={{
                            alignSelf: "center",
                            fontWeight: "bold",
                            fontSize: 20,
                            marginTop: 10,
                            marginHorizontal: 10
                        }}
                        >
                            Pilih Aksi
                        </Text>
                    </View>
                    <KpnButton
                        text="Lihat Detail Produk"
                        isRounded
                        mode="outlined"
                        labelStyle={COLORS.primaryColor}
                        onPress={console.log("testProfile")}
                        color={COLORS.sans}
                        style={{
                            height: 35,
                            marginTop: 10,
                            width: width - 20,
                            marginHorizontal: 10
                        }}
                    />
                    <KpnButton
                        text="Beli Produk"
                        isRounded
                        color={COLORS.sans}
                        style={{
                            height: 35,
                            width: width - 20,
                            marginTop: 10,
                            marginHorizontal: 10
                        }}
                    />
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}

export default BottomSheetComponent;
