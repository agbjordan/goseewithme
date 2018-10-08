import axios from 'axios';

import { SET_CURRENT_USER } from './types';

export const authAdminLogin = userData => {
	return { type: SET_CURRENT_USER, payload: userData };
};
