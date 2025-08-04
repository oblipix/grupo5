import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPasswordPage(){
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();

    const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    requirements: {
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    },
    colorClass: 'text-gray-500',
});


   const evaluatePasswordStrength = (passwordValue) => {
        let score = 0;
        const requirements = {
            length: passwordValue.length >= 8,
            uppercase: /[A-Z]/.test(passwordValue),
            lowercase: /[a-z]/.test(passwordValue),
            number: /[0-9]/.test(passwordValue),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue),
        };

        if (requirements.length) score++;
        if (requirements.uppercase) score++;
        if (requirements.lowercase) score++;
        if (requirements.number) score++;
        if (requirements.specialChar) score++;

        let message = '';
        let colorClass = 'text-gray-500';
        
        switch (score) {
            case 0:
            case 1:
                message = 'Muito Fraca';
                colorClass = 'text-red-500';
                break;
            case 2:
                message = 'Fraca';
                colorClass = 'text-orange-500';
                break;
            case 3:
                message = 'Média';
                colorClass = 'text-yellow-500';
                break;
            case 4:
                message = 'Forte';
                colorClass = 'text-green-500';
                break;
            case 5:
                message = 'Muito Forte';
                colorClass = 'text-green-700';
                break;
            default:
                message = '';
                colorClass = 'text-gray-500';
        }

        setPasswordStrength({ score, message, requirements, colorClass });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword){
            setError("As senhas não coincidem.");
            return;
        }

        if (Object.values(passwordStrength.requirements).some(r => !r)) {
            setError("A senha não atende aos requisitos mínimos.");
            return;
        }   

        try{
            const response = await fetch('https://localhost:7010/api/Auth/reset-password',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ token, newPassword}),
            });

            if (response.ok){
                alert("Senha redefinida com sucesso!");
                navigate ('/login');
            }
            else{
                const errorData = await response.json();
                setError(errorData.message || "Erro ao definir a senha");
            }
        } catch (err) {
            setError("Erro de conexão. Tente novamente mais tarde.");
        }
    };

    return (

        <section className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-xl p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Redefinir Senha</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Nova Senha
                        </label>

                        <input
                            type="password"
                            id="newPassword"
                            placeholder="Digite a nova senha"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                                evaluatePasswordStrength(e.target.value);
                            }}
                            required
                        />

                        {passwordStrength.message && (
                            <p className={`${passwordStrength.colorClass} text-sm mt-1`}>
                                Força da senha: {passwordStrength.message}
                            </p>
                        )}

                        <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                            <li className={`${passwordStrength.requirements.length ? 'text-green-600' : 'text-red-500'}`}>Pelo menos 8 caracteres</li>
                            <li className={`${passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-red-500'}`}>Uma letra maiúscula</li>
                            <li className={`${passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-red-500'}`}>Uma letra minúscula</li>
                            <li className={`${passwordStrength.requirements.number ? 'text-green-600' : 'text-red-500'}`}>Um número</li>
                            <li className={`${passwordStrength.requirements.specialChar ? 'text-green-600' : 'text-red-500'}`}>Um caractere especial (!@#$...)</li>
                        </ul>

                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirmar Senha
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirme a nova senha"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        Redefinir Senha
                    </button>
                </form>
            </div>
        </section>
 
    );
}

export default ResetPasswordPage;