import React, { useContext, useEffect, useState } from 'react';
import req from '../../../helpers/request';
import { StoreContext } from '../../../store/StoreProvider';
import Modal from '../../modal/modal';
import './userChangePassword.css';


const UserChangePassword: React.FC = (): JSX.Element => {
    const [openModal, setOpenModal] = useState<number>(0);

    const { user } = useContext(StoreContext);

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [repeatNewPassword, setRepeatNewPassword] = useState<string>('');
    const [checkInputs, setCheckInputs] = useState<string>('');

    const handleOnChangeOldPassword = (event: React.ChangeEvent<HTMLInputElement>) => setOldPassword(event.target.value);
    const handleOnChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => setNewPassword(event.target.value);
    const handleOnChangeRepeatNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => setRepeatNewPassword(event.target.value);

    const resetInputs = () => {
        setOldPassword('');
        setNewPassword('');
        setRepeatNewPassword('');
        setCheckInputs('');
    }

    useEffect(()=>{
        resetInputs();
    },[]);

    const checkNewPasswordAndRepeatNewPassword = () => {
        if(newPassword === repeatNewPassword && newPassword.length > 0){
            return true;
        } else {
            setCheckInputs('Wprowadzone hasła nie są takie same');
            return false;
        }
    }

    const submitNewPassword = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        const comparePassword: boolean = checkNewPasswordAndRepeatNewPassword();

        if(comparePassword){
            try {
                const data = await req.patch(`/users/password`, {
                    login: user,
                    password: oldPassword,
                    newPassword
                });
                resetInputs();
                if(data.data.message === "Hasło zmienione") {
                    setOpenModal(3);
                } else {
                    setCheckInputs(data.data.message);
                }                
            } catch {
                console.log("Błąd zmiany hasła");
            }            
        }       
    }

    const validateMessage: JSX.Element | null = checkInputs.length > 0 ? <p className='validate-message-change-password'>{checkInputs}</p> : null;

    return  (
        <div className="change-password">
            {validateMessage}
            <Modal text='Pomyślnie zmieniono hasło' openModal={openModal} setOpenModal={setOpenModal}/>
            <form method='patch' onSubmit={submitNewPassword}>
                <div className="input-pass">
                    <label>
                        <h3>Wpisz stare hasło</h3>
                        <input onChange={handleOnChangeOldPassword} type="password" value={oldPassword}/>
                    </label>
                </div>
                <div className="input-pass">
                    <label>
                        <h3>Wpisz nowe hasło</h3>
                        <input onChange={handleOnChangeNewPassword} type="password" value={newPassword}/>
                    </label>
                </div>
                <div className="input-pass">
                    <label>
                        <h3>Powtórz nowe hasło</h3>
                        <input onChange={handleOnChangeRepeatNewPassword} type="password" value={repeatNewPassword}/>
                    </label>
                </div>
                <button type='submit'>Zmień hasło</button>
            </form>

        </div>
    )
}

export default UserChangePassword;