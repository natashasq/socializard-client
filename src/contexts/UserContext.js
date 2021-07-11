import { createContext, useContext, useReducer } from "react";

import userReducer, { initialState } from "store/reducers/userReducer";

export const UserStateContext = createContext({});
export const UserDispatchContext = createContext({});

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);

export const useUserContext = () => [useUserState(), useUserDispatch()];
