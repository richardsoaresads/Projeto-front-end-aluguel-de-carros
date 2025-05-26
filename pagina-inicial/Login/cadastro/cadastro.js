// Função para buscar o logradouro com base no CEP
function buscarLogradouro(cep) {
    // Verifica se o CEP está no formato correto
    if (cep.length === 10) {
        // Remove o hífen para fazer a requisição
        const cepSemHifen = cep.replace('-', '');
        
        // URL da API do ViaCEP
        const url = `https://viacep.com.br/ws/${cepSemHifen}/json/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao buscar o logradouro');
                }
                return response.json();
            })
            .then(data => {
                // Verifica se o logradouro foi encontrado
                if (data.logradouro) {
                    // Preenche o campo de logradouro
                    document.querySelector('input[name="endereço"]').value = data.logradouro;
                    document.querySelector('input[name="bairro"]').value = data.bairro; // Preenche o bairro
                    document.querySelector('input[name="estado"]').value = data.uf; // Preenche o estado
                } else {
                    alert('Logradouro não encontrado para o CEP informado.');
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao buscar o logradouro. Verifique o CEP e tente novamente.');
            });
    }
}

// Função para criar um perfil ao clicar no botão de cadastro
document.getElementById('cadastrarButton').addEventListener('click', function(event) {
    // Coleta os dados do formulário
    const form = document.getElementById('cadastroForm');
    
    // Verifica se o formulário é válido
    if (form.checkValidity()) {
        const formData = new FormData(form);
        const perfil = {};

        formData.forEach((value, key) => {
            perfil[key] = value; // Adiciona os dados ao objeto perfil
        });

        console.log('Perfil criado:', perfil);
        alert('Cadastro realizado com sucesso!'); // Mensagem de sucesso

        // Aqui você pode enviar os dados para o servidor, se necessário
        // Exemplo: fetch('/cadastrar', { method: 'POST', body: formData });
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});
