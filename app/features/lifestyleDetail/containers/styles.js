import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';
import { height, width } from '../../../utils/theme';

const smallSize = width / 5;
const itemWidth = width * .67;
const itemHeight = height / 2 - 29 * 2;
const imageHeight = 400
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyItem: {
    overflow: 'hidden',
    height: itemHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 20,
    borderColor: 'white',
    width: itemWidth,
    backgroundColor: 'transparent',
    // borderRadius: 10,
  },
  heading: (isTransparent) => ({
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: isTransparent ? COLORS.sans : COLORS.white,
  }),
  searchView: (safeArea, isFloating, isTransparent) => ({
    backgroundColor: isTransparent ? "#0000" : COLORS.sans,
    height: 50 + safeArea.top,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOffset: {y: 0},
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    paddingHorizontal: 10,
    zIndex: 100,
    marginBottom: isFloating ? -50 - safeArea.top : 0
  }),
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
    alignSelf: 'flex-start',
  },
  logo: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  containerDetail: {
    backgroundColor: COLORS.white,
    flex: 1,
    zIndex: 0,
  },
  image: scrollA => ({
    width: width,
    height: imageHeight,
    transform: [
    // {
    //   translateY: scrollA.interpolate({
    //     inputRange: [-imageHeight, 0, imageHeight, imageHeight + 1],
    //     outputRange: [-imageHeight / 2, 0, imageHeight * 0.75, imageHeight * 0.75]
    //   })
    // },
    {
      scale: scrollA.interpolate({
        inputRange: [-imageHeight - 30, 0, imageHeight, imageHeight + 1],
        outputRange: [2, 1, 0.5, 0.5]
      })
    }
  ]
  }),
  iconGroup: {
    flexDirection: 'row',
    // alignSelf: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  line: {
    height: 1,
    width: 400,
    backgroundColor: COLORS.colorC4,
    marginHorizontal: 20,
    alignSelf: 'center'
  }
});

export default styles;
