window.onload = function() {
    const vehicleList = document.getElementById('vehicleList');
    const favoriteVehicleDiv = document.getElementById('favoriteVehicle');
    
    // Captura os elementos do menu
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeBtn');
    const sideMenu = document.getElementById('sideMenu');

    // Função para abrir o side menu
    menuBtn.addEventListener('click', () => {
        sideMenu.style.width = "250px";
    });

    // Função para fechar o side menu
    closeBtn.addEventListener('click', () => {
        sideMenu.style.width = "0";
    });

    // Função para carregar a lista de veículos
    function loadVehicles() {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        vehicleList.innerHTML = '';
        vehicles.forEach((vehicle, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${vehicle.plate} - ${vehicle.brand} - ${vehicle.model} 
                <button onclick="removeVehicle(${index})">Excluir</button>
                <button onclick="setFavorite(${index})">Favoritar</button>`;
            vehicleList.appendChild(li);
        });
    }

    // Função para definir um veículo como favorito
    window.setFavorite = function(index) {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        const favoriteVehicle = vehicles[index];
        localStorage.setItem('favoriteVehicle', JSON.stringify(favoriteVehicle));
        loadFavoriteVehicle(); // Atualiza a exibição do veículo favorito
    };

    // Função para carregar o veículo favorito
    function loadFavoriteVehicle() {
        const favoriteVehicle = JSON.parse(localStorage.getItem('favoriteVehicle'));
        favoriteVehicleDiv.innerHTML = favoriteVehicle 
            ? `${favoriteVehicle.plate} - ${favoriteVehicle.brand} - ${favoriteVehicle.model}` 
            : 'Nenhum veículo favorito.';
    }

    // Função para remover um veículo
    window.removeVehicle = function(index) {
        const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
        vehicles.splice(index, 1);
        localStorage.setItem('vehicles', JSON.stringify(vehicles));
        loadVehicles(); // Recarrega a lista após a exclusão
        loadFavoriteVehicle(); // Atualiza o veículo favorito
    };

    loadVehicles(); // Carrega a lista quando a página é carregada
    loadFavoriteVehicle(); // Carrega o veículo favorito quando a página é carregada
};