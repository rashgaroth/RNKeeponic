import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

const ToastMessage = ({ title, text, type, visible }) => {

    useEffect(() =>{
        if(visible){
            Toast.show({
                type: type,
                position: 'bottom',
                text1: title,
                text2: text,
                visibilityTime: 4000,
                autoHide: true,
                topOffset: 30,
                bottomOffset: 40,
            })
        }
    }, [null])

    return (
        <Toast ref={(ref) => Toast.setRef(ref)} />
    )
}

export default ToastMessage;
