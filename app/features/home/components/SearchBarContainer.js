import React, { useEffect, useState, useRef } from 'react';
import { View, ActivityIndicator, StatusBar, StyleSheet, FlatList, Text } from 'react-native';
import { Chip  } from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from 'app/features/login/actions';
import * as productDetailActions from '../../productDetail/actions';
// import styles from './styles';
import * as apiServices from "../../../services/index"
import API from '../../../api/ApiConstants';
import { HeaderAuth } from "../../../services/header";
import { IHome } from "../../interfaces";
import { COLORS } from "../../../utils/colors";
import { width } from '../../../utils/theme';
import { KpnCardProducts } from '../../../components';
import { truncate } from '../../../utils/stringUtils';
import { setLoading } from '../../productDetail/actions';
import EmptyCart from '../../../assets/images/svg/EmptyCart';
import { navigate } from '../../../navigation/NavigationService';

const chipData = [
    {
        id: 1,
        name: 'Green House',
    },
    {
        id: 2,
        name: 'Bibit',
    },
    {
        id: 3,
        name: 'Media Tanam',
    },
    {
        id: 4,
        name: 'Pipa Hidroponik',
    },
    {
        id: 5,
        name: 'Terdekat',
    },
    {
        id: 6,
        name: 'Rating Tertinggi',
    },
]
const skeletonData = [1,2,3,4,5,6];


const OnEmptyItem = () => {
    return (
        <View style={{ alignSelf: 'center'}}>
            <EmptyCart />
            <View style={{ alignSelf: 'center'}}>
                <Text 
                style={{ 
                    fontWeight: "bold", 
                    fontSize: 16, 
                    marginTop: 10,
                    color: COLORS.red,
                    }}
                >Tidak ada hasil dari produk yang kamu cari :(</Text>
            </View>
        </View>
    )
}

const RenderSkeleton = ({ length }) => (
        <View style={{ flexDirection: "column", alignSelf: "center"}}>
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

const SearchList = ({ q, onClickChips }) => {
    const homeState: IHome = useSelector(state => state.homeReducer);
    const loginState = useSelector(state => state.loginReducer);
    const product = homeState.allProducts;
    const token = loginState.user.token;

    const [productData, setProductData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getCommonProduct = async () => {
            try {
                // setProductData([])
                setIsLoading(true)
                const _result = await apiServices.GET(
                    API.BASE_URL + 
                    API.ENDPOINT.GET_PRODUCT + 
                    '/findAll?q='+ q,
                    HeaderAuth(token))
                if (_result.status === 200 || _result.data.data) {
                    console.log("success common")
                    const productData = _result.data.response.product;
                    const totalItem = _result.data.response.totalItems;
                    setProductData(productData);
                    setTotalItems(totalItem);
                    setIsLoading(false);
                } else {
                    console.log(_result.data, "not success get product")
                    setProductData([]);
                    setIsLoading(false);
                }
            } catch (error) {
                setProductData([]);
                setIsLoading(false);
                console.log(error);
            }
        }
        getCommonProduct();
    }, [q])

    const getRandomColor = () => {
        return "hsl(" + 360 * Math.random() + ',' +
            (25 + 70 * Math.random()) + '%,' +
            (85 + 10 * Math.random()) + '%)'
    }

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

    return(
        <View>
            <View style={styles.chip}>
                <FlatList
                    key={'#'}
                    horizontal
                    data={chipData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Chip 
                        style={{ 
                            marginHorizontal: 5, 
                            backgroundColor: getRandomColor(),
                            fontWeight: 'bold'
                        }} 
                        selectedColor={ COLORS.fontColor }
                        mode={"flat"}
                        theme={{ 
                            fonts: {
                                medium: 'Open Sans'
                            }
                        }}
                        onPress={() => onClickChips(item.name)}
                        >{item.name}</Chip>
                    )}
                />
            </View>
            <View style={styles.line} />
            <View style={{ marginHorizontal: 30, marginTop: 10 }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.blackSans }}>Hasil Pencarian ({String(totalItems)}) : </Text>
            </View>
            <View>
                {
                    (!isLoading) ? (
                        productData.length > 1 ? 
                        (
                        <FlatList
                            key={'#'}
                            data={productData}
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
                                <RenderSkeleton length={productData.length} />
                            )}
                            numColumns={2}
                            />) : (<OnEmptyItem />)
                    ) : ( <RenderSkeleton /> )
                }
            </View>
        </View>
    )
}

export default function SearchContainer({ q, onClickChips }) {
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primaryOpacity} />
            {/* <Text style={styles.textMaster}> Hasil Produk yang dicari </Text> */}
            <SearchList q={q} onClickChips={onClickChips} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width
    },
    flatListContainer: {
        marginHorizontal: 10,
        flexDirection: "column",
        width: width,
        // paddingHorizontal: 10
    },
    textMaster: {
        fontWeight: "bold",
        marginTop: 10,
        marginHorizontal: 10
    },
    itemContainer: {
        // flexDirection: "column",
        // width: width,
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingBottom: 70
    },
    line: {
        height: 1,
        width: width / 2,
        alignSelf: "center",
        backgroundColor: COLORS.colorC4
    },
    chip: {
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
    }
})
