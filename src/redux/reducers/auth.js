import Types from "../constants/auth";
import _ from "lodash";

var defaultState = {
  user: {},
  activeBenefit: {},
};

var authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.SET_ACTIVE_BENEFIT: {
      let newState = Object.assign({}, state);
      newState.activeBenefit = action.payload;
      return newState;
    }

    case Types.setUser: {
      let newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
export default authReducer;
