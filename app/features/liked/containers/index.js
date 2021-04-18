import React from 'react';
import { View, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import * as loginActions from 'app/features/login/actions';
import styles from './styles';

import { COLORS } from "../../../utils/colors";

export default function Liked() {
  const dispatch = useDispatch();
  const onLogout = () => dispatch(loginActions.logOut());

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryOpacity} />
      <Button icon="logout" mode="outlined" onPress={onLogout}>
        Logout
      </Button>
    </View>
  );
}
