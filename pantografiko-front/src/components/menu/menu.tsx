import React, { useContext } from 'react';
import { StoreContext } from '../../store/StoreProvider';
import './menu.css';
import FormInspection from '../formInspection/FormInspection';
import DisplayInspection from '../displayInspection/DisplayInspection';

const Menu = () => {

  const { token, user, isLoginPageOpen } = useContext(StoreContext);

  const isUserLogged = Boolean(user);
  const isUserProperToken = Boolean(token);
  const startPageIsOpen = Boolean(isLoginPageOpen);

  const validateUser = (isUserLogged && isUserProperToken && !startPageIsOpen) ? 
  (<section className='menu-style'>
      <p>Menu</p>
      <FormInspection />
      <DisplayInspection />
  </section>) : null;

  return (
    <>
    {validateUser}
    </>
  )
}

export default Menu;