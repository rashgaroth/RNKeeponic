import React, {useState, useEffect} from "react";
import { BackHandler } from "react-native";
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from "react-redux";
import { goBack, navigate } from "../../../navigation/NavigationService";
import { height, width } from "../../../utils/theme";
import * as orderActions from "../actions";
import { KpnDialog } from "../../../components";

export default function OrderDetailWebview(props){
    const { params } = props.route
    const dispatch = useDispatch();

    const [url, setUrl] = useState(params.url)
    const [productId, setProductId] = useState(params.productId)
    const [dialogVisible, setDialogVisible] = useState(false)

    const onNavChange = async (e) => {
        console.log(e.url, e, "event")
        const navFinish = "finish";
        if(productId){
            if (e.title === navFinish) {
                navigate("OrderSuccess", 
                { 
                    productName: params.productName, 
                    marketName: params.marketName, 
                    avatar: params.avatar,
                    invoiceId: params.invoiceId,
                })
                await dispatch(orderActions.updateProduct(productId))
            }
        }
    }

    useEffect(() => {
        console.log("hit use Effect!")
        const backAction = () => {
            setDialogVisible(true)
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [null])

    const onPositive = () => {
        goBack()
        setDialogVisible(false)
    }

    const onNegative = () => {
        setDialogVisible(false)
    }

    console.log(url, productId, "ID")

    return (
        <>
            <WebView
                source={{ uri: url }}
                onNavigationStateChange={(e) => onNavChange(e)}
            />
            <KpnDialog
                key={`@a$`}
                negativeButtonText={"Tidak"}
                positiveButtonText={"Ya"}
                title="Pembatalan Chekout"
                onBackDropPressed={() => setDialogVisible(false)}
                visible={dialogVisible}
                text={"Batalkan Pembelian ?"}
                onPositive={() => onPositive()}
                onNegative={() => onNegative()}
            />
        </>
    )
}