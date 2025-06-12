document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle-button');
  
    // Aplicar tema salvo no carregamento
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      toggleButton.textContent = '☀️';
    }
  
    // Alternar tema
    toggleButton.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      toggleButton.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  
    // Formulário de cadastro
    const form = document.getElementById('cadastroForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const nome = this.nome.value.trim();
      const materno = this.materno.value.trim();
      const sobrenome = this.sobrenome.value.trim();
      const dob = this.dob.value;
      const sexo = this.sexo.value;
      const telefone = this.telefone.value.trim();
      const telefone_fixo = this.telefone_fixo.value.trim();
      const email = this.email.value.trim().toLowerCase();
      const cpf = this.cpf.value.trim();
      const cep = this.cep.value.trim();
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
        telefone_fixo,
        email,
        cpf,
        cep,
        endereco,
        estado,
        bairro,
        numero,
        complemento,
        senha
      };
  
      // Armazena o usuário no localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuario', JSON.stringify(usuarios[email]));
  
      alert("Cadastro realizado com sucesso!");
      window.location.href = '/Perfil/login.html';
    });
  });
  
  // Buscar endereço pelo CEP
  function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
    if (cep.length !== 8) {
      alert('CEP inválido. Deve conter 8 dígitos.');
      return;
    }
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.querySelector('[name="endereço"]').value = data.logradouro || '';
          document.querySelector('[name="estado"]').value = data.uf || '';
          document.querySelector('[name="bairro"]').value = data.bairro || '';
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar o CEP:', error);
        alert('Erro ao buscar o CEP. Tente novamente.');
      });
  }
  