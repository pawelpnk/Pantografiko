import React, { useContext } from 'react';
import { Route, Routes } from 'react-router';
import { StoreContext } from '../../store/StoreProvider';
import './Component.css';
import Inspections from '../inspections/Inspections';
import InspectionItem from '../inspectionItem/InspectionItem';
import InspectionAddForm from '../inspectionAddForm/InspectionAddForm';
import InspectionItemEdit from '../inspectionItemEdit/InspectionItemEdit';
import NotFoundPage from '../notFoundPage/NotFoundPage';
import Login from '../loginPage/login';

const Content = () => {
  const { user, token } = useContext(StoreContext);

  const isUserLogged = Boolean(user) && Boolean(token);

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        { isUserLogged && <Route path='/display' element={<Inspections />} />}        
        { isUserLogged && <Route path='/display/:inspectionID' element={<InspectionItem/>} />}
        { isUserLogged && <Route path='/display/edit/:inspectionID' element={<InspectionItemEdit/>}/>}
        { isUserLogged && <Route path='/form' element={<InspectionAddForm/>}/>} 
        <Route path='/*' element={<NotFoundPage />} /> 
      </Routes>
  )
}

export default Content;