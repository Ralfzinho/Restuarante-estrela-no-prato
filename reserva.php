<?php
$host = "sql301.infinityfree.com";
$user = "if0_38679193";
$password = "sUEBKsU9Uy6ahp";
$dbname = "if0_38679193_db_reserva"; // substitua pelo nome correto do seu banco

// CORREÇÃO: variável estava errada ($coon -> $conn)
$conn = new mysqli($host, $user, $password, $dbname);
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Recebe os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$data = $_POST['data'];
$hora = $_POST['hora'];
$convidados = $_POST['convidados'];
$tipo = $_POST['tipo'];
$mesa = isset($_POST['mesa']) ? implode(", ", $_POST['mesa']) : "";
$alergia = $_POST['alergia'];
$extras = $_POST['extras'];
$confirmacao = isset($_POST['confirmacao']) ? implode(", ", $_POST['confirmacao']) : "";

// Cria a SQL
$sql = "INSERT INTO reservas 
        (nome, email, telefone, data_reserva, hora, convidados, tipo, mesa, alergia, extras, confirmacao)
        VALUES 
        ('$nome', '$email', '$telefone', '$data', '$hora', '$convidados', '$tipo', '$mesa', '$alergia', '$extras', '$confirmacao')";

// CORREÇÃO: chamada do método estava errada -> $conn->($sql) -> $conn->query($sql)
if ($conn->query($sql) === TRUE) {
    echo "Reserva realizada com sucesso!";
} else {
    echo "Erro ao enviar reserva: " . $conn->error;
}

$conn->close();
?>
