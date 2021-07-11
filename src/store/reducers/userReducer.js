export const initialState = { loading: true, user: null, error: null };

function userReducer(state, action) {
    console.log(action)
  switch (action.type) {
    case "GET_USER_PENDING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case "GET_USER_FAILED":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;