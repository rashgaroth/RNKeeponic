/**
 *  Redux saga class init
 * Import every feature saga here
 *
 */
import { all } from 'redux-saga/effects';
import { loginSagas } from 'app/features/login/sagas';
import { homeSagas, profileSagas } from 'app/features/home/sagas';
import { getDetailProduct } from 'app/features/productDetail/sagas';
import { registerSagas } from 'app/features/register/sagas';
import { submitRegistrationSagas } from 'app/features/register/sagas';
import { submitVerificationSagas } from 'app/features/register/sagas';

// export default [loginSaga];

export default function* rootSaga() {
  yield all([...loginSagas]);
  yield all([...homeSagas]);
  yield all([...getDetailProduct]);
  yield all([...profileSagas]);
  yield all([...registerSagas]);
  yield all([...submitRegistrationSagas]);
  yield all([...submitVerificationSagas]);
}
