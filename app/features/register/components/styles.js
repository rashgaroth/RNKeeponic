import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white
    },
    form: {
        marginHorizontal: 20,
        alignSelf: 'auto',
    },
    input: {
        marginTop: 15
    },
    inputTitle: {
        fontWeight: "bold",
        bottom: 0,
        top: 15
        // marginLeft: 10
    },
    terms: {
        marginLeft: 10,
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panel: {
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
    },
    panelTitle: {
        fontSize: 20,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    buttonGroup: {
        margin: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 15,
        width: 200,
        color: COLORS.white,
    }
});

export default styles;
