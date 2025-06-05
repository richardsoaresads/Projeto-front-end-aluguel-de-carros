document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = this.nome.value.trim();
    const materno = this.materno.value.trim();
    const sobrenome = this.sobrenome.value.trim();
    const dob = this.dob.value;
    const sexo = this.sexo.value;
    const telefone = this.telefone.value.trim();
    const email = this.email.value.trim().toLowerCase(); // padroniza
    const cpf = this.cpf.value.trim();
    const endereco = this.endereço.value.trim();
    const estado = this.estado.value.trim();
    const bairro = this.bairro.value.trim();
    const numero = this.número.value.trim();
    const complemento = this.complemento.value.trim();
    const senha = this.senha.value;
    const confirmacao = this.confirmacao.value;

    if (senha !== confirmacao) {
        alert("As senhas não coincidem.");
        return;
    }

    // Carrega usuários existentes
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (usuarios[email]) {
        alert("Este e-mail já está cadastrado.");
        return;
    }

    usuarios[email] = {
        nome,
        materno,
        sobrenome,
        dob,
        sexo,
        telefone,
        cpf,
        endereco,
        estado,
        bairro,
        numero,
        complemento,
        senha // armazenada em texto 
    };

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");
    window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle-button');

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            toggleButton.textContent = '☀️'; // Muda para sol
        } else {
            toggleButton.textContent = '🌙'; // Muda para lua
        }
    });
});

// Verifica a preferência do tema ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.textContent = '☀️'; // Ícone para tema escuro
    }