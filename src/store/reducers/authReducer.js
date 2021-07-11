import { removeAuth, setAuth } from "utils/auth";

export const initialState = { loading: true, auth: false, error: null };

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "AUTH_SUCCESS":
      setAuth();
      return {
        ...state,
        loading: false,
        auth: true,
        error: null,
      };
    case "AUTH_FAILED":
      removeAuth();
      return {
        ...state,
        loading: false,
        auth: false,
        error: action.payload,
      };
    case "REFRESH_AUTH":
      return {
        ...state,
        auth: true,
      };
    case "LOGOUT":
      removeAuth();
      return {
        ...state,
        auth: false,
      };
    default:
      return state;
  }
}

export default authReducer;
