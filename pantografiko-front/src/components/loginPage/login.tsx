import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../store/StoreProvider';
import './login.css';
import LoginForm from './loginForm/loginForm';



const Login: React.FC = (): JSX.Element => {
  const { user, token } = useContext(StoreContext);

  const startPage = (
    <div className='login-style'>
        {(user && token ) ? (
          <div className="welcome">
            <h2>Witaj, {user}</h2>
            <Link to='/display'>Przejdź dalej</Link>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
  );

  return (
      <>
        {startPage}
      </>
  );
};

export default Login;