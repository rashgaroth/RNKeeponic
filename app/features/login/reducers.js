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
  password: null,
  email: "",
  emailForm: null,
  passwordForm:null,
  loading: false,
  user:{
    user_id: 0,
    email: "",
    name: "",
    is_email_validated: null,
    token: ""
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
  [types.LOGIN_RESPONSE](state, action) {
    return {
      ...state,
      user_id: action.user_id,
      isLoggedIn: true,
      isNewUser: false,
      isUserRegistered: true,
      isUserAlreadyExplore: true,
      user:{
        ...state.user,
        user_id: action.response.user_id,
        email: action.response.email,
        name: action.response.name,
        is_email_validated: action.response.is_email_validated,
      }
    };
  },
  [types.LOGIN_GOOGLE_AUTH_SUCCESS](state, action) {
    return {
      ...state,
      user_id: action.data.user.user_id,
      isLoggedIn: true,
      isNewUser: false,
      isUserRegistered: true,
      isUserAlreadyExplore: true,
      user: {
        ...state.user,
        user_id: action.data.user.user_id,
        email: action.data.user.email,
        name: action.data.user.name,
        is_email_validated: action.data.user.is_email_validated,
        token: action.data.token
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
      isLoggedIn: false,
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
  [types.SET_NEW_USER](state, action) {
    return {
      ...state,
      isNewUser: action.data
    }
  },
  [types.SET_USER_REGISTERED](state, action) {
    return {
      ...state,
      isUserRegistered: action.data
    }
  },
  [types.SET_EXPLORE](state, action) {
    return {
      ...state,
      isLoggedIn: true
    }
  },
  [types.SET_USER_ALREADY_EXPLORED](state, action) {
    return {
      ...state,
      isUserAlreadyExplore: action.data,
      isUserRegistered: false,
      user: {
        ...state.user,
        user_id: null,
        email: "",
        name: "",
        is_email_validated: null,
        token: ""
      },
    }
  },
});
