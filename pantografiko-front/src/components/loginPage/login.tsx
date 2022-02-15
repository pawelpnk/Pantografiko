import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { statePageLogin } from '../../helpers/saveLocalStorage';
import { StoreContext } from '../../store/StoreProvider';
import './login.css';
import LoginForm from './loginForm/loginForm';



const Login = () => {
  const { user, token, isLoginPageOpen, setIsLoginPageOpen } = useContext(StoreContext);

  const handleOnClickClosePageLogin = () => {
    setIsLoginPageOpen(false);
    statePageLogin(false);
  };

  const startPage = isLoginPageOpen ? (
    <div className='login-style'>
        {(user && token ) ? (
          <div className="welcome">
            <h2>Witaj, {user}</h2>
              <button onClick={handleOnClickClosePageLogin}>
                <Link to='/display'>Ok</Link>
              </button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
  ) : null;

  return (
      <>
        {startPage}
      </>
  );
};

export default Login;