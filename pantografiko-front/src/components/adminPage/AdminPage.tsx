import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import './adminPage.css';
import AdminPageNewUser from './adminPageNewUser/AdminPageNewUser';
import AdminPageUserEdit from './adminPageUserEdit/adminPageUserEdit';
import AdminPageUsers from './adminPageUsers/AdminPageUsers';

const AdminPage: React.FC = (): JSX.Element => {

    return (
        <div className='admin-page-content'>
            <div className="sub-menu-admin">
                <Link to='users'>Użytkownicy</Link>
                <Link to='new'>Załóż nowego użytkownika</Link>
            </div>
            <Routes>
                <Route path='/users' element={<AdminPageUsers/>} />
                <Route path='/new' element={<AdminPageNewUser/>} />
                <Route path='/users/:login' element={<AdminPageUserEdit/>} />
            </Routes>
        </div>
    )
}

export default AdminPage;