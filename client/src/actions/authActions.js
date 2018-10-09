import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { push } from 'connected-react-router';

//components
import setAuthToken from '../utils/setAuthToken';

import { SET_CURRENT_USER, SET_CURRENT_ADMIN, GET_ERRORS } from './types';

export const userLogin = userData => dispatch => {
	axios
		.post('/api/user/login', userData)
		.then(res => {
			//SAVE TO LOCAL STORAGE
			const { tokenUser } = res.data;
			localStorage.setItem('goseewithmeUser', tokenUser);
			setAuthToken(tokenUser);

			//DECODE TOKEN
			const tokenUserDecoded = jwt_decode(tokenUser);

			//SET CURRENT USER
			dispatch(setCurrentAdmin(tokenUserDecoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const adminLogin = userData => dispatch => {
	axios
		.post('/api/administrators/login', userData)
		.then(res => {
			//SAVE TO LOCAL STORAGE
			const { token } = res.data;
			localStorage.setItem('goseewithmeAdmin', token);
			setAuthToken(token);

			//DECODE TOKEN
			const tokenDecoded = jwt_decode(token);

			//SET CURRENT USER
			dispatch(setCurrentAdmin(tokenDecoded));
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const adminLogout = () => dispatch => {
	//DELETE TOKEN
	localStorage.removeItem('goseewithmeAdmin');
	//RESET AUTH STATE
	setAuthToken(false);
	//DISPATCH
	dispatch(setCurrentAdmin({}));
};

////setCurrentUser
export const setCurrentUser = decoded => dispatch => {
	dispatch({
		type: SET_CURRENT_USER,
		payload: decoded,
	});
};

////setCurrentAdmin
export const setCurrentAdmin = decoded => dispatch => {
	dispatch({
		type: SET_CURRENT_ADMIN,
		payload: decoded,
	});
};

//redirect
export const redirect = value => dispatch => {
	dispatch(push(value));
};

//get current admin
export const establishCurrentAdmin = () => dispatch =>
	new Promise(resolve => {
		let AdminToken = '';
		if (localStorage.goseewithmeAdmin) {
			setAuthToken(localStorage.goseewithmeAdmin);
			AdminToken = jwt_decode(localStorage.goseewithmeAdmin);
		}

		if (AdminToken.length !== '') {
			dispatch(setCurrentAdmin(AdminToken));
			resolve(AdminToken);
		} else {
			resolve({});
		}
	});
