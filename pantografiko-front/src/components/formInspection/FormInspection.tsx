import React from 'react';
import { Link } from 'react-router-dom';
import './FormInspection.css';

const FormInspection = () => {
  return (
    <>      
      <nav>
        <ul>
          <li className='form-style-inspection'>
            <Link to="/form">Dodaj formularz</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default FormInspection;