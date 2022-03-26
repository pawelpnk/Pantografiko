import React, { useContext, useState } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './menu.css';
import MenuNav from '../menuNav/MenuNav';
import { useMediaQuery } from 'react-responsive';

const Menu: React.FC = (): JSX.Element => {
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  const { token, user } = useContext(StoreContext);

  const isUserLogged: boolean = Boolean(user);
  const isUserProperToken: boolean = Boolean(token);

  const handleOnClickMobile = () => {
    setDisplayMenu(prev => !prev);
  }

  const isMobile: boolean = useMediaQuery({query: '(max-width: 800px)'});
  const displayTextMenuDesktopOrMobile: JSX.Element = isMobile ? <p onClick={handleOnClickMobile}>Menu</p> : <p>Menu</p>;  
  const displayMenuNav: JSX.Element | false = isMobile ? displayMenu && <MenuNav/> : <MenuNav/>;

  const validateUser = (isUserLogged && isUserProperToken) ? 
  (<section className={`menu-style`} >
      {displayTextMenuDesktopOrMobile}
      {displayMenuNav}
  </section>) : null;

  return (
    <>
    {validateUser}
    </>
  )
}

export default Menu;