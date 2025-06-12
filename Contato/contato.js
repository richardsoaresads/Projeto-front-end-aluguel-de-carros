document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle-button');
    const profileBtn = document.getElementById('profileButton');
    const dropdownMenu = document.getElementById('dropdownMenu');


    // Tema (claro/escuro)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.textContent = '☀️';
    }

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        toggleButton.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });


    // Botão do perfil
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

    function updateDropdownOptions() {
        const loggedIn = isUserLoggedIn();
        dropdownMenu.innerHTML = '';

        if (loggedIn) {
            const profileBtnOption = document.createElement('button');
            profileBtnOption.textContent = 'Perfil';
            profileBtnOption.type = 'button';
            profileBtnOption.addEventListener('click', () => {
                window.location.href = '/Perfil/perfil.html';
                toggleDropdown(false);
            });

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


    // ================================
    profileBtn.addEventListener('click', () => {
        toggleDropdown();
    });

    document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            toggleDropdown(false);
        }
    });

    window.addEventListener('resize', () => {
        toggleDropdown(false);
    });

    updateDropdownOptions();
});
