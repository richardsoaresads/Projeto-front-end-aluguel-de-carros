document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario) {
    alert("Nenhum usuário logado. Redirecionando para login.");
    window.location.href = "/Perfil/login.html";
    return;
}

    const fotoPerfil = document.getElementById('fotoPerfil');
    const uploadFoto = document.getElementById('uploadFoto');

    if (usuario) {
        document.getElementById('nomeUsuario').textContent = `${usuario.nome} ${usuario.sobrenome}`;
        document.getElementById('emailUsuario').textContent = usuario.email;
        document.getElementById('dobUsuario').textContent = usuario.dob;
        document.getElementById('sexoUsuario').textContent = usuario.sexo;
        document.getElementById('enderecoUsuario').textContent = usuario.endereco;
        document.getElementById('bairroUsuario').textContent = usuario.bairro;
        document.getElementById('numeroUsuario').textContent = usuario.numero;
        document.getElementById('complementoUsuario').textContent = usuario.complemento;

        if (usuario.fotoPerfil) {
            fotoPerfil.src = usuario.fotoPerfil;
        }
    }

    fotoPerfil.parentElement.addEventListener('click', () => {
        uploadFoto.click();
    });

    uploadFoto.addEventListener('change', () => {
        const file = uploadFoto.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                fotoPerfil.src = e.target.result;
                usuario.fotoPerfil = e.target.result;
                localStorage.setItem('usuario', JSON.stringify(usuario));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione um arquivo de imagem válido.');
        }
    });

       // Voltar pra página de início    
    document.getElementById('paginaInicial').addEventListener('click', () => {
        window.location.href= '/Inicio/inicio.html';
    });

    document.getElementById('sair').addEventListener('click', () => {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
});
});


// Botão de alternância de tema
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.theme-toggle-button');

    if (!toggleButton) return;

    // Alterna tema claro/escuro
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark-theme');
        toggleButton.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Aplica o tema salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleButton.textContent = '☀️';
    }

    toggleButton.addEventListener('click', toggleTheme);
});
