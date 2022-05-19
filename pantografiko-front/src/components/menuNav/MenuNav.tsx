import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import './menuNav.css';

const MenuNav: React.FC = (): JSX.Element => {

  const { userObject } = useContext(StoreContext);

  const isAdmin = userObject?.role === 'admin' ? 
    <li className='admin-menu-nav menu-style-links'>
      <Link to="/admin">Panel Administratora</Link>
    </li>
     : null;

  return (
    <>
      <nav>
        <ul>
            <li className='menu-style-links'> 
                <Link to="/form">Dodaj formularz</Link>
            </li>
            <li className='menu-style-links'>
                <Link to="/display">Wyświetl inspekcje</Link>
            </li>
            {isAdmin}          
        </ul>
      </nav>
    </>
  )
}

export default MenuNav;