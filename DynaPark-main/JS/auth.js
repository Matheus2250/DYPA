window.onload = function() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const successPopup = document.getElementById('registerSuccess');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const cpf = document.getElementById('cpf').value;

            // Verifica se o email já está cadastrado
            if (localStorage.getItem(email)) {
                alert('Email já cadastrado!');
                return;
            }

            // Salva os dados do usuário no localStorage com o email como chave
            const user = { firstName, lastName, email, password, cpf };
            localStorage.setItem(email, JSON.stringify(user));

            // Mostra a mensagem de sucesso
            if (successPopup) {
                successPopup.style.display = 'block';
            }

            // Redireciona para a tela de login após 2 segundos
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Recupera o usuário armazenado pelo email
            const storedUser = JSON.parse(localStorage.getItem(email));

            // Verificação se os dados do usuário foram encontrados no localStorage
            if (storedUser) {
                if (storedUser.email === email && storedUser.password === password) {
                    console.log('Login bem-sucedido');
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('currentUser', JSON.stringify(storedUser)); // Armazena o usuário logado
                    window.location.href = 'home.html'; // Redireciona para a home
                } else {
                    console.log('Email ou senha incorretos');
                    alert('Email ou senha incorretos.');
                }
            } else {
                console.log('Nenhum usuário encontrado');
                alert('Nenhum usuário encontrado. Por favor, registre-se.');
            }
        });
    }

    // Verifica se estamos na página home e se o usuário está logado
    if (window.location.pathname.includes('home.html')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Recupera o usuário logado
        if (currentUser) {
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = `${currentUser.firstName} ${currentUser.lastName}`; // Exibe o nome completo
            }
        } else {
            // Se não estiver logado, redireciona para a página de login
            window.location.href = 'index.html';
        }
    }
};
