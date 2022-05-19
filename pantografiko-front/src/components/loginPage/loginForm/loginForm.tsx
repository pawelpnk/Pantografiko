import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../../store/StoreProvider';
import './loginForm.css';
import { loginAuth } from '../../../services/auth.service';
import { saveUserLogin } from '../../../helpers/saveLocalStorage';

const LoginForm: React.FC = (): JSX.Element => {

  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [validateMessage, setValidateMessage] = React.useState<string>('');

  const { user, setUser, setToken, setUserObject, setUserID } = useContext(StoreContext);

  const handleOnChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }
  const handleOnChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const resetInputs = (): void => {
    setLogin('');
    setPassword('');
    setValidateMessage('');
  }

  const handleOnSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    
  try {
    const data = await loginAuth(login, password);
      if(data.data.accessToken) {
        setUser(login);
        setToken(data.data.accessToken);
        saveUserLogin(login);
        setUserID(data.data.findUserID);
        setUserObject(data.data.findUser);
      } else {
        setValidateMessage(data.data.message)
      }
    } catch {
      console.log('Błąd uwierzytelniania')
    }
  }

  useEffect(() => {
    if(user) {
      resetInputs();
    }
  }, [user]);

  const validateMessageSubmit: JSX.Element | null = validateMessage.length > 0 ? <p className='validate-message'>{validateMessage}</p> : null;

  return (
    <form method='post' className='login-form' onSubmit={handleOnSubmit}>
      {validateMessageSubmit}
      <div className="login">
        <label>
          <h3>Login</h3>
          <input onChange={handleOnChangeLogin} type="text" value={login} />
        </label>
      </div>
      <div className="pwd">
        <label>
          <h3>Password</h3>
          <input onChange={handleOnChangePassword} type="password" value={password}/>
        </label>
      </div>
      <div className="btn-login">
        <button type='submit'>Log in</button>
      </div>
    </form>
  )
}

export default LoginForm;