import React, { useState } from 'react';
// import DatePicker from 'react-datepicker'; // Remover importação do DatePicker
// import 'react-datepicker/dist/react-datepicker.css'; // Remover importação do CSS do DatePicker


// --- Funções de Validação e Formatação (Removidas: CPF e Data de Nascimento) ---


// --- Componente RegisterPage ---
function RegisterPage({ onNavigateToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [ultimoNome, setUltimoNome] = useState('');

  // Estados para feedback e validação
  const [passwordMatchError, setPasswordMatchError] = useState('');
  // NOVO: Estado para a mensagem de força da senha
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // 0-4 para força da senha (muito fraca a muito forte)
    message: '', // Mensagem de feedback
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    },
  });

  // Função para avaliar a força da senha
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
    let colorClass = 'text-gray-500'; // Cor padrão

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


  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true; // Flag geral de validação

    // Validação dos campos de nome
    if (!primeiroNome.trim() || !ultimoNome.trim()) {
      alert('Por favor, preencha seu primeiro nome e último nome.');
      isValid = false;
    }

    // Validação de Senhas
    if (password !== confirmPassword) {
      setPasswordMatchError('As senhas não coincidem!');
      isValid = false;
    } else {
      setPasswordMatchError('');
    }

    // Validação da força da senha no envio do formulário
    if (passwordStrength.score < 3) { // Exige senha "Média" ou mais forte
        alert('Sua senha é muito fraca. Por favor, crie uma senha mais forte seguindo as sugestões.');
        isValid = false;
    }


    // Se tudo estiver válido, procede com o registro simulado
    if (isValid) {
      console.log('Tentativa de Cadastro:', { primeiroNome, ultimoNome, email, password });
      alert('Seu cadastro foi concluído com sucesso! Bem-vindo à Tripz! 🎉');
      onNavigateToLogin();
    } else {
      // alert('Por favor, corrija os erros no formulário antes de continuar.'); // Já temos alertas mais específicos
    }
  };

  // Funções para validar senha ao sair do campo (onBlur)
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword); // Avalia a força em cada mudança
    // Também verifica a correspondência com a confirmação da senha
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordMatchError('As senhas não correspondem. Tente novamente.');
    } else {
      setPasswordMatchError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    if (password && newConfirmPassword !== password) {
      setPasswordMatchError('As senhas não correspondem. Tente novamente.');
    } else {
      setPasswordMatchError('');
    }
  };


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        {/* Coluna da Esquerda: Imagem */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://picsum.photos/id/11/800/600"
            alt="Sinalização de destinos"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Coluna da Direita: Formulário de Cadastro */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Junte-se à Tripz!</h2>
          <p className="text-gray-600 text-md mb-6 text-center">
            Descubra um mundo de viagens incríveis. É rápido e fácil!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campos Primeiro Nome e Último Nome */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="primeiroNome" className="block text-gray-700 text-sm font-bold mb-2">
                        Primeiro Nome
                    </label>
                    <input
                        type="text"
                        id="primeiroNome"
                        placeholder="Ex: Maria"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={primeiroNome}
                        onChange={(e) => setPrimeiroNome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ultimoNome" className="block text-gray-700 text-sm font-bold mb-2">
                        Último Nome
                    </label>
                    <input
                        type="text"
                        id="ultimoNome"
                        placeholder="Ex: da Silva"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={ultimoNome}
                        onChange={(e) => setUltimoNome(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Seu Melhor Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Crie uma Senha Forte
              </label>
              <input
                type="password"
                id="password"
                placeholder="********"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordStrength.score < 3 && password.length > 0 ? 'border-red-500' : ''}`}
                value={password}
                onChange={handlePasswordChange} // Usa a nova função de change
                // onBlur={handlePasswordBlur} // Não precisa mais do onBlur para força da senha, a validação é em tempo real
                required
              />
              {/* Indicador de Força da Senha */}
              {password.length > 0 && (
                <div className="mt-2">
                  <p className={`text-xs font-semibold ${passwordStrength.colorClass}`}>
                    Força da Senha: {passwordStrength.message}
                  </p>
                  <ul className="text-xs text-gray-600 mt-1 list-disc pl-4">
                    <li className={`${passwordStrength.requirements.length ? 'text-green-600' : 'text-red-500'}`}>
                      Pelo menos 8 caracteres
                    </li>
                    <li className={`${passwordStrength.requirements.uppercase ? 'text-green-600' : 'text-red-500'}`}>
                      Uma letra maiúscula
                    </li>
                    <li className={`${passwordStrength.requirements.lowercase ? 'text-green-600' : 'text-red-500'}`}>
                      Uma letra minúscula
                    </li>
                    <li className={`${passwordStrength.requirements.number ? 'text-green-600' : 'text-red-500'}`}>
                      Um número
                    </li>
                    <li className={`${passwordStrength.requirements.specialChar ? 'text-green-600' : 'text-red-500'}`}>
                      Um caractere especial (!@#$...)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Campo Confirmar Senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                Confirme sua Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="********"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${passwordMatchError ? 'border-red-500' : ''}`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} // Usa a nova função de change
                onBlur={handleConfirmPasswordChange} // Mantém o onBlur para reconfirmar se necessário
                required
              />
              {passwordMatchError && <p className="text-red-500 text-xs italic mt-1">{passwordMatchError}</p>}
              {/* Feedback positivo para senhas se elas coincidirem e não houver erro */}
              {password && confirmPassword && password === confirmPassword && !passwordMatchError && (
                <p className="text-green-600 text-xs italic mt-1">Senhas combinam! ✅</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                className="main-action-button text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Começar Minha Aventura!
              </button>
            </div>
          </form>

          <div className="text-center mt-6 text-sm">
            <a
              href="#"
              onClick={onNavigateToLogin}
              className="font-bold text-blue-600 hover:text-blue-800 transition"
            >
              Já tem uma conta? Faça login aqui.
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;