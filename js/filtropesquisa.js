document.addEventListener("DOMContentLoaded", function () {
    const botoes = document.querySelectorAll("[data-filtro]");
    const itens = document.querySelectorAll("[data-categoria]");

    // Filtro via botões de categoria
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const filtro = botao.getAttribute("data-filtro");
            botoes.forEach(btn => btn.classList.remove("active"));
            botao.classList.add("active");

            // Itera sobre cada item e aplica o filtro
            itens.forEach(item => {
                const categoria = item.getAttribute("data-categoria");
                const container = item.closest(".col-md-6.col-lg-3");

                if (filtro === "todos" || filtro === categoria) {
                    item.classList.remove("d-none");
                    container.classList.remove("d-none");
                } else {
                    item.classList.add("d-none");
                    container.classList.add("d-none");
                }
            });
        });
    });

    // Filtro via campo de busca em tempo real
    const campoBusca = document.getElementById("campoBusca");
    campoBusca.addEventListener("input", () => {
        const termo = campoBusca.value.toLowerCase();

        itens.forEach(item => {
            const container = item.closest(".col-md-6.col-lg-3");
            // Pega todo o texto do item (title, descrição, etc.) e converte para minúsculas
            const texto = item.innerText.toLowerCase();

            if (texto.includes(termo)) {
                item.classList.remove("d-none");
                container.classList.remove("d-none");
            } else {
                item.classList.add("d-none");
                container.classList.add("d-none");
            }
        });
    });
});
