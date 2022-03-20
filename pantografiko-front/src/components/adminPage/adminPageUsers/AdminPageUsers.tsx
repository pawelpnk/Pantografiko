import React, { useContext, useEffect, useState } from "react";
import req from "../../../helpers/request";
import { StoreContext } from "../../../store/StoreProvider";
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

    const { openModal, setOpenModal } = useContext(StoreContext);

    useEffect(()=>{
        const getUsers = async (): Promise<void> => {
            const data: any = await req.get("/users");
            console.log(data.data);
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
        setOpenModal(true);
    }

    return (
        <div className="admin-page-users">
            <Modal text={`Potwierdź usunięcie konta ${deleteUser}`} openModal={openModal} setOpenModal={setOpenModal} buttonCancel={true} deleteFunction={deleteUserAfterConfirm}/>
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