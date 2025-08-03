/* eslint-disable react-refresh/only-export-components */


import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import Modal from '../modals/Modal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    // Estado para controlar o modal genérico
    const [modalState, setModalState] = useState({
        isOpen: false,
        title: '',
        message: '',
        actionText: 'OK',
        showHeader: true,
        onConfirm: null // Callback para quando o usuário clicar em OK
    });
    
    // Função para abrir o modal - otimizada para performance
    const showModal = useCallback(({ title, message, actionText = 'OK', showHeader = true, onConfirm = null }) => {
        // Usa uma função de atualização direta para evitar bloqueios de renderização
        // e garantir que o modal apareça imediatamente
        requestAnimationFrame(() => {
            setModalState({
                isOpen: true,
                title,
                message,
                actionText,
                showHeader,
                onConfirm
            });
        });
    }, []);
    
    // Função para fechar o modal
    const hideModal = useCallback((fromCloseButton = false) => {
        // Guarda o callback antes de fechar o modal
        const { onConfirm } = modalState;
        
        // Fecha o modal
        setModalState(prevState => ({ ...prevState, isOpen: false }));
        
        // Executa o callback apenas se não estiver fechando pelo X e se o callback existir
        if (!fromCloseButton && typeof onConfirm === 'function') {
            // Pequeno timeout para garantir que o modal fechou primeiro
            setTimeout(() => {
                // Executa o callback com alta prioridade para garantir a navegação
                console.log("Executando callback de navegação");
                onConfirm();
            }, 100);
        }
    }, [modalState]);
    
    // Função específica para mensagem de sucesso ao adicionar à lista de desejos
    const showWishlistSuccessModal = useCallback((onConfirm = null) => {
        showModal({
            title: 'Destino Salvo!',
            message: 'Hotel adicionado à sua lista de desejos com sucesso! Você poderá visualizá-lo em seu perfil.',
            actionText: 'Ver minha lista',
            showHeader: true,
            onConfirm: onConfirm || (() => {
                // Navegação padrão para a página de favoritos se nenhum callback foi fornecido
                window.location.href = '/';
            })
        });
    }, [showModal]);
    
    // Função específica para mensagem ao remover da lista de desejos
    const showRemoveWishlistModal = useCallback((onConfirm = null) => {
        showModal({
            title: 'Destino Removido',
            message: 'Hotel removido da sua lista de desejos com sucesso.',
            actionText: 'OK',
            showHeader: true,
            onConfirm: onConfirm // Será executado apenas se o usuário clicar no botão de ação, não no X
        });
    }, [showModal]);
    
    // Adiciona event listeners para os eventos personalizados - otimizado para performance
    useEffect(() => {
        // Handler para adicionar à lista de desejos - com alta prioridade
        const handleWishlistAddEvent = (event) => {
            // Usa requestAnimationFrame para priorizar a atualização visual
            requestAnimationFrame(() => {
                const onConfirm = event.detail?.onConfirm || (() => {
                    // Navegação padrão se não foi fornecido um callback específico
                    console.log("Redirecionando para Home");
                    window.location.href = '/';
                });
                showWishlistSuccessModal(onConfirm);
            });
        };
        
        // Handler para remover da lista de desejos - com alta prioridade
        const handleWishlistRemoveEvent = (event) => {
            requestAnimationFrame(() => {
                const onConfirm = event.detail?.onConfirm || null;
                showRemoveWishlistModal(onConfirm);
            });
        };
        
        // Registra os listeners
        window.addEventListener('showWishlistModal', handleWishlistAddEvent, { passive: true });
        window.addEventListener('showRemoveWishlistModal', handleWishlistRemoveEvent, { passive: true });
        
        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('showWishlistModal', handleWishlistAddEvent);
            window.removeEventListener('showRemoveWishlistModal', handleWishlistRemoveEvent);
        };
    }, [showWishlistSuccessModal, showRemoveWishlistModal]);

    return (
        <ModalContext.Provider value={{ 
            showModal,
            hideModal,
            showWishlistSuccessModal,
            showRemoveWishlistModal
        }}>
            {children}
            <Modal
                isOpen={modalState.isOpen}
                onClose={(fromCloseButton) => hideModal(fromCloseButton)} // Passa o parâmetro que indica a origem do fechamento
                title={modalState.title}
                actionText={modalState.actionText}
                showHeader={modalState.showHeader}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Success icon for wishlist add modal */}
                    {modalState.title === 'Destino Salvo!' && (
                        <div className="mb-4 bg-green-100 p-3 rounded-full">
                            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    )}
                    
                    {/* Info icon for wishlist remove modal */}
                    {modalState.title === 'Destino Removido' && (
                        <div className="mb-4 bg-blue-100 p-3 rounded-full">
                            <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                    )}
                    
                    <p className="text-gray-700 text-lg">{modalState.message}</p>
                </div>
            </Modal>
        </ModalContext.Provider>
    );
};

// Hook customizado para facilitar o uso
export const useModal = () => {
    return useContext(ModalContext);
};