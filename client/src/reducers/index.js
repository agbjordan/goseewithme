import { combineReducers } from "redux";

import admin from "./adminReducer";
import auth from "./authReducer";
import errors from "./errorReducer";

export default combineReducers({
  auth: auth,
  admin: admin,
  errors: errors
});
