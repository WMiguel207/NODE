document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const generatePasswordBtn = document.getElementById('generate-password');
    const submitBtn = document.getElementById('submit');
    const messageDiv = document.getElementById('message');
    const generatedPasswordDiv = document.getElementById('generated-password');
    const randomPasswordSpan = document.getElementById('random-password');
    const copyPasswordBtn = document.getElementById('copy-password');
    const strengthBar = document.querySelector('.strength-bar');
    
    // Banco de dados para gerar senhas aleatórias
    const wordBank = ['seguro', 'forte', 'senha', 'acesso', 'protegido', 'digital', 'codigo', 'cripto'];
    const symbols = ['!', '@', '#', '$', '%', '&', '*', '-', '_', '+', '='];
    
    // Validação em tempo real
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validatePassword);
    
    // Gerar senha aleatória
    generatePasswordBtn.addEventListener('click', generateRandomPassword);
    
    // Copiar senha gerada
    copyPasswordBtn.addEventListener('click', copyGeneratedPassword);
    
    // Confirmar senha
    submitBtn.addEventListener('click', confirmPassword);
    
    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        // Verificar requisitos
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%&*]/.test(password);
        const passwordsMatch = password === confirmPassword && password !== '';
        
        // Atualizar visualização dos requisitos
        updateRequirement('length', hasLength);
        updateRequirement('uppercase', hasUppercase);
        updateRequirement('lowercase', hasLowercase);
        updateRequirement('number', hasNumber);
        updateRequirement('special', hasSpecial);
        
        // Atualizar barra de força
        updateStrengthBar(hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial);
        
        // Habilitar/desabilitar botão de confirmação
        submitBtn.disabled = !(hasLength && hasUppercase && hasLowercase && hasNumber && hasSpecial && passwordsMatch);
    }
    
    function updateRequirement(id, isValid) {
        const element = document.getElementById(id);
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }
    
    function updateStrengthBar(length, upper, lower, number, special) {
        let strength = 0;
        
        if (length) strength += 20;
        if (upper) strength += 20;
        if (lower) strength += 20;
        if (number) strength += 20;
        if (special) strength += 20;
        
        strengthBar.style.width = strength + '%';
        
        if (strength < 40) {
            strengthBar.style.backgroundColor = '#e74c3c';
        } else if (strength < 80) {
            strengthBar.style.backgroundColor = '#f39c12';
        } else {
            strengthBar.style.backgroundColor = '#2ecc71';
        }
    }
    
    function generateRandomPassword() {
        // Selecionar palavras aleatórias (uma com maiúscula e outra com minúscula)
        const shuffledWords = [...wordBank].sort(() => 0.5 - Math.random());
        let word1 = shuffledWords[0];
        let word2 = shuffledWords[1];
        
        // Garantir pelo menos uma letra maiúscula e uma minúscula
        word1 = word1.charAt(0).toUpperCase() + word1.slice(1).toLowerCase();
        word2 = word2.toLowerCase();
        
        // Adicionar números aleatórios (garantir pelo menos 1 número)
        const randomNumber = Math.floor(Math.random() * 90) + 10; // Número entre 10 e 99
        
        // Adicionar símbolo aleatório (usar apenas símbolos que o regex reconhece)
        const validSymbols = ['!', '@', '#', '$', '%', '&', '*'];
        const randomSymbol = validSymbols[Math.floor(Math.random() * validSymbols.length)];
        
        // Juntar tudo para formar a senha
        const randomPassword = word1 + word2 + randomNumber + randomSymbol;
        
        // Exibir a senha gerada
        randomPasswordSpan.textContent = randomPassword;
        generatedPasswordDiv.classList.remove('hidden');
        
        // Preencher os campos de senha
        passwordInput.value = randomPassword;
        confirmPasswordInput.value = randomPassword;
        
        // Validar a senha gerada
        validatePassword();
    }
    
    function copyGeneratedPassword() {
        navigator.clipboard.writeText(randomPasswordSpan.textContent)
            .then(() => {
                showMessage('Senha copiada para a área de transferência!', 'success');
            })
            .catch(err => {
                showMessage('Falha ao copiar a senha.', 'error');
                console.error('Erro ao copiar:', err);
            });
    }
    
    function confirmPassword() {
        // Simular armazenamento em um "banco de dados"
        // Na prática, isso seria substituído por uma chamada a um servidor
        const password = passwordInput.value;
        
        // Aqui você normalmente faria uma requisição para um backend
        // que armazenaria a senha de forma segura (hash + salt)
        console.log('Senha a ser armazenada:', password);
        
        showMessage('Senha confirmada e armazenada com sucesso!', 'success');
        
        // Limpar campos (simulando envio bem-sucedido)
        passwordInput.value = '';
        confirmPasswordInput.value = '';
        generatedPasswordDiv.classList.add('hidden');
        submitBtn.disabled = true;
        
        // Resetar validação
        document.querySelectorAll('.requirements li').forEach(li => {
            li.classList.remove('valid');
        });
        strengthBar.style.width = '0%';
    }
    
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = type;
        messageDiv.classList.remove('hidden');
        
        setTimeout(() => {
            messageDiv.classList.add('hidden');
        }, 3000);
    }
});