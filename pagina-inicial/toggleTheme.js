// Script para alternar tema claro/escuro, adicionando botão na barra de navegação

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
    }

    // Evento click do botão
    toggleButton.addEventListener('click', toggleTheme);
});

