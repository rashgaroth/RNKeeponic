import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { StyleSheet } from "react-native";
import HomePage from "./home/containers/index";
import LifeStyleDetail from "./lifestyleDetail/containers";
import OrderPage from "./order/containers/index";
import ProfilePage from "./profile/containers/index";
import { COLORS } from '../utils/colors';
import { useDispatch, useSelector } from "react-redux";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IOrderState } from './interfaces';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeRoute = () => <HomePage />;

const ArticleRoute = () => <LifeStyleDetail />;

const OrderRoute = () => <OrderPage />;

const ProfileRoute = () => <ProfilePage />;

const Tab = createBottomTabNavigator();

const BottomNavTabs = () => {
    const orderState:IOrderState = useSelector(state => state.orderReducer)
    const cart = orderState.wishListData.cart;
    const ordered = orderState.wishListData.ordered;

    const count = cart.length + ordered.length;

    return (
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Beranda') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Keranjang') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        } else if (route.name === 'Artikel') {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (route.name === 'Profil') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={focused ? COLORS.sans : COLORS.blackSans} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: COLORS.sans,
                    inactiveTintColor: COLORS.blackSans
                }}
            >
                <Tab.Screen name="Beranda" component={HomeRoute} />
                <Tab.Screen name="Keranjang" component={OrderRoute} options={{ tabBarBadge: count }} />
                <Tab.Screen name="Artikel" component={ArticleRoute} />
                <Tab.Screen name="Profil" component={ProfileRoute} />
            </Tab.Navigator>
    )
};

export default BottomNavTabs;