import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import req from '../../../helpers/request';
import Modal from '../../modal/modal';

interface IUser {
    login: string;
    email: string;
    role: string;    
}

const AdminPageUserEdit: React.FC = (): JSX.Element => {
    const [userFetch, setUserFetch] = useState<IUser>({login: '', email: '', role: ''});
    const [role, setRole] = useState<string>('');
    const [openModal, setOpenModal] = useState<number>(0);

    const { login } = useParams();

    const handleOnRole = (e: ChangeEvent<HTMLSelectElement>) => setRole(e.target.value);

    useEffect(() => {
        const fetchUser = async () => {
            const data = await req.get(`users/${login}`)
            setUserFetch(data.data);
            setRole(data.data.role);
        }
        fetchUser();
    },[])

    const handleUpdateUser = async (): Promise<void> => {
        const data = await req.patch(`users/role`, {
            login: userFetch.login,
            role: role
        });
        if(data.data.message === 'Zaaktualizowano') {
            setOpenModal(1);
            setTimeout(() => setOpenModal(0), 3000);
        }
    }

    return (
        <div className='new-user-page'>
            <Modal text={'Zaaktualizowano'} openModal={openModal} setOpenModal={setOpenModal}/>
            <div className='new-user-page-form' style={{marginBottom: '20px'}}>
                <p>{userFetch.login}</p>
                <p>{userFetch.email}</p>
                <div className="all-form-new-user">
                    <label>
                        <select onChange={handleOnRole} value={role} placeholder={userFetch.role}>
                            <option value="user">user</option>
                            <option value="editor">editor</option>
                            <option value="admin">admin</option>
                        </select>
                    </label>
                </div>
                <div className="all-form-new-user btn-add-new-user">
                    <button onClick={handleUpdateUser}>Aktualizuj</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPageUserEdit;