/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  password: null,
  email: "",
  emailForm: null,
  passwordForm:null,
  loading: false,
  user:{
    user_id: null,
    email: "",
    name: "",
    is_email_validated: null
  },
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      user_id: action.user_id,
      isLoggedIn: true,
      user:{
        ...state.user,
        user_id: action.response.user_id,
        email: action.response.email,
        name: action.response.name,
        is_email_validated: action.response.is_email_validated,
      }
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
      loading: false
    };
  },
  [types.LOG_OUT](state) {
    return {
      ...state,
      isLoggedIn: false,
    };
  },
  [types.SET_USERNAME](state, action){
    return {
      ...state,
      emailForm: action.text
    }
  },
    [types.SET_PASSWORD](state, action) {
    return {
      ...state,
      passwordForm: action.text,
      password: action.text,
    }
  },
  [types.CLEAR_FORM](state, action) {
    return {
      ...state,
      passwordForm: "",
      emailForm: ""
    }
  },
  [types.DISABLE_LOADING](state, action) {
    return {
      ...state,
      loading: false,
    }
  },
});
