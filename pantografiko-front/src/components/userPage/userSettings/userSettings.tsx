import React, { useContext } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import './userSettings.css';

const UserSettings: React.FC = ():JSX.Element => {
    const { userObject } = useContext(StoreContext);

    return (
        <div className='display-settings'>
            <p>Login: {userObject.login}</p>
            <p>Email: {userObject.email}</p>
            <p>Rola: {userObject.role}</p>
            <p>Przedsiębiorstwo: {'Brak...'}</p>
        </div>
    )
}

export default UserSettings;