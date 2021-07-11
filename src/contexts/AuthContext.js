import { createContext, useContext, useReducer } from 'react';

import authReducer, { initialState } from 'store/reducers/authReducer';

export const AuthStateContext = createContext({});
export const AuthDispatchContext = createContext({});

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);

export const useAuthContext = () => [useAuthState(), useAuthDispatch()];