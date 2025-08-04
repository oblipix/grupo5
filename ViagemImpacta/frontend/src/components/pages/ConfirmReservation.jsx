import { useState, useEffect} from 'react';
import PaymentSuccessPage from './PaymentSuccessPage.jsx'; // Importando a página de sucesso de pagamento

function ConfirmReservation() {
    const [statusMessage, setStatusMessage] = useState("Confirmando sua Reserva");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        if (!sessionId) {
            setStatusMessage("Nenhum ID de sessão encontrado.");
            return;
        }

        fetch(`https://localhost:7010/api/stripe/confirm-reservation?sessionId=${sessionId}`)
            .then(response => response.text())
            .then(text => {setStatusMessage(text); })
            .catch(error => {
                console.error("Erro ao confirmar a reserva:", error);
                setStatusMessage("Erro ao confirmar a reserva. Tente novamente mais tarde.");
            });

    }, []);
    return (
        <div>
            <PaymentSuccessPage />
        </div>
    );

}
export default ConfirmReservation;
