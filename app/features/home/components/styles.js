import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';
import { width, heightScreen } from '../../../utils/theme';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        zIndex: 0,
        height: heightScreen,
        paddingTop: 60,
        // marginTop: 60,
    },
    searchView: {
        backgroundColor: COLORS.sans,
        height: 50
    },
    address: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.white,
        left: 10,
        top: 20
    },
    buttonDown: {
        color: COLORS.white,
        position: 'absolute',
        width: 20,
        left: 120,
        top: 17
    },
    logo: {
        alignSelf: 'flex-end',
        marginRight: 10,
        bottom: 20,
    },
    menuButton: {
        // flex: 1,
        flexWrap: 'wrap',
        paddingBottom: 35,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginRight: 15
    },
    textMenuButton: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.blackSans,
        left: 10,
        marginTop: 20
    },
    dividerMenuButton: {
        backgroundColor: COLORS.sans,
        left: 10,
        marginTop: 20
    },
    iconMenuButton: {
        position: 'absolute',
        bottom: -3,
        left: 7,
    },
    textMenuButtonInside: {
        position: 'absolute',
        alignSelf: "flex-end",
        top: 85,
        color: COLORS.fontColor,
    },
    textMenuHidroponik: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textLihatSemua: {
        fontSize: 13,
        color: COLORS.primaryColor,
        right: 10
    },
    textPaketHidroponik: {
        fontWeight: "bold",
        fontSize: 18,
        color: COLORS.blackSans,
        left: 10,
    },
    textLebihHemat: {
        fontSize: 13,
        color: COLORS.fontColor,
        left: 10
    },
    cardProducts: {
        left: 10,
        marginTop: 20
    },
    cardLifestyle: {
        flexWrap: 'nowrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginTop: 20,
    },
    cardLifestyle1: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // marginTop: 20,
    },
    cardLifestyle2: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginRight: 10
        // marginTop: 20,
    },
    wideCards: {
        flex: 1,
    },
    skeleton: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // marginRight: 15
    },
    skeletonChild: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginRight: 15
    },
    otherProducts: {
        marginTop: 10,
        marginHorizontal: 10,
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        width,
        flex: 1
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 16,
    },

    wrapper: {},

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },
    containerInput: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.sans,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 60,
        elevation: 4,
        zIndex: 100,
        flex: 1
    },
    input: {
        // flex: 1,
        height: 40,
        // width: 300,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        paddingLeft: 20
        // fontSize: 15
    },
    containerView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
    }
});

export default styles;
