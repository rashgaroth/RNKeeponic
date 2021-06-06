import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from "react-native";
import HomePage from "./home/containers/index";
import SearchPage from "./search/containers/index";
import LifeStyleDetail from "./lifestyleDetail/containers";
import OrderPage from "./order/containers/index";
import ProfilePage from "./profile/containers/index";
import { COLORS } from '../utils/colors';
import { useDispatch, useSelector } from "react-redux";
import { Badge } from 'react-native-paper';
import { IOrderState } from './interfaces';

const HomeRoute = () => <HomePage />;

const SearchRoute = () => <LifeStyleDetail />;

const OrderRoute = () => <OrderPage refresh={true} />;

const ProfileRoute = () => <ProfilePage />;

const BottomNavTabs = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'beranda', title: 'Beranda', icon: 'home', color: COLORS.white },
        { key: 'pesanan', title: 'Pesanan', icon: 'cart', color: COLORS.white },
        { key: 'artikel', title: 'Artikel', icon: 'book-variant', color: COLORS.white },
        { key: 'akun', title: 'Akun', icon: 'account', color: COLORS.white }
    ]);
    const orderState:IOrderState = useSelector(state => state.orderReducer)
    const cart = orderState.wishListData.cart;
    const ordered = orderState.wishListData.ordered;

    const count = cart.length + ordered.length;

    const renderScene = BottomNavigation.SceneMap({
        beranda: HomeRoute,
        pesanan: OrderRoute,
        artikel: SearchRoute,
        akun: ProfileRoute
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            activeColor={COLORS.primaryOpacity}
            inactiveColor={COLORS.blackSans}
            keyboardHidesNavigationBar
            style={styles.bottomNav}
            getBadge={(props) => {
                if (props.route.key === "pesanan"){
                    return (<Badge size={19} >{count ? String(count) : 0}</Badge>)
                }
            }}
        />
    );
};

const styles = StyleSheet.create({
    bottomNav: {
        
    }
})

export default BottomNavTabs;