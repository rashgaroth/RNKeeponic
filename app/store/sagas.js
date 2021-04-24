/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from 'app/features/login/sagas';
import { homeSagas } from 'app/features/home/sagas';
import { getDetailProduct } from 'app/features/productDetail/sagas';

// export default [loginSaga];

export default function* rootSaga() {
  yield all([...loginSagas]);
  yield all([...homeSagas]);
  yield all([...getDetailProduct]);
}
