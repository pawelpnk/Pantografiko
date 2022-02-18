import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './menu.css';
import MenuNav from '../menuNav/MenuNav';

const Menu = () => {

  const { token, user } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isUserProperToken = Boolean(token);

  const validateUser = (isUserLogged && isUserProperToken) ? 
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