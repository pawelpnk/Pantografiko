import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './Header.css';
import { logout } from '../../services/auth.service';
import { Link } from 'react-router-dom';
import { removeUserID, removeUserLogin, removeUserObject} from '../../helpers/saveLocalStorage';
import HeaderUserMenu from './headerUserMenu/HeaderUserMenu';
import { useMediaQuery } from 'react-responsive';

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

  const isMobile = useMediaQuery({query: '(min-width: 600px)'});
  const textHeader = isMobile ? 'Pantografiko - Twoja aplikacka do zbierania danych!' : "Pantografiko";

  return (
    <header className='header'>
      <h1>{textHeader}</h1>
      {user && <HeaderUserMenu user={user}/>}
      {user && 
      <Link onClick={handleOnButton} to="/">{setProperlyLabel}</Link>}
    </header>
  );
};

export default Header;