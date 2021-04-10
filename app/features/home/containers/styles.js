import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchView:{
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
  menuButton:{
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 35,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginRight: 15
  },
  textMenuButton:{
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.blackSans,
    left: 10,
    marginTop: 20
  },
  dividerMenuButton:{
    backgroundColor: COLORS.sans,
    left: 10,
    marginTop: 20
  },
  iconMenuButton:{
    position: 'absolute',
    bottom: -3,
    left: 7,
  },
  textMenuButtonInside:{
    position: 'absolute',
    alignSelf: "flex-end",
    textAlign: "center",
    top: 85,
    color: COLORS.fontColor,
  }
});

export default styles;
