import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removeToken(){
    try {
        await AsyncStorage.removeItem('TOKEN')
    } catch (error) {
        setTimeout(() => {
            Alert.alert('Error Token', error.message);
        }, 200);
    }
}

export async function removeAllItems(){
    try {
        await AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then((e) => console.log("Cannot Remove Item Because : ", e));
    } catch (error) {
        setTimeout(() => {
            Alert.alert('Error Storage', error.message);
        }, 200);
    }
}

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

export async function getStore(key){
    try {
        var data = await AsyncStorage.getItem(key)
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function storeData(key, data){
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
        setTimeout(() => {
            Alert.alert('Error Token', error.message);
        }, 200);
    }
}