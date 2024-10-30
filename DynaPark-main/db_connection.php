<?php
// Configurações de conexão ao banco de dados
$host = '127.0.0.1'; // IP local para conexão com o banco
$username = 'root'; // seu usuário MySQL
$password = ''; // sua senha MySQL
$database = 'bd_dynapark'; // nome do banco de dados

// Conexão
$conn = new mysqli($host, $username, $password, $database);

// Verificar conexão
if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}
echo "Conexão bem-sucedida";
?>
