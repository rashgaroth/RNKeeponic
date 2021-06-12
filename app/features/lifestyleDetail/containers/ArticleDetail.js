import React, { useEffect, useRef, useState } from 'react';
import { 
    View,
    StatusBar, 
    Text, 
    Image, 
    ScrollView, 
    Animated 
} from 'react-native';
import { 
    Button, 
    Paragraph, 
    IconButton, 
    Chip,
    Title
} from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import { SharedElement } from 'react-navigation-shared-element';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/features/login/actions';
import styles from './styles';
import PropTypes from 'prop-types';

import { COLORS } from "../../../utils/colors";
import LogoRounded from "../../../assets/images/svg/LogoRounded";
import { loremText1, loremText2 } from '../selectors';

const DURATION = 2000;

const _RenderHeader = ({ scroll }) => {
    
    const safeArea = useSafeArea();
    const isFloating = !!scroll
    console.log(isFloating)
    const [isTransparent, setIsTransparent] = useState(isFloating);

    useEffect(() => {
        if(!scroll){
            return;
        }
        const listenerId = scroll.addListener(a => {
            const topNaviOffset = 400 - 50 - safeArea.top;
            console.log(topNaviOffset, "offset")
            if(isTransparent && a.value > topNaviOffset){
                setIsTransparent(false)
            } else if (!isTransparent && a.value < topNaviOffset){
                setIsTransparent(true)
            }
        })
        return () => scroll.removeListener(listenerId)
    })

    return (
        <Animatable.View 
        style={styles.searchView(safeArea, isFloating, isTransparent)}
        animation="fadeInDown"
        duration={DURATION}
        >
            <StatusBar 
            backgroundColor={COLORS.primaryOpacity} 
            barStyle={ isTransparent? "light-content" : "dark-content" }
            translucent
            />
            <Text style={[styles.heading(isTransparent)]}>Judul Artikel</Text>
            <LogoRounded style={styles.logo} width={30} height={40} color={isTransparent ? COLORS.sans : COLORS.white} />
        </Animatable.View>
    );
};

const _RenderIcon = () => {
    return (
        <Animatable.View 
        style={styles.iconGroup}
        animation="bounceIn"
        duration={DURATION}
        >
            <View style={{ flexDirection: "row"}}>
                <IconButton 
                    icon="heart-outline"
                    size={20}
                />
                <IconButton
                    icon="share-variant"
                    size={20}
                /> 
            </View>
            <Chip 
            collapsable 
            style={{ marginTop: 5, height: 30 }} 
            icon="account" 
            onPress={() => console.log('Pressed')}
            >Example Chip
            </Chip>
        </Animatable.View>
    )
}

const _RenderImage = ({scroll, props}) => {
    return (
        <View>
            <SharedElement id={`item.${props}.article`}>
                <Animated.Image 
                    source={{ uri: props }}
                    style={styles.image(scroll)}
                />
            </SharedElement>
        </View>
    )
}

const _RenderHTML = () => {
    return (
        <Animatable.View 
        style={{ marginHorizontal: 10 }}
        animation="fadeInUp"
        duration={DURATION + 1000}
        >
            <Title> Judul Artikel </Title>
            <Paragraph style={{ textAlign: "justify" }}>
                {loremText1}
                {loremText2}
                {loremText1}
                {loremText2}
            </Paragraph>
        </Animatable.View>
    )
}

export default function ArticleDetail(props) {
    const dispatch = useDispatch();
    const onLogout = () => dispatch(loginActions.logOut());
    const scrollA = useRef(new Animated.Value(0)).current;
    const { image } = props.route.params;
    console.log(image, "Image")

    const _onScroll = (e) => {
        console.log(scrollA, "scollA")
        
    }

    return (
        <>
        <_RenderHeader scroll={scrollA} />
        <Animated.ScrollView 
        style={styles.containerDetail}
        onScroll={Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: { y: scrollA },
                        useNativeDriver: true
                    },
                    useNativeDriver: true
                }
            ],
            {
                useNativeDriver: true
            }
        )}
        scrollEventThrottle={16}
        >
            <_RenderImage scroll={scrollA} props={image} />
            <_RenderIcon />
            <View style={styles.line} />
            <_RenderHTML />
        </Animated.ScrollView>
        </>
    );
}

ArticleDetail.sharedElements = (navigation, otherNavigation, showing) => {
    const { image } = navigation.params
    return [
        {
            id: `item.${image}.article`
        }
    ];
};