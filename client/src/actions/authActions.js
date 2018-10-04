import { SET_CURRENT_USER } from "./types";

export const registerUser = userData => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  };
};

export const registerAdmin = adminData => {
  return {
    type: SET_CURRENT_Admin,
    payload: adminData
  };
};
