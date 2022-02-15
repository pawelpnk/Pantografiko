import React from 'react';
import { Link } from 'react-router-dom';
import './DisplayInspection.css';

const DisplayInspection = () => {
  return (
    <>
      <nav>
        <ul>
          <li className='form-style-display-inspection'>
            <Link to="/display">Wyświetl inspekcje</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default DisplayInspection;