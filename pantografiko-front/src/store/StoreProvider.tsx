import React, { createContext, useEffect } from 'react';
import { getCurrentUser } from '../services/auth.service';
import { fetchUserID, fetchUserLogin, fetchUserObject } from '../helpers/saveLocalStorage';

export const StoreContext = createContext<any>(null);

interface IUserResponse {
  login: string;
  email: string;
  role: string;
}

const StoreProvider: React.FC = ({ children }: any): JSX.Element => {
  const [user, setUser] = React.useState<string| null>('');
  const [token, setToken] = React.useState<string>('');
  const [userObject, setUserObject] = React.useState<IUserResponse>({
    login: '',
    email: '',
    role: ''
  });
  const [userID, setUserID] = React.useState<string>('');
  const [openModal, setOpenModal] = React.useState<number>(0);

  useEffect(() => {
    setUser(() => fetchUserLogin());
    setToken(() => getCurrentUser());
    setUserObject(()=> fetchUserObject());
    setUserID(()=> fetchUserID());
  },[]);

  return (
    <StoreContext.Provider value={{user, setUser, token, setToken, userObject, setUserObject, userID, setUserID, openModal, setOpenModal}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;