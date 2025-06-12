document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o menu principal onde o botão será adicionado
    const navList = document.querySelector('.header nav ul');
    if (!navList) return; // Proteção caso elemento não exista

    // Cria o botão circular para alternar tema
    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'theme-toggle-button';
    toggleButton.setAttribute('aria-label', 'Alternar tema claro e escuro');
    toggleButton.textContent = '🌙';  // Ícone inicial: lua (tema claro)

    // Insere o botão como último item da lista
    const li = document.createElement('li');
    li.appendChild(toggleButton);
    navList.appendChild(li);

    // Função que aplica/remover a classe dark-theme no body
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        toggleButton.textContent = isDark ? '☀️' : '🌙'; // Troca ícone
        localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Salva a preferência no localStorage
    }

    // Verifica a preferência do tema ao carregar a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.textContent = '☀️'; // Ícone para tema escuro
    }

    // Evento click do botão
    toggleButton.addEventListener('click', toggleTheme);
});

    //Botão do perfil
    const profileBtn = document.getElementById('profileButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

function isUserLoggedIn() {
  return !!localStorage.getItem('usuario');
}

function getUser() {
    try {
    return JSON.parse(localStorage.getItem('usuario'));
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem('usuario');
  updateDropdownOptions();
  alert('Log-out efetuado com sucesso!');
}

function showProfile() {
  const user = getUser();
  if (user) {
    alert(`Perfil:\nNome: ${user.name}\nEmail: ${user.email}`);
  }
}

function updateDropdownOptions() {
  const loggedIn = isUserLoggedIn();
  dropdownMenu.innerHTML = '';

  if (loggedIn) {
    // Botão Perfil - redireciona para a página de perfil
    const profileBtnOption = document.createElement('button');
    profileBtnOption.textContent = 'Perfil';
    profileBtnOption.type = 'button';
    profileBtnOption.addEventListener('click', () => {
      window.location.href = '/Perfil/perfil.html'; // Redireciona para a página de perfil
      toggleDropdown(false);
    });

    // Botão Log-out
    const logoutBtnOption = document.createElement('button');
    logoutBtnOption.textContent = 'Log-out';
    logoutBtnOption.type = 'button';
    logoutBtnOption.addEventListener('click', () => {
      logout();
      toggleDropdown(false);
    });

    dropdownMenu.appendChild(profileBtnOption);
    dropdownMenu.appendChild(logoutBtnOption);

  } else {
    // Botão Log-in - redireciona para a página de login
    const loginBtnOption = document.createElement('button');
    loginBtnOption.textContent = 'Log-in';
    loginBtnOption.type = 'button';
    loginBtnOption.addEventListener('click', () => {
      window.location.href = '/Perfil/login.html';
      toggleDropdown(false);
    });

    dropdownMenu.appendChild(loginBtnOption);
  }
}

function toggleDropdown(show) {
  if (show === undefined) {
    show = !dropdownMenu.classList.contains('show');
  }

  dropdownMenu.classList.toggle('show', show);
  profileBtn.setAttribute('aria-expanded', String(show));

  if (show) {
    const firstBtn = dropdownMenu.querySelector('button');
    if (firstBtn) firstBtn.focus();
  }
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
  if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
    toggleDropdown(false);
  }
});

// Fechar dropdown ao redimensionar janela
window.addEventListener('resize', () => {
  toggleDropdown(false);
});

// Abrir ou fechar dropdown ao clicar no botão
profileBtn.addEventListener('click', () => {
  toggleDropdown();
});

// Inicializa as opções corretas no carregamento
updateDropdownOptions();