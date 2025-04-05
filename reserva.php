<?php
$host = "sql301.infinityfree.com";
$user = "if0_38679193";
$password = "sUEBKsU9Uy6ahp";
$dbname = "if0_38679193_XXX";


$conn = new mysqli($host, $user, $password, $dbname);
if ($coon->connect_error) {
    die("Erro na conexção: " . $conn->connect_error);
}

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


$sql = "INSERT INTO reservas
        (nome, email, telefone, data_reserva, hora, convidados, tipo, mesa, alergia, extras, confirmacao)
        VALUES
        ('$nome', '$email', '$telefone', '$data', '$hora', '$convidados', '$tipo', '$mesa', '$alergia', '$extras', '$confirmacao')";

if ($conn->($sql) === TRUE) {
    echo "Reserva Realizada com Sucesso!";
} else {
    echo "Erro ao enviar reserva: " . $conn->error;
}

$conn->close();
?>