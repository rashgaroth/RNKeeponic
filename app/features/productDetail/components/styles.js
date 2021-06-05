import { StyleSheet } from 'react-native';
import { COLORS } from "../../../utils/colors";
import { width, height, heightScreen } from "../../../utils/theme";

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },
    header: {
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        width: width - 32
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        height: height,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: 'white'
    },
    content_inner: {
        flex: 1,
        paddingTop: 50
    },
    separator: {
        marginTop: 5,
        height: 1,
        backgroundColor: '#e6e4eb'
    },
    image_placeholder_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-50%'
    },
    image_placeholder: {
        width: 150,
        height: 113,
        alignSelf: 'center'
    },
    image_placeholder_text: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    search_item: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        marginLeft: 16
    },
    item_icon: {
        marginRight: 15
    },
    container: {
        backgroundColor: COLORS.white,
        height: heightScreen,
        zIndex: 0,
        paddingTop: 50,
    },
    wrapper: {

    },
    input: {
        // flex: 1,
        height: 40,
        // width: 270,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        justifyContent: 'center',
        marginBottom: 10
        // fontSize: 15
    },
    containerInput: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.primaryOpacity,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 60,
        elevation: 4,
        zIndex: 100
    },
    onFocusContainer: {
        // flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
        opacity: 0.5
    },
    onFocusItem: {
        backgroundColor: COLORS.sans,
        padding: 10,
        opacity: 0.5,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    imagePetani: {
        alignContent: "center",
        alignSelf: "center",
        marginTop: 10
    },
    price: {
        margin: 10,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
    },
    chip: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
    },
    priceText: {
        fontWeight: "bold",
        fontSize: 25
    },
    lineProducts: {
        height: 1,
        backgroundColor: COLORS.colorC4,
        marginHorizontal: 20,
        marginTop: 10
    },
    productDescription: {
        margin: 10
    },
    row: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginLeft: 10,
        marginTop: 10
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
        width: width,
        flex: 1
    },
    containerSticky: {
        position: 'absolute',
        // opacity: 0.5,
        bottom: 0,
        left: 0,
        right: 0,
        // marginHorizontal: 20,
        backgroundColor: COLORS.white,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonSticky: {
        height: 35,
        // width: Dimensions.get('screen').width - 150,
        justifyContent: "center",
        marginHorizontal: 10,
        alignSelf: "flex-end",
        marginBottom: 10
    },
    textLebihHemat: {
        fontSize: 13,
        color: COLORS.fontColor,
        left: 10
    }
});

export default styles;
