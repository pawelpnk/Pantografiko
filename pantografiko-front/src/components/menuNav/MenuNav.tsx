import { Link } from 'react-router-dom';
import './menuNav.css';

const MenuNav: React.FC = (): JSX.Element => {
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
        </ul>
      </nav>
    </>
  )
}

export default MenuNav;