/* eslint-disable react-refresh/only-export-components */


import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const openEventModal = () => setIsEventModalOpen(true);
    const closeEventModal = () => setIsEventModalOpen(false);

    return (
        <ModalContext.Provider value={{ isEventModalOpen, openEventModal, closeEventModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// Hook customizado para facilitar o uso
export const useModal = () => {
    return useContext(ModalContext);
};