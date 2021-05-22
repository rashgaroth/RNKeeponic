import Toast, { BaseToast } from 'react-native-toast-message';
import { View, Text } from 'react-native';

const toastConfig = {
    success: ({ text1, props, ...rest }) => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
            text1={text1}
            text2={props.uuid}
        />
    ),

    my_custom_type: ({ text1, props, ...rest }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
        </View>
    )
};