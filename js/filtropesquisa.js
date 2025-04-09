// Espera o HTML estar completamente carregado antes de rodar o JS
document.addEventListener("DOMContentLoaded", function () {

    // Seleciona todos os botões que têm o atributo data-filtro
    const botoes = document.querySelectorAll("[data-filtro]");

    // Seleciona todos os itens que têm o atributo data-categoria (ou seja, os cards do menu)
    const itens = document.querySelectorAll("[data-categoria]");

    // Para cada botão de filtro...
    botoes.forEach(botao => {

        // Adiciona um ouvinte de clique a esse botão
        botao.addEventListener("click", () => {

            // Pega o valor do filtro (ex: "bebidas", "pratos", "sobremesas", etc.)
            const filtro = botao.getAttribute("data-filtro");

            // Remove a classe 'active' de todos os botões (pra limpar os estilos)
            botoes.forEach(btn => btn.classList.remove("active"));

            // Adiciona a classe 'active' ao botão que foi clicado
            botao.classList.add("active");

            // Agora filtra os itens do cardápio
            itens.forEach(item => {

                // Pega a categoria do item atual (ex: "bebidas", "sobremesa")
                const categoria = item.getAttribute("data-categoria");

                // Sobe um nível até a div de colunas (que é o container externo do card)
                const container = item.closest(".col-md-6.col-lg-4");

                // Se o filtro for "todos" ou se a categoria bater com o filtro clicado...
                if (filtro === "todos" || filtro === categoria) {

                    // Mostra o item e seu container
                    item.classList.remove("d-none");
                    container.classList.remove("d-none");

                } else {

                    // Esconde o item e seu container
                    item.classList.add("d-none");
                    container.classList.add("d-none");
                }
            });
        });
    });
});
