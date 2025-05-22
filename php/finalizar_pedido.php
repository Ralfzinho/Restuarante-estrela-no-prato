<?php
session_start();
include 'conexao.php'; // Arquivo de conexão com o banco de dados

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recebe dados do formulário
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $pagamento = $_POST['pagamento'];
    $observacoes = $_POST['observacoes'];
    $carrinho_json = $_POST['carrinho_json'];
    $data = date("Y-m-d H:i:s");

    // Verifica se o carrinho está presente
    if (empty($carrinho_json)) {
        die("Erro: Carrinho vazio.");
    }

    $carrinho = json_decode($carrinho_json, true);
    if (!$carrinho || !is_array($carrinho)) {
        die("Erro ao decodificar o carrinho.");
    }

    // Calcula o total do pedido
    $valor_total = 0;
    foreach ($carrinho as $item) {
        $valor_total += $item['price'] * $item['quantity'];
    }

    // 1. Inserir cliente
    $stmt = $conn->prepare("INSERT INTO Cliente (nome, email, telefone) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nome, $email, $telefone);
    $stmt->execute();
    $id_cliente = $stmt->insert_id;

    // 2. Inserir pedido
    $stmt = $conn->prepare("INSERT INTO Pedido (id_cliente, data_pedido, valor_total, forma_pagamento, observacoes) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("isdss", $id_cliente, $data, $valor_total, $pagamento, $observacoes);
    $stmt->execute();
    $id_pedido = $stmt->insert_id;

    // 3. Inserir itens do pedido
    $stmt = $conn->prepare("INSERT INTO ItemPedido (id_pedido, id_prato, quantidade, preco_unitario) VALUES (?, ?, ?, ?)");
    foreach ($carrinho as $item) {
        $id_prato = buscarOuCriarPrato($conn, $item['name'], $item['price'], $item['img']); // função auxiliar
        $quantidade = $item['quantity'];
        $preco = $item['price'];
        $stmt->bind_param("iiid", $id_pedido, $id_prato, $quantidade, $preco);
        $stmt->execute();
    }

    // Redireciona para página de confirmação
    header("Location: ../pages/obrigado.html");
    exit;
}

// Função que busca ou insere um prato se não existir (caso o prato não esteja no banco ainda)
function buscarOuCriarPrato($conn, $nome, $preco, $imagem) {
    $stmt = $conn->prepare("SELECT id_prato FROM Prato WHERE nome = ?");
    $stmt->bind_param("s", $nome);
    $stmt->execute();
    $stmt->bind_result($id_prato);
    if ($stmt->fetch()) {
        return $id_prato;
    } else {
        $stmt->close();
        $stmt = $conn->prepare("INSERT INTO Prato (nome, preco, imagem) VALUES (?, ?, ?)");
        $stmt->bind_param("sds", $nome, $preco, $imagem);
        $stmt->execute();
        return $stmt->insert_id;
    }
}
?>
