import Types from "../constants/auth";

// actions
export const setUser = (data) => async (dispatch) => {
  dispatch({ type: Types.setUser, payload: data });
};
