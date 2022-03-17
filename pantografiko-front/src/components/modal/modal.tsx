import React, { useEffect, useState } from 'react';
import './modal.css';

type IProps = {
    text: string;
    openModal: boolean;
    setOpenModal: (isModalOpen: boolean) => void;
    nonActiveButton?: boolean;
}

const Modal: React.FC<IProps> = ({text, openModal, setOpenModal, nonActiveButton}): JSX.Element => {

    const handleOnClick = (): void => {
        setOpenModal(false);
    }

    const isModalOpen: JSX.Element | null = openModal ? 
        <div className='body-container'>
            <div className='modal'>
                <p>{text}</p>
                { nonActiveButton ? null : <button onClick={handleOnClick}>Zatwierdź</button>}
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