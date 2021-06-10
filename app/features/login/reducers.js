/* Login Reducer
 * handles login states in the app
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
  isLoggedIn: false,
  isNewUser: true,
  isUserRegistered: false,
  isUserAlreadyExplore: false,
  isUserLoggedIn: false,
  password: null,
  email: "",
  emailForm: null,
  passwordForm: null,
  loading: false,
  user:{
    user_id: 0,
    email: "",
    name: "",
    is_email_validated: null,
    token: "",
    phone: "",
    is_admin: null
  },
  isRegistrant: false
};

export const loginReducer = createReducer(initialState, {
  [types.LOGIN_REQUEST](state, action) {
    return {
      ...state,
      loading: true,
    };
  },
  [types.SET_USER_PHONE_UPDATED](state, action) {
    return {
      ...state,
      user: {
        ...state.user,
        phone: action.data,
      },
    };
  },
  // [types.LOGIN_RESPONSE](state, action) {
  //   return {
  //     ...state,
  //     user_id: action.user_id,
  //     isLoggedIn: true,
  //     isNewUser: false,
  //     isUserRegistered: true,
  //     isUserAlreadyExplore: true,
  //     user:{
  //       ...state.user,
  //       user_id: action.response.user_id,
  //       email: action.response.email,
  //       name: action.response.name,
  //       is_email_validated: action.response.is_email_validated,
  //     }
  //   };
  // },
  [types.LOGIN_GOOGLE_AUTH_SUCCESS](state, action) {
    return {
      ...state,
      isLoggedIn: true,
      isNewUser: false,
      isUserLoggedIn:true,
      isUserRegistered: true,
      isUserAlreadyExplore: true,
      user: {
        ...state.user,
        user_id: action.data.user_id,
        email: action.data.email,
        name: action.data.name,
        is_email_validated: action.data.is_email_validated,
        phone: action.data.phone,
        is_admin: action.data.is_admin
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
      user: {
        ...state.user,
        user_id: 0,
        email: "",
        name: "",
        is_email_validated: null,
        token: ""
      },
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
      password: null,
      email: "",
      emailForm: null,
      passwordForm: null,
      loading: false,
      user: {
        ...state.user,
        user_id: null,
        email: "",
        name: "",
        is_email_validated: null,
        token: ""
      },
      isRegistrant: false
    }
  },
  [types.DISABLE_LOADING](state, action) {
    return {
      ...state,
      loading: false,
    }
  },
  [types.LOGIN_FROM_REGISTER](state, action) {
    return {
      ...state,
      isRegistrant: true,
    }
  },
  [types.SET_TOKEN](state, action) {
    return {
      ...state,
      user:{
        ...state.user,
        token: action.data
      }
    }
  },
});
