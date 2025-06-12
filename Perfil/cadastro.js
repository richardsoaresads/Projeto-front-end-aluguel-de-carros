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
        senha 
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
            toggleButton.textContent = '☀️'; 
        } else {
            toggleButton.textContent = '🌙';
        }
    });
});


    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.textContent = '☀️';
    }
    function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    const logradouro = document.querySelector('input[name="endereço"]');
    const estado = document.querySelector('input[name="estado"]');
    const bairro = document.querySelector('input[name="bairro"]');
    const numero = document.querySelector('input[name="número"]');
    const complemento = document.querySelector('input[name="complemento"]');

    if (cep.length === 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    logradouro.value = data.logradouro;
                    estado.value = data.uf;
                    bairro.value = data.bairro;
                    
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o CEP:', error);
                alert('Erro ao buscar o CEP. Tente novamente.');
            });
    } else {
        alert('CEP inválido. Deve conter 8 dígitos.');
    }
}
