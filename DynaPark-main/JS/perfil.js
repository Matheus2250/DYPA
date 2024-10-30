window.onload = function() {
    const profileForm = document.getElementById('profileForm');
    const profileImageInput = document.getElementById('profileImageInput');
    const profileImage = document.getElementById('profileImage');
    const menuIcon = document.querySelectorAll('.menu-btn img'); // Seleciona todas as imagens do menu

    // Carregar o usuário atual do localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
        document.getElementById('firstName').value = storedUser.firstName;
        document.getElementById('lastName').value = storedUser.lastName;

        if (storedUser.profileImage) {
            profileImage.src = storedUser.profileImage;  // Define a imagem de perfil
            menuIcon.forEach(icon => icon.src = storedUser.profileImage); // Atualiza todas as imagens de ícone do menu
        }
    }

    // Alteração da imagem de perfil ao selecionar um novo arquivo
    profileImageInput.addEventListener('change', function() {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            menuIcon.forEach(icon => icon.src = e.target.result); // Atualiza o ícone do menu com a nova imagem
        };
        reader.readAsDataURL(this.files[0]);
    });

    // Salvando alterações
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const profileImageSrc = profileImage.src;

        // Atualiza o usuário no localStorage
        const updatedUser = { ...storedUser, firstName, lastName, profileImage: profileImageSrc };
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

        // Exibe a mensagem de sucesso e redireciona
        alert('Alterações salvas com sucesso!');
        window.location.href = 'home.html';
    });

    // Código para abrir e fechar o menu lateral
    document.getElementById('menuBtn').addEventListener('click', () => {
        document.getElementById('sideMenu').style.width = "250px";
    });
    document.getElementById('closeBtn').addEventListener('click', () => {
        document.getElementById('sideMenu').style.width = "0";
    });
};