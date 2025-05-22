<?php
$host = "sql210.byethost11.com"; // o host exato fornecido no painel
$user = "b11_39053981"; // seu usuário do banco
$pass = "Auxiliardesuporte2"; // sua senha
$db   = "b11_39053981_restaurante"; // nome do banco

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}
?>