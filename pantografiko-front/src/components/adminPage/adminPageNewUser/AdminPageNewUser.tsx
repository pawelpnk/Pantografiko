import React, { ChangeEvent, useEffect, useState } from 'react';
import req from '../../../helpers/request';
import Modal from '../../modal/modal';
import './adminPageNewUser.css';

const AdminPageNewUser: React.FC = (): JSX.Element => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordRepeat, setPasswordRepeat] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<string>('user');
    const [messageValidate, setMessageValidate] = useState<string>('');
    const [openModal, setOpenModal] = useState<number>(0);

    const handleOnLogin = (e: ChangeEvent<HTMLInputElement>): void => setLogin(e.target.value);
    const handleOnPassword = (e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value);
    const handleOnPasswordRepeat = (e: ChangeEvent<HTMLInputElement>): void => setPasswordRepeat(e.target.value);
    const handleOnEmail = (e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value);
    const handleOnRole = (e: ChangeEvent<HTMLSelectElement>): void => setRole(e.target.value);

    const validateInputs = (): boolean => {
        let validateVariable = true;

        if(!login) {
            validateVariable = false;
            setMessageValidate("Brak loginu");
        }
        if(password !== passwordRepeat || !password) {
            validateVariable = false;
            setMessageValidate('Hasła nie są jednakowe');
        }
        if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            validateVariable = false;
            setMessageValidate('E-mail jest niepoprawny');
        }        

        return validateVariable;

    }

    const resetInputs = (): void => {
        setLogin('');
        setPassword('');
        setPasswordRepeat('');
        setEmail('');
        setRole('');
        setMessageValidate('');
    }

    const validateMessage: JSX.Element | null = messageValidate.length > 0 ? <p className='validate-message-new-user'>{messageValidate}</p> : null;

    const handleOnSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if(validateInputs()) {
            try {
                const data = await req.post("/register", {
                    login,
                    password,
                    email,
                    role
                });
                resetInputs();
                if(data.data.message === "Dodano nowego użytkownika") {
                    setOpenModal(3);
                } else {
                    setMessageValidate("Login lub e-mail jest już wykorzystany");
                }                
            } catch {
                console.log("Błąd rejestracji");
            }
        }
    }

    useEffect(() => {
        resetInputs();
    },[]);

    return (
        <div className='new-user-page'>
            <Modal text='Pomyślnie dodano nowego użytkownika' openModal={openModal} setOpenModal={setOpenModal}/>
            <p>Załóż nowego użytkownika</p>
            {validateMessage}
            <form action="post" className='new-user-page-form' onSubmit={handleOnSubmit}>
                <div className="all-form-new-user">
                    <label>
                        <input type="text" onChange={handleOnLogin} value={login} placeholder={'login'}/>
                    </label>
                </div>
                <div className="all-form-new-user">
                    <label>
                        <input type="password" onChange={handleOnPassword} value={password} placeholder={'hasło'}/>
                    </label>
                </div>
                <div className="all-form-new-user">
                    <label>
                        <input type="password" onChange={handleOnPasswordRepeat} value={passwordRepeat} placeholder={'Powtórz hasło'}/>
                    </label>
                </div>
                <div className="all-form-new-user">
                    <label>
                        <input type="text" onChange={handleOnEmail} value={email} placeholder={'e-mail'}/>
                    </label>
                </div>
                <div className="all-form-new-user">
                    <label>
                        <select onChange={handleOnRole} value={role} placeholder={'user'}>
                            <option value="user">user</option>
                            <option value="editor">editor</option>
                            <option value="admin">admin</option>
                        </select>
                    </label>
                </div>
                <div className="all-form-new-user btn-add-new-user">
                    <button type='submit'>Dodaj użytkownika</button>
                </div>
            </form>
        </div>        
    )
}

export default AdminPageNewUser;