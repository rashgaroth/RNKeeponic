import { Dimensions } from "react-native"

export const { width, height } = Dimensions.get('window');
export const widthScreen = Dimensions.get('screen').width;
export const heightScreen = Dimensions.get('screen').height;
export const ITEM_WIDTH = width * 0.6;
export const SPACING = 16;
export const ICON_SIZE = 56