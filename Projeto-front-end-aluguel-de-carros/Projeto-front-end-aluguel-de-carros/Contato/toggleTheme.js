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
