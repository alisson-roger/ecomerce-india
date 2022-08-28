import React, { createContext, useEffect, useReducer } from 'react';
import { supabase } from '../utils/supabaseClient';

const initialState = {
  isModalOpen: false,
  formType: 'login',
  session: null,
};

export const AuthContext = createContext(initialState);

const authReducer = (state, action) => {
  switch (action.type) {
    case 'OPEN_AUTH_MODAL':
      return { ...state, formType: action.formType, isModalOpen: true };
    case 'CLOSE_AUTH_MODAL':
      return { ...state, isModalOpen: false };
    case 'LOGIN':
      return { ...state, session: action.session };
    case 'LOGOUT':
      return { ...state, session: null };
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      dispatch({ type: 'LOGIN', session });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
