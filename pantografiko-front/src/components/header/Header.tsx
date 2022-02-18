import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './Header.css';
import { logout } from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { removeUserLogin} from '../../helpers/saveLocalStorage';

const Header = () => {
  const { user, setUser} = useContext(StoreContext);

  const setProperlyLabel: string | null = user ? 'Logout' : null;

  const handleOnButton = () => {
    logout();
    setUser(false);
    removeUserLogin();
  }

  return (
    <header className='header'>
      <h1>Pantografiko - Twoja aplikacja do zbierania danych!</h1>
      {user && <p>{user}</p>}
      {user && 
      <Link onClick={handleOnButton} to="/">{setProperlyLabel}</Link>}
    </header>
  );
};

export default Header;