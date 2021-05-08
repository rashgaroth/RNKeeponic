/**
 * Redux saga class init
 * There can be multiple sagas
 * Export them as an array
 * Top level sagas in store will take care of combining sagas
 */
import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import registSaga from './registSaga';
import submitRegistration from './submitRegist';
import submitVerification from './submitVerification';
import sendAddress from './sendAddress';

export const registerSagas = [takeEvery(types.GET_ADDRESS, registSaga)];
export const submitRegistrationSagas = [takeEvery(types.SUBMIT_REGISTRATION, submitRegistration)];
export const submitVerificationSagas = [takeEvery(types.SUBMIT_VERIFICATION, submitVerification)];
export const submitAddress = [takeEvery(types.SET_ADDRESS, sendAddress)];
