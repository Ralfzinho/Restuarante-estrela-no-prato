<?php
// CONEXÃO
$host = 'amorously-cleansing-warthog.data-1.use1.tembo.ioT';
$db   = 'reservas_restaurante';
$user = 'postgres';
$pass = 'yZEZAkuwUKfJmPD1';
$port = '5432';

$conn = pg_connect("host=$host port=$port dbname=$db user=$user password=$pass");

if (!$conn) {
    die("Erro ao conectar: " . pg_last_error());
}

// PEGANDO DADOS DO FORMULÁRIO
$nome       = $_POST['nome'];
$email      = $_POST['email'];
$telefone   = $_POST['telefone'];
$data       = $_POST['data'];
$hora       = $_POST['hora'];
$convidados = $_POST['convidados'];
$tipo       = $_POST['tipo'];
$mesa       = isset($_POST['mesa']) ? implode(", ", $_POST['mesa']) : null;
$alergia    = $_POST['alergia'];
$extras     = $_POST['extras'];
$confirmacao = isset($_POST['confirmacao']) ? implode(", ", $_POST['confirmacao']) : null;

// QUERY DE INSERT
$query = "INSERT INTO reservas (
    nome, email, telefone, data_reserva, hora_reserva, convidados, tipo, mesa, alergia, extras, confirmacao
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
)";

$result = pg_query_params($conn, $query, [
    $nome, $email, $telefone, $data, $hora, $convidados, $tipo, $mesa, $alergia, $extras, $confirmacao
]);

if ($result) {
    echo "Reserva registrada com sucesso!";
} else {
    echo "Erro ao registrar reserva: " . pg_last_error($conn);
}

pg_close($conn);
?>
