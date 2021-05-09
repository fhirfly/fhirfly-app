import { combineReducers } from "redux";
import Auth from "./auth";
var reducers = combineReducers({
  auth: Auth,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = {};
  }

  return reducers(state, action);
};

export default rootReducer;
