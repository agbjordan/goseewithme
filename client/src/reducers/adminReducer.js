import {
  ADMIN_GET_BY_ID,
  ADMIN_GET_ALL,
  ADMIN_CREATE,
  ADMIN_UPDATE,
  ADMIN_DELETE,
  ADMIN_LOADING,
  ADMIN_CLEAR
} from "../actions/types";

const initialState = {
  admin: {},
  admins: {},
  isSuccess: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true,
        isSuccess: false
      };

    case ADMIN_GET_BY_ID:
      return {
        ...state,
        admin: action.payload,
        loading: false,
        isSuccess: false
      };

    case ADMIN_GET_ALL:
      return {
        ...state,
        admins: action.payload,
        loading: false,
        isSuccess: false
      };

    case ADMIN_UPDATE:
      return {
        ...state,
        admin: action.payload,
        isSuccess: true
      };

    case ADMIN_CREATE:
      return {
        ...state,
        admin: action.payload,
        isSuccess: true
      };

    case ADMIN_DELETE:
      return {
        ...state,
        admin: {},
        admins: {},
        isSuccess: true
      };

    case ADMIN_CLEAR:
      return {
        ...state,
        admin: {}
      };

    default:
      return state;
  }
};
