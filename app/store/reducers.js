/*
 * combines all th existing reducers
 */
import * as loginReducer from 'app/features/login/reducers';
import * as homeReducer from 'app/features/home/reducers';
import * as detailProductReducer from 'app/features/productDetail/reducers';
import * as registerReducer from 'app/features/register/reducers';
export default Object.assign({}, loginReducer, homeReducer, detailProductReducer, registerReducer);
