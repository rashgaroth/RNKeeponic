import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getToken() {
    try {
        var token = await AsyncStorage.getItem('TOKEN')
        return JSON.parse(token)
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function setToken(token) {
    try {
        await AsyncStorage.setItem('TOKEN', JSON.stringify(token))
    } catch (error) {
        setTimeout(() => {
            Alert.alert('Error Token', error.message);
        }, 200);
    }
}