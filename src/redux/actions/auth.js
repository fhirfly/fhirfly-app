import Types from "../constants/auth";

// actions
export const setUser = (data) => async (dispatch) => {
  dispatch({ type: Types.setUser, payload: data });
};

export const setActiveBenefit = (data) => async (dispatch) => {
  dispatch({ type: Types.SET_ACTIVE_BENEFIT, payload: data });
};
