import Types from "../constants/auth";
import _ from "lodash";

var defaultState = {
  user: {},
};

var authReducer = (state = defaultState, action) => {
  switch (action.type) {
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
