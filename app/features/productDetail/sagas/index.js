import { takeEvery } from 'redux-saga/effects';
import * as types from '../types';
import getProductDetail from './detailProductSagas';

export const getDetailProduct = [takeEvery(types.GET_DETAIL_PRODUCT, getProductDetail)];