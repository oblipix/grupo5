/* eslint-disable react-refresh/only-export-components */


import React, { createContext, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    // FUNCIONALIDADE DE EVENTO MODAL COMENTADA
    /*
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);

    const openEventModal = () => setIsEventModalOpen(true);
    const closeEventModal = () => setIsEventModalOpen(false);
    */

    return (
        <ModalContext.Provider value={{ 
            // VALORES DE EVENTO COMENTADOS
            // isEventModalOpen, openEventModal, closeEventModal 
        }}>
            {children}
        </ModalContext.Provider>
    );
};

// Hook customizado para facilitar o uso
export const useModal = () => {
    return useContext(ModalContext);
};