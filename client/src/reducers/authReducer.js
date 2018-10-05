import {
  SET_CURRENT_USER,
  SET_CURRENT_ADMIN,
  CREATE_ADMIN,
  CLEAR_CREATE_ADMIN
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  userCurrent: {},
  userCreated: {},
  adminCurrent: {},
  adminCreated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        userCurrent: action.payload
      };

    case SET_CURRENT_ADMIN:
      return {
        ...state,
        adminCurrent: action.payload
      };

    case CREATE_ADMIN:
      return {
        ...state,
        adminCreated: true
      };

    case CLEAR_CREATE_ADMIN:
      return {
        ...state,
        adminCreated: false
      };

    default:
      return state;
  }
};
