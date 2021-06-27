/*
 * combines all th existing reducers
 */
import * as loginReducer from '../features/login/reducers';
import * as homeReducer from '../features/home/reducers';
import * as detailProductReducer from '../features/productDetail/reducers';
import * as registerReducer from '../features/register/reducers';
import * as orderReducer from '../features/order/reducers';

export default Object.assign({}, loginReducer, homeReducer, detailProductReducer, registerReducer, orderReducer);
