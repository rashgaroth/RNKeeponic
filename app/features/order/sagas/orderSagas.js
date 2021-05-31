/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as homeAction from '../actions';

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IProductDetail } from "../../interfaces";

export default function* getLists(state) {
    try {
       
    } catch (error) {
        
    }
}