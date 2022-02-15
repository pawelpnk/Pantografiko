import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './Header.css';
import { logout } from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { removeUserLogin, statePageLogin } from '../../helpers/saveLocalStorage';

const Header = () => {
  const { user, setUser, setIsLoginPageOpen } = useContext(StoreContext);

  const setProperlyLabel: string | null = user ? 'Logout' : null;

  const handleOnButton = () => {
    logout();
    setUser(false);
    setIsLoginPageOpen(true);
    removeUserLogin();
    statePageLogin(true);
  }

  return (
    <header className='header'>
      <h1>Pantografiko - Twoja aplikacja do zbierania danych!</h1>
      {user && <p>{user}</p>}
      {user && 
      <button onClick={handleOnButton}><Link to="/">{setProperlyLabel}</Link></button>}
    </header>
  );
};

export default Header;