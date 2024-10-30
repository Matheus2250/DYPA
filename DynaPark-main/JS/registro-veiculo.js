window.onload = function() {
    const registerVehicleForm = document.getElementById('registerVehicleForm');

    if (registerVehicleForm) {
        registerVehicleForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const plate = document.getElementById('plate').value;
            const brand = document.getElementById('brand').value;
            const model = document.getElementById('model').value;

            // Verifica se o veículo já está registrado
            const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
            const vehicleExists = vehicles.some(vehicle => vehicle.plate === plate);

            if (vehicleExists) {
                alert('Veículo já registrado!');
                return;
            }

            // Adiciona o novo veículo à lista
            vehicles.push({ plate, brand, model });
            localStorage.setItem('vehicles', JSON.stringify(vehicles));

            // Exibe a mensagem de sucesso
            alert('Registro do veículo concluído.');

            // Redireciona para a página de veículos
            window.location.href = 'veiculo.html';
        });
    }

    menuBtn.addEventListener('click', () => {
        sideMenu.style.width = "250px";
    });
    
    closeBtn.addEventListener('click', () => {
        sideMenu.style.width = "0";
    });
    
    entradaBtn.addEventListener('click', startTimer);
    saidaBtn.addEventListener('click', stopTimer);
};