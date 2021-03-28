import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  dividerRight: {
    alignSelf: 'flex-end',
    marginTop: -70,
    opacity: 0.7
  },
  dividerLeft: {
    alignSelf: 'flex-start',
    opacity: 0.7
  },
  login: {
    backgroundColor: COLORS.white
  },
  input:{
    // padding: 20,
    marginHorizontal: 30,
    alignSelf: 'auto',
    bottom: 30
  },
  logo:{
    alignSelf: 'center',
    bottom:70
  },
  textRegistration: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 40
  },
  text:{
    fontSize: 18,
    opacity: 0.7,
  },
  textRegist: {
    fontSize: 18,
    opacity: 0.7,
    alignSelf: 'center',
    color: COLORS.blue,
    borderBottomColor: COLORS.blue,
    borderBottomWidth: 0.5
  }
});

export default styles;
