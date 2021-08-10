import React, { useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import styles from './styles';

import * as productDetailActions from "../../productDetail/actions";
import { COLORS } from "../../../utils/colors";
import { width } from "../../../utils/theme";
import { truncate } from "../../../utils/stringUtils";
import { KpnCardProducts, KpnNotFound } from "../../../components";
import { navigate } from "../../../navigation/NavigationService";
import Swiper from "../components/Swiper";
import { IHome } from "../../interfaces";
import Header from "./Header";
import ProductList from './ProductList';
import LifeStyleContainer from './LifeStyleContainer';
import RecommendationList from './RecommendationList';
import HotCategory from './HotCategory';
import MediaTanamCategory from './MediaTanamCategory';
import GreenHouseCategory from './GreenHouseCategory';
import BibitCategory from './BibitCategory';

const HomeContainer = () => {
    const homeSelector: IHome = useSelector(state => state.homeReducer)

    const [isDialogVisible, setIsDialogVisible] = useState(false)

    return (
        <View>
            <StatusBar backgroundColor={COLORS.sans} />
            <Swiper />
            <View>
                <View>
                    <Header onPress={() => setIsDialogVisible(true)} name="Produk Terhangat" icon="fire" color={COLORS.red} />
                    <Text style={styles.textLebihHemat}>Produk Terkini</Text>
                    {/* FlatList Inspirasi */}
                    <HotCategory />
                    <Header onPress={() => setIsDialogVisible(true)} name="Galeri Hidroponik" icon="folder-multiple-image" color={COLORS.blackSans} />
                    <Text style={styles.textLebihHemat}>Jadikan sumber inspirasimu!</Text>
                    <LifeStyleContainer />
                    {/* End */}
                    {/* <Header name="Rekomendasi Untukmu" onPress={() => setIsDialogVisible(true)} />
                    <Text style={styles.textLebihHemat}>Belanja lebih hemat dengan paket Hidroponik</Text> */}
                    {/* <ProductList /> */}
                    {/* <RecommendationList /> */}
                    {/* End */}
                    <Header onPress={() => setIsDialogVisible(true)} name="Media Tanam" icon="buffer" color={COLORS.secondColor} />
                    <Text style={styles.textLebihHemat}>Barang yang direkomendasikan untuk anda!</Text>
                    {/* Flatlist untuk rekomendasi */}
                    <MediaTanamCategory />
                    {/* End */}
                    <Header onPress={() => setIsDialogVisible(true)} name="Rumah Hijau" icon="home-assistant" color={COLORS.orange} />
                    <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
                    {/* FlatList Inspirasi */}
                    <GreenHouseCategory />
                    {/* End */}
                    <Header onPress={() => setIsDialogVisible(true)} name="Bibit Hidroponik" icon="seed" color={COLORS.primaryOpacity} />
                    <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
                    <BibitCategory />
                    {/* Other Products */}
                    <Header onPress={() => setIsDialogVisible(true)} name="Produk Lainnya" icon="package-variant" color={COLORS.redOpacity}/>
                    <Text style={styles.textLebihHemat}>Produk lain nya</Text>
                    <View style={styles.otherProducts}>
                        <ProductList />
                    </View>
                </View>
                <View style={{ height: 60, width: width }}></View>
            </View>
            <KpnNotFound
                visible={isDialogVisible}
                common="Oops! Maaf Fitur Belum Tersedia :("
                title="Keeponic v0.0.4"
                onBackDropPressed={() => setIsDialogVisible(false)}
            />
        </View>
    );
};


HomeContainer.propTypes = {

};


export default HomeContainer;
