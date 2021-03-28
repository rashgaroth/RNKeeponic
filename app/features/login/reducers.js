/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  user_id: null,
  email: null,
  password: null,
  name: "",
  is_email_validated: null,
  emailForm: null,
  passwordForm:null,
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
    };
  },
  [types.LOGIN_LOADING_ENDED](state) {
    return { ...state };
  },
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      user_id: action.user_id,
      isLoggedIn: true,
      email: action.email,
      is_email_validated: action.is_email_validated
    };
  },
  [types.LOGIN_FAILED](state) {
    return {
      ...state,
      isLoggedIn: false,
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
});
