/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import loginSaga from './loginSaga';
import loginGoogle from './loginGoogle'

// export const loginSagas = [takeEvery(types.LOGIN_REQUEST, loginSaga)];
export const loginGoogleSagas = [takeEvery(types.LOGIN_GOOGLE_AUTH, loginGoogle)];
