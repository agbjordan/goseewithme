import { SET_CURRENT_USER, SET_CURRENT_ADMIN } from "./types";

const initialState = {
  isAuthenticated: false,
  user: {},
  admin: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload
      };

    case SET_CURRENT_ADMIN:
      return {
        ...state,
        admin: action.payload
      };

    default:
      return state;
  }
};
