<?php
include 'db_connection.php';

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    // Login de usuário
    if ($action == 'login') {
        if (isset($_POST['email'], $_POST['password'])) {
            $email = $_POST['email'];
            $password = $_POST['password'];

            $sql = "SELECT cpf, senha FROM tb_pessoa WHERE email = ?";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $stmt->store_result();

                if ($stmt->num_rows > 0) {
                    $stmt->bind_result($userId, $hashedPassword);
                    $stmt->fetch();

                    if (password_verify($password, $hashedPassword)) {
                        // Mensagem temporária para garantir o redirecionamento correto
                        echo "Login bem-sucedido! Redirecionando para a página inicial...";
                        header("Refresh: 3; URL=HTML/home.html"); // Redireciona para home.html após o login
                        exit();
                    } else {
                        echo "Senha incorreta.";
                    }
                } else {
                    echo "Email não encontrado.";
                }
                $stmt->close();
            } else {
                echo "Erro ao preparar a consulta: " . $conn->error;
            }
        } else {
            echo "Por favor, preencha todos os campos.";
        }

    // Registro de novo usuário
    } elseif ($action == 'register_user') {
        if (isset($_POST['firstName'], $_POST['lastName'], $_POST['email'], $_POST['password'], $_POST['cpf'])) {
            $firstName = $_POST['firstName'];
            $lastName = $_POST['lastName'];
            $email = $_POST['email'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
            $cpf = $_POST['cpf'];
            $cargoId = 1;

            $sql = "INSERT INTO tb_pessoa (nome, sobrenome, email, senha, cpf, tb_cargo_cd_cargo) VALUES (?, ?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);

            if ($stmt) {
                $stmt->bind_param("sssssi", $firstName, $lastName, $email, $password, $cpf, $cargoId);
                if ($stmt->execute()) {
                    echo "Registro bem-sucedido! Redirecionando para a tela de login...";
                    header("Refresh: 3; URL=HTML/login.html");
                    exit();
                } else {
                    echo "Erro ao registrar usuário: " . $stmt->error;
                }
                $stmt->close();
            } else {
                echo "Erro ao preparar a consulta: " . $conn->error;
            }
        } else {
            echo "Por favor, preencha todos os campos.";
        }

    } else {
        echo "Ação inválida.";
    }
}

$conn->close();
?>
