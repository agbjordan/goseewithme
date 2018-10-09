import isEmpty from '../validation/is_Empty';
import { SET_CURRENT_USER, SET_CURRENT_ADMIN } from '../actions/types';

const initialState = {
	userIsAuthenticated: false,
	adminIsAuthenticated: false,
	user: {},
	administrator: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				userIsAuthenticated: !isEmpty(action.payload),
				user: action.payload,
			};

		case SET_CURRENT_ADMIN:
			return {
				...state,
				adminIsAuthenticated: !isEmpty(action.payload),
				administrator: action.payload,
			};

		default:
			return state;
	}
};
