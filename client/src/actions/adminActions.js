import axios from "axios";
import { push } from "connected-react-router";

import {
  ADMIN_GET_BY_ID,
  ADMIN_GET_ALL,
  ADMIN_CREATE,
  ADMIN_UPDATE,
  ADMIN_DELETE,
  ADMIN_LOADING,
  ADMIN_CLEAR,
  GET_ERRORS
} from "./types";

export const adminGetById = adminData => dispatch => {
  dispatch({
    type: ADMIN_LOADING,
    payload: true
  });

  axios
    .get(`/api/administrators/get/${adminData}`)
    .then(res => {
      dispatch({
        type: ADMIN_GET_BY_ID,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const adminDelete = adminData => dispatch => {
  axios
    .delete(`/api/administrators/delete/${adminData}`)
    .then(res => {
      dispatch({
        type: ADMIN_DELETE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const adminGetAll = () => dispatch => {
  dispatch({
    type: ADMIN_LOADING,
    payload: true
  });

  axios
    .get(`/api/administrators/get`)
    .then(res =>
      dispatch({
        type: ADMIN_GET_ALL,
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

export const adminRegister = adminData => dispatch => {
  axios
    .post("/api/administrators/register", adminData)
    .then(res => {
      dispatch({
        type: ADMIN_CREATE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const adminUpdate = adminData => dispatch => {
  axios
    .post("/api/administrators/update", adminData)
    .then(res =>
      dispatch({
        type: ADMIN_UPDATE,
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

export const redirect = value => dispatch => {
  dispatch(push(value));
};

export const adminClear = () => dispatch => {
  dispatch({
    type: ADMIN_CLEAR
  });
};
