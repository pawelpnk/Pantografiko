import React, { useEffect, useState } from "react";
import req from "../../../helpers/request";
import Modal from "../../modal/modal";
import './adminPageUsers.css';

interface UsersFetch {
    login: string;
    email: string;
    role: string;
}

const AdminPageUsers: React.FC = ():JSX.Element => {
    const [users, setUsers] = useState<UsersFetch[]>([]);
    const [deleteUser, setDeleteUser] = useState<string>('');
    const [openModal, setOpenModal] = useState<number>(0);

    const text = `Potwierdź usunięcie konta ${deleteUser}`

    useEffect(()=>{
        const getUsers = async (): Promise<void> => {
            const data = await req.get("/users");
            setUsers(data.data);
        }
        getUsers();

    },[deleteUser]);

    const deleteUserAfterConfirm = async (): Promise<void> => {
        try {
            await req.delete(`/users/${deleteUser}`);
            setDeleteUser('')
        } catch {}        
    }

    const handleOnDeleteUser = (login: string): void => {
        setDeleteUser(login);
        setOpenModal(2);
    }

    return (
        <div className="admin-page-users">
            <Modal text={text} openModal={openModal} setOpenModal={setOpenModal} deleteFunction={deleteUserAfterConfirm}/>
            <div className="admin-page-users-titles">
                <p>Login</p>
                <p>E-mail</p>
                <p>Rola</p>
                <p>Edytuj</p>
                <p>Usuń</p>
            </div>
            {
            users.map(user => {
                return (
                    <div className="all-users-style" key={user.login}>
                        <p>{user.login}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        <button>Edytuj</button>
                        <button onClick={() => handleOnDeleteUser(user.login)}>Usuń</button>
                    </div>
                )
            })
            }
        </div>
    )
}

export default AdminPageUsers;