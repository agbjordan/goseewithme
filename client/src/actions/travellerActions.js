import axios from 'axios';
import { push } from 'connected-react-router';

import {
	TRAVELLER_GET_BY_ID,
	TRAVELLER_GET_ALL,
	TRAVELLER_CREATE,
	TRAVELLER_UPDATE,
	TRAVELLER_DELETE,
	TRAVELLER_LOADING,
	TRAVELLER_CLEAR,
	GET_ERRORS,
} from './types';

export const travellerLoading = () => dispatch => {
	dispatch({ type: TRAVELLER_LOADING, payload: true });
};

export const travellerGetById = travellerData => dispatch => {
	travellerLoading();

	axios
		.get(`/api/travellers/get/${travellerData}`)
		.then(res => {
			dispatch({
				type: TRAVELLER_GET_BY_ID,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const travellerGetAll = () => dispatch => {
	dispatch(travellerLoading());

	axios
		.get(`/api/travellers/`)
		.then(res => {
			dispatch({
				type: TRAVELLER_GET_ALL,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const travellerDelete = travellerData => dispatch => {
	dispatch(travellerLoading());

	axios
		.delete(`/api/travellers/${travellerData}`)
		.then(res => {
			dispatch({
				type: TRAVELLER_DELETE,
				payload: res.data,
			});
		})
		.then(res => {
			dispatch(travellerGetAll());
		})
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			});
		});
};

export const travellerRegister = travellerData => dispatch => {
	axios
		.post('/api/travellers/register', travellerData)
		.then(res => {
			dispatch({
				type: TRAVELLER_CREATE,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const travellerUpdate = travellerData => dispatch => {
	axios
		.post('/api/travellers/update', travellerData)
		.then(res =>
			dispatch({
				type: TRAVELLER_UPDATE,
				payload: res.data,
			})
		)
		.catch(err =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			})
		);
};

export const redirect = value => dispatch => {
	dispatch(push(value));
};

export const travellerClear = () => dispatch => {
	dispatch({ type: TRAVELLER_CLEAR });
};
