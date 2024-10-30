window.onload = function() { 
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Recupera o usuário logado
    const menuIcon = document.getElementById('menuIcon');

    if (currentUser) {
        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
        }
        if (currentUser.profileImage) {
            menuIcon.src = currentUser.profileImage; // Atualizar o ícone do menu com a foto de perfil
        }
    } else {
        // Se não estiver logado, redireciona para a página de login
        window.location.href = 'index.html';
    }

    loadHistorico(); // Carrega o histórico ao carregar a página
};


let startTime;
let timerInterval;
const timerElement = document.getElementById('timer');
const entradaBtn = document.getElementById('entradaBtn');
const saidaBtn = document.getElementById('saidaBtn');
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const closeBtn = document.getElementById('closeBtn');
const historicoList = document.getElementById('historicoList');
const limparHistoricoBtn = document.getElementById('limparHistoricoBtn');

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    startTime = Math.floor(Date.now() / 1000);
    entradaBtn.disabled = true;
    saidaBtn.disabled = false;

    timerInterval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const elapsedTime = currentTime - startTime;
        timerElement.textContent = `Tempo: ${formatTime(elapsedTime)}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    const endTime = Math.floor(Date.now() / 1000);
    const elapsedTime = endTime - startTime;

    entradaBtn.disabled = false;
    saidaBtn.disabled = true;
    timerElement.textContent = 'Tempo: 00:00:00';

    const totalMinutes = Math.floor(elapsedTime / 60);
    const remainingSeconds = elapsedTime % 60;
    const valorAPagar = (totalMinutes + remainingSeconds / 60) * 5;

    const entradaData = new Date(startTime * 1000).toLocaleString();
    const saidaData = new Date(endTime * 1000).toLocaleString();

    // Recupera os dados do veículo favorito do localStorage
    const favoriteVehicle = JSON.parse(localStorage.getItem('favoriteVehicle'));
    const favoriteInfo = favoriteVehicle ? 
        `<strong>Veículo Favorito:</strong> ${favoriteVehicle.plate} - ${favoriteVehicle.brand} - ${favoriteVehicle.model}<br>` : 
        `<strong>Veículo Favorito:</strong> Nenhum veículo favorito.<br>`;

    // Exibe o histórico de estacionamento
    const historicoItem = document.createElement('li');
    historicoItem.innerHTML = `
        ${favoriteInfo}
        <strong>Entrada:</strong> ${entradaData}<br>
        <strong>Saída:</strong> ${saidaData}<br>
        <strong>Tempo:</strong> ${formatTime(elapsedTime)}<br>
        <strong>Valor:</strong> R$ ${valorAPagar.toFixed(2)}
    `;
    historicoList.appendChild(historicoItem);

    // Armazena o histórico no localStorage
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historico.push({
        veiculoFavorito: favoriteVehicle ? `${favoriteVehicle.plate} - ${favoriteVehicle.brand} - ${favoriteVehicle.model}` : 'Nenhum veículo favorito',
        entrada: entradaData,
        saida: saidaData,
        tempo: formatTime(elapsedTime),
        valor: valorAPagar.toFixed(2)
    });
    localStorage.setItem('historico', JSON.stringify(historico));

    alert(`Tempo total: ${formatTime(elapsedTime)}\nValor a ser pago: R$ ${valorAPagar.toFixed(2)}`);
}


// Função para carregar o histórico ao carregar a página
function loadHistorico() {
    const historico = JSON.parse(localStorage.getItem('historico')) || [];
    historicoList.innerHTML = '';
    historico.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Veículo Favorito:</strong> ${item.veiculoFavorito}<br>
            <strong>Entrada:</strong> ${item.entrada}<br>
            <strong>Saída:</strong> ${item.saida}<br>
            <strong>Tempo:</strong> ${item.tempo}<br>
            <strong>Valor:</strong> R$ ${item.valor}
        `;
        historicoList.appendChild(li);
    });
}

// Função para limpar o histórico
function clearHistorico() {
    localStorage.removeItem('historico'); // Remove o histórico do localStorage
    historicoList.innerHTML = ''; // Limpa a lista de histórico na interface
    alert('Histórico de estacionamento limpo!'); // Exibe mensagem de confirmação
}

// Funções para abrir e fechar o menu
menuBtn.addEventListener('click', () => {
    sideMenu.style.width = "250px";
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.width = "0";
});

entradaBtn.addEventListener('click', startTimer);
saidaBtn.addEventListener('click', stopTimer);
limparHistoricoBtn.addEventListener('click', clearHistorico); // Adiciona o evento para limpar o histórico