import axios from "axios";

import {
  SET_CURRENT_USER,
  CREATE_ADMIN,
  CLEAR_CREATE_ADMIN,
  GET_ERRORS
} from "./types";

export const registerUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

export const clearCreateAdmin = () => dispatch => {
  dispatch({
    type: CLEAR_CREATE_ADMIN,
    payload: {}
  });
};

export const registerAdmin = adminData => dispatch => {
  axios
    .post("/api/administrators/register", adminData)
    .then(res =>
      dispatch({
        type: CREATE_ADMIN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
