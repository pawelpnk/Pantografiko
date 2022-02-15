import React, { createContext, useEffect } from 'react';
// import req from '../helpers/request';
import { getCurrentUser } from '../services/auth.service';
import { fetchPageLogin, fetchUserLogin } from '../helpers/saveLocalStorage';

export const StoreContext = createContext<any>(null);

const StoreProvider: React.FC = ({ children }: any): JSX.Element => {
  const [user, setUser] = React.useState<string | object | null>('');
  const [token, setToken] = React.useState<string | object>('');
  const [isLoginPageOpen, setIsLoginPageOpen] = React.useState<boolean>(true);
  // const [inspections, setInspections] = React.useState<any>([]);

  useEffect(() => {
    setUser(() => fetchUserLogin());
    setToken(() => getCurrentUser());
    setIsLoginPageOpen(() => fetchPageLogin());
    // console.log(inspections);
  },[]);

  // useEffect(() => {
  //   fetchInspections();
  //   console.log(inspections);
  // },[]);

  // const fetchInspections = async () => {
  //   let data;
    
  //   data = await req.get("/pages/fetch");
  //   setInspections(data.data);
    
  //   // console.log(data);
  // }

  return (
    <StoreContext.Provider value={{user, setUser, token, setToken, isLoginPageOpen, setIsLoginPageOpen}}>
      {children}
    </StoreContext.Provider>
  )
}

export default StoreProvider;