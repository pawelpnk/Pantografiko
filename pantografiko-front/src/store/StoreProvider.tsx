import React, { createContext, useEffect } from 'react';
import { getCurrentUser } from '../services/auth.service';
import { fetchUserLogin } from '../helpers/saveLocalStorage';

export const StoreContext = createContext<any>(null);

const StoreProvider: React.FC = ({ children }: any): JSX.Element => {
  const [user, setUser] = React.useState<string | object | null>('');
  const [token, setToken] = React.useState<string | object>('');

  useEffect(() => {
    setUser(() => fetchUserLogin());
    setToken(() => getCurrentUser());
  },[]);

  return (
    <StoreContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;