import React from 'react';
import './modal.css';

type IProps = {
    text: string;
    openModal: number;
    setOpenModal: (isModalOpen: number) => void;
    deleteFunction?: () => Promise<void>;
}

const Modal: React.FC<IProps> = ({text, openModal, setOpenModal, deleteFunction}): JSX.Element => {

    const handleOnClickConfirm = (): void => {
        setOpenModal(0);
        if(deleteFunction){
            deleteFunction();
        }
    }

    const handleOnClickCancel = (): void => {
        setOpenModal(0);
    }

    const isModalOpen: JSX.Element | null = openModal === 1 ? 
        <div className='body-container'>
            <div className='modal'>
                <p>{text}</p>
                <div className="btn-all-modal">
                </div>                
            </div>
        </div>
        : null;

    const isModalOpenConfirmAndCancel: JSX.Element | null = openModal === 2 ? 
        <div className='body-container'>
            <div className='modal'>
                <p>{text}</p>
                <div className="btn-all-modal">
                    <button onClick={handleOnClickConfirm}>Zatwierdź</button>
                    <button onClick={handleOnClickCancel}>Anuluj</button>
                </div>                
            </div>
        </div>
        : null;

    const isModalOpenOnlyConfirm: JSX.Element | null = openModal === 3 ? 
        <div className='body-container'>
            <div className='modal'>
                <p>{text}</p>
                <div className="btn-all-modal">
                    <button onClick={handleOnClickConfirm}>Zatwierdź</button>
                </div>                
            </div>
        </div>
        : null;
    

    return (
        <>
         {isModalOpen}
         {isModalOpenConfirmAndCancel}
         {isModalOpenOnlyConfirm}
        </>
    )
}

export default Modal;