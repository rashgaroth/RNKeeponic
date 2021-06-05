import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import styles from './styles';

import { truncate } from '../../../utils/stringUtils';
import { searchProduct } from '../constants';
import { COLORS } from '../../../utils/colors';

const SearchView = ({ onPressCart }) => {
    return (
        <SafeAreaView>
            {/* View Ketika Input Sedang Fokus */}
            <View>
                <View style={styles.onFocusContainer}>
                    {
                        searchProduct.map((x, i) => (
                            <View key={i}>
                                <TouchableOpacity>
                                    <View style={styles.onFocusItem}>
                                        <IconButton icon="close-circle-outline" color={COLORS.white} size={15} onPress={onPressCart} />
                                        <Text>{truncate(x.name, 40)}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={styles.line}></View>
                            </View>
                        ))
                    }
                    <View style={styles.imagePetani}>
                        <Image
                            source={require("../../../assets/images/png/petani.png")}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};


SearchView.propTypes = {
    onPressCart: PropTypes.func
};


export default SearchView;
