import {
	TRAVELLER_GET_BY_ID,
	TRAVELLER_GET_ALL,
	TRAVELLER_CREATE,
	TRAVELLER_UPDATE,
	TRAVELLER_DELETE,
	TRAVELLER_LOADING,
	TRAVELLER_CLEAR,
} from '../actions/types';

const initialState = {
	traveller: {},
	travellers: {},
	isSuccess: false,
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case TRAVELLER_LOADING:
			return {
				...state,
				loading: true,
				isSuccess: false,
			};

		case TRAVELLER_GET_BY_ID:
			return {
				...state,
				traveller: action.payload,
				loading: false,
				isSuccess: false,
			};

		case TRAVELLER_GET_ALL:
			return {
				...state,
				travellers: action.payload,
				loading: false,
				isSuccess: false,
			};

		case TRAVELLER_UPDATE:
			return { ...state, traveller: action.payload, isSuccess: true };

		case TRAVELLER_CREATE:
			return { ...state, traveller: action.payload, isSuccess: true };

		case TRAVELLER_DELETE:
			return {
				...state,
				traveller: {},
				isSuccess: false,
			};

		case TRAVELLER_CLEAR:
			return { ...state, traveller: {} };

		default:
			return state;
	}
};
