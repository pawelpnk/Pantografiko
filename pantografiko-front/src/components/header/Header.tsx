import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './Header.css';
import { logout } from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { removeUserID, removeUserLogin, removeUserObject} from '../../helpers/saveLocalStorage';
import HeaderUserMenu from './headerUserMenu/HeaderUserMenu';

const Header: React.FC = (): JSX.Element => {
  const { user, setUser} = useContext(StoreContext);

  const setProperlyLabel: string | null = user ? 'Logout' : null;

  const handleOnButton = (): void => {
    logout();
    setUser(false);
    removeUserLogin();
    removeUserObject();
    removeUserID();
  }

  return (
    <header className='header'>
      <h1>Pantografiko - Twoja aplikacja do zbierania danych!</h1>
      {user && <HeaderUserMenu user={user}/>}
      {user && 
      <Link onClick={handleOnButton} to="/">{setProperlyLabel}</Link>}
    </header>
  );
};

export default Header;