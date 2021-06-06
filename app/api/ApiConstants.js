/* App config for apis
 */

// const API_BASE_URL = 'http://192.168.0.107:3000/';
// const API_BASE_URL = 'http://keeponicbackend-env.eba-3c3aqnef.ap-southeast-1.elasticbeanstalk.com/';
const API_BASE_URL = 'https://d1f31mzn1ab53p.cloudfront.net/';

const API_ENDPOINT = {
  // login
  LOGIN: 'mobilelogin',
  TRACKING: 'tracking',
  GOOGLE_LOGIN: 'client/user/login/oauth2',
  // register
  REGISTER: 'client/user/registration',
  SELLER_REGISTER: 'client/seller/registration',
  // dapat digunakan untuk mendapatkan pagination atau detail, atau tidak dengan pagin
  GET_PRODUCT: 'client/product',
  GET_PRODUCT_DETAIL: 'client/product/findOne',
  GET_PROFILE: 'client/user',
  GET_PROFILE_ADDRESS: 'client/user/address',
  GET_ALL_ADDRESS: 'client/address/all',
  WISHLIST: 'client/product',
  ORDER: 'client/product/order_list',
};

const API = {
  BASE_URL: API_BASE_URL,
  ENDPOINT: API_ENDPOINT
}

export default API;