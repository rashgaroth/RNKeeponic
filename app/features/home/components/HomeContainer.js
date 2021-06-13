import React from 'react';
import {
    View,
    StatusBar,
    Text,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

import * as productDetailActions from "../../productDetail/actions";
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


const skeletonData = [1, 2, 3, 4, 5, 6];
const RenderSkeleton = ({ length }) => (
    <View style={{ flexDirection: "column", alignSelf: "center" }}>
        {skeletonData.map((v, i) => (
            <View key={i} style={{ flexDirection: "row", marginVertical: 10 }}>
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    // visible={homeSelector.isLoading}
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 16,
                        marginLeft: 10
                    }}
                />
                <ShimmerPlaceHolder
                    LinearGradient={LinearGradient}
                    // visible={homeSelector.isLoading}
                    style={{
                        width: 170,
                        height: 170,
                        borderRadius: 16,
                        marginLeft: 10
                    }}
                />
            </View>
        ))}
    </View>
)

const HomeContainer = () => {

    const homeSelector: IHome = useSelector(state => state.homeReducer)
    const allProducts = homeSelector.allProducts;

    const onNavigateToDetail = async (product_id, props) => {
        const image = []
        image.push(props.avatar)
        if (props.second_avatar) {
            image.push(props.second_avatar)
        }
        if (props.third_avatar) {
            image.push(props.third_avatar)
        }
        if (props.fourth_avatar) {
            image.push(props.fourth_avatar)
        }
        await dispatch(productDetailActions.setProductOnReducer(props, image))
        const param = {
            ...props,
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
                    <ProductList />
                    <Header name="Galeri Hidroponik & Kreativitas" icon="folder-multiple-image" color={COLORS.blackSans} />
                    <Text style={styles.textLebihHemat}>Jadikan sumber inspirasimu!</Text>
                    <LifeStyleContainer />
                    <Header name="Media Tanam" icon="buffer" color={COLORS.secondColor} />
                    <Text style={styles.textLebihHemat}>Barang yang direkomendasikan untuk anda!</Text>
                    {/* Flatlist untuk rekomendasi */}
                    <ProductList category="mediaTanam" />
                    <Header name="Rumah Hijau" icon="home-assistant" color={COLORS.orange} />
                    <Text style={styles.textLebihHemat}>Ide Hidroponik yang menginspirasi anda!</Text>
                    <View style={styles.wideCards}>
                        {/* FlatList Inspirasi */}
                    <ProductList category="greenHouse" />
                    </View>
                    {/* Flatlist untuk terdekat */}
                    <Header name="Bibit Hidroponik" icon="seed" color={COLORS.primaryOpacity} />
                    <Text style={styles.textLebihHemat}>Malas menunggu? Ini Solusinya!</Text>
                    <ProductList category="bibit" />
                    {/* Other Products */}
                    <Header name="Produk Lainnya" icon="package-variant" color={COLORS.redOpacity}/>
                    <Text style={styles.textLebihHemat}>Produk lain nya</Text>
                    <View style={styles.otherProducts}>
                        <FlatList
                            key={'#'}
                            data={allProducts}
                            keyExtractor={item => item.id}
                            style={styles.flatListContainer}
                            renderItem={({ item }) => (
                                <KpnCardProducts
                                    key={item.id}
                                    rating={item.rating}
                                    title={truncate(item.name, 30)}
                                    image={item.avatar}
                                    price={item.price}
                                    onPress={() => onNavigateToDetail(item.id, item)}
                                    style={{ paddingHorizontal: 10 }}
                                    onPressAvatar={() => onNavigateToDetail(item.id, item)}
                                />
                            )}
                            contentContainerStyle={styles.itemContainer}
                            ListEmptyComponent={(props) => (
                                <RenderSkeleton />
                            )}
                            numColumns={2}
                        />
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
