document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle-button');

    // Função que aplica/remover a classe dark-theme no body
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        toggleButton.textContent = isDark ? '☀️' : '🌙'; // Troca ícone
    }

    // Evento click do botão
    toggleButton.addEventListener('click', toggleTheme);
});