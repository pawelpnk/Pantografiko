import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './menu.css';
import MenuNav from '../menuNav/MenuNav';

const Menu = () => {

  const { token, user, isLoginPageOpen } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isUserProperToken = Boolean(token);
  const startPageIsOpen = Boolean(isLoginPageOpen);

  const validateUser = (isUserLogged && isUserProperToken && !startPageIsOpen) ? 
  (<section className='menu-style'>
      <p>Menu</p>
      <MenuNav/>
  </section>) : null;

  return (
    <>
    {validateUser}
    </>
  )
}

export default Menu;