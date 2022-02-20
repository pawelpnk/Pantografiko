import React, { useState } from 'react';
import './headerUserMenu.css';
import { Link } from 'react-router-dom'

type Iprops = {
    user: string
}

const HeaderUserMenu: React.FC<Iprops> = ({user}): JSX.Element => {
    const [addClass, setAddClass] = useState<string>('');

    const handleOnMouseEnter = () => setAddClass('nav-open');
    const handleOnMouseLeave = () => setAddClass('');

    return (
        <div 
        onMouseEnter={handleOnMouseEnter}    
        onMouseLeave={handleOnMouseLeave}    
        className='p-header'>
            <p>{user}</p>
            <nav className={addClass}>
                <ul>
                    <li className='li-user'>
                        <Link to="/">Ustawienia</Link>
                    </li>
                    <li className='li-user'>
                        <Link to="/user/password">Zmień hasło</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderUserMenu;