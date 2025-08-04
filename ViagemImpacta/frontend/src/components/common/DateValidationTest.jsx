import React, { useState } from 'react';

// Componente de teste para validação de datas
function DateValidationTest() {
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    // Função para obter a data mínima permitida (amanhã)
    const getMinDate = () => {
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    // Função para obter a data de hoje para comparação
    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Função para validar e atualizar datas
    const handleDateChange = (field, value) => {
        // Valida se a data não é anterior a amanhã (ou igual a hoje)
        const minDate = getMinDate();
        const today = getTodayDate();
        
        if (value && (value < minDate || value === today)) {
            // Se a data for inválida (hoje ou anterior), não atualiza o estado e mostra alerta
            alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
            return;
        }

        // Validação adicional para check-out: deve ser posterior ao check-in
        if (field === 'checkOut' && checkInDate && value && value <= checkInDate) {
            // Se check-out for anterior ou igual ao check-in, não atualiza
            alert('A data de check-out deve ser posterior à data de check-in!');
            return;
        }

        if (field === 'checkIn') {
            setCheckInDate(value);
            // Se a data de check-out já selecionada for anterior à nova data de check-in, limpa check-out
            if (checkOutDate && value && checkOutDate <= value) {
                setCheckOutDate('');
            }
        }
        if (field === 'checkOut') setCheckOutDate(value);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Teste de Validação de Datas</h2>
            <p><strong>Data de hoje:</strong> {getTodayDate()}</p>
            <p><strong>Data mínima permitida:</strong> {getMinDate()}</p>
            
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Check-in:
                </label>
                <input
                    type="date"
                    min={getMinDate()}
                    value={checkInDate}
                    onChange={(e) => handleDateChange('checkIn', e.target.value)}
                    onInvalid={(e) => {
                        e.preventDefault();
                        alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                    }}
                    onBlur={(e) => {
                        // Validação adicional ao sair do campo
                        const value = e.target.value;
                        const today = getTodayDate();
                        if (value && value <= today) {
                            e.target.value = '';
                            setCheckInDate('');
                            alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                        }
                    }}
                    style={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        width: '200px'
                    }}
                />
            </div>

            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Check-out:
                </label>
                <input
                    type="date"
                    min={checkInDate || getMinDate()}
                    value={checkOutDate}
                    onChange={(e) => handleDateChange('checkOut', e.target.value)}
                    onInvalid={(e) => {
                        e.preventDefault();
                        alert('Só é permitido agendar em datas posteriores ao dia de hoje!');
                    }}
                    style={{ 
                        padding: '8px', 
                        borderRadius: '4px', 
                        border: '1px solid #ccc',
                        width: '200px'
                    }}
                />
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                <h3>Valores selecionados:</h3>
                <p><strong>Check-in:</strong> {checkInDate || 'Não selecionado'}</p>
                <p><strong>Check-out:</strong> {checkOutDate || 'Não selecionado'}</p>
            </div>

            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#e8f4fd', borderRadius: '4px' }}>
                <h3>Instruções de teste:</h3>
                <ul>
                    <li>Tente selecionar a data de hoje ou uma data anterior - deve ser bloqueado</li>
                    <li>Selecione uma data válida para check-in (amanhã ou posterior)</li>
                    <li>Tente selecionar uma data de check-out anterior ao check-in - deve ser bloqueado</li>
                    <li>O navegador deve impedir a seleção de datas inválidas</li>
                </ul>
            </div>
        </div>
    );
}

export default DateValidationTest;
