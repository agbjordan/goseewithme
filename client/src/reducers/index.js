import { combineReducers } from 'redux';

import admin from './adminReducer';
import auth from './authReducer';
import errors from './errorReducer';
import traveller from './travellerReducer';

export default combineReducers({
	auth: auth,
	admin: admin,
	traveller: traveller,
	errors: errors,
});
