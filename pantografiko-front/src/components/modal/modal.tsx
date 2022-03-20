import React from 'react';
import './modal.css';

type IProps = {
    text: string;
    openModal: boolean;
    setOpenModal: (isModalOpen: boolean) => void;
    nonActiveButton?: boolean;
    buttonCancel?: boolean;
    deleteFunction?: () => Promise<void>;
}

const Modal: React.FC<IProps> = ({text, openModal, setOpenModal, nonActiveButton, buttonCancel, deleteFunction}): JSX.Element => {

    const handleOnClickConfirm = (): void => {
        setOpenModal(false);
        if(deleteFunction){
            deleteFunction();
        }
    }

    const handleOnClickCancel = (): void => {
        setOpenModal(false);
    }

    const isModalOpen: JSX.Element | null = openModal ? 
        <div className='body-container'>
            <div className='modal'>
                <p>{text}</p>
                <div className="btn-all-modal">
                    { nonActiveButton ? null : <button onClick={handleOnClickConfirm}>Zatwierdź</button>}
                    { buttonCancel ? <button onClick={handleOnClickCancel}>Anuluj</button> : null}
                </div>  
                
            </div>
        </div>
        : null;
    

    return (
        <>
         {isModalOpen}
        </>
    )
}

export default Modal;