import React from 'react';
import { Link } from 'react-router-dom';
import { InspectionInterface } from './inspection.interface/inspection-interface';

interface IProps {
    inspection: InspectionInterface;
    handleOnClickCleanFetch: () => void;
    deleteItem: (inspection: InspectionInterface) => void
}

const InspectionMinItem: React.FC<IProps> = ({inspection, handleOnClickCleanFetch, deleteItem}): JSX.Element => {
    return (
        <div className="inspection-block">      
            <p>Osoba wykonująca przegląd: {inspection.loginUserID}</p>
            <p>Numer lokomotywy: {inspection.locomotiveNumber}</p>
            <p>Data przeglądu: {inspection.inspectionDate}</p>      
            <p>Numer przeglądu: {inspection.inspectionOfNumber}</p>
            <Link onClick={handleOnClickCleanFetch} className={'link-inspection'} to={`/display/${inspection._id}`}>
                Przejdź do szczegółów
            </Link>      
            <button onClick={() => deleteItem(inspection)} className='delete-inspection'>Usuń</button>
            <Link className='update-inspection' to={`/display/edit/${inspection._id}`}>Edytuj</Link>      
        </div>
    )
}

export default InspectionMinItem;