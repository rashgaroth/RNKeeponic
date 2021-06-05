import PropTypes from 'prop-types';
import React from 'react';
import {
    View,
    StatusBar,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';

import styles from './styles';

import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";
import { truncate } from "../../../utils/stringUtils";
import { KpnCardProducts } from "../../../components";
import { navigate } from "../../../navigation/NavigationService";
import Swiper from "../components/Swiper";
import { IHome } from "../../interfaces";
import Header from "./Header";
import ProductList from './ProductList';
import LifeStyleContainer from './LifeStyleContainer';

const HomeContainer = () => {

    const homeSelector: IHome = useSelector(state => state.homeReducer)
    const allProducts = homeSelector.allProducts;

    const onNavigateToDetail = (user_id, product_id) => {
        const param = {
            // userId: user_id, 
            productId: product_id
        }
        navigate("ProductDetail", param)
    }

    return (
        <View>
            <StatusBar backgroundColor={COLORS.sans} />
            <Swiper />
            <View>
                <View>
                    <Header name="Paket Hidroponik" />
                    <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text>
                    <View style={styles.cardProducts}>
                        <ProductList />
                    </View>
                    <Header name="Galeri Hidroponik & Kreativitas" />
                    <Text style={styles.textLebihHemat}>Jadikan sumber inspirasimu!</Text>
                    <LifeStyleContainer />
                    <Header name="khusus untuk kamu" />
                    <Text style={styles.textLebihHemat}>Barang yang direkomendasikan untuk anda!</Text>
                    {/* Flatlist untuk rekomendasi */}
                    <ProductList />
                    <Header name="Inspirasi dan Edukasi" />
                    <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
                    <View style={styles.wideCards}>
                        {/* FlatList Inspirasi */}
                        <ProductList />
                    </View>
                    {/* Flatlist untuk terdekat */}
                    <Header name="Terdekat dari rumah anda" />
                    <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
                    <ProductList />
                    {/* Other Products */}
                    <Header name="Produk Lainnya" />
                    <Text style={styles.textLebihHemat}>Produk lain nya, hanya di Keeponic</Text>
                    <View style={styles.otherProducts}>
                        {
                            allProducts ? allProducts.map((data, index) => (
                                <View key={index}>
                                    <KpnCardProducts
                                        key={index}
                                        rating={data.rating}
                                        title={truncate(data.name, 30)}
                                        image={data.avatar}
                                        price={data.price}
                                        onPress={() => onNavigateToDetail(0, data.id)}
                                        onPressAvatar={() => onNavigateToDetail(0, data.id)}
                                    />
                                </View>
                            )) : null
                        }
                    </View>
                </View>
                <View style={{ height: 60, width: width }}></View>
            </View>
        </View>
    );
};


HomeContainer.propTypes = {

};


export default HomeContainer;
