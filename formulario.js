// Obtém referência ao formulário de contato pelo ID
const form = document.getElementById("form-contato");

// Adiciona um listener para o evento de submit do formulário
form.addEventListener("submit", event => {
    // Verifica se o formulário não passa na validação HTML5
    if (!form.checkValidity()) {
        // Impede o comportamento padrão de submit se o formulário for inválido
        event.preventDefault();
        // Interrompe a propagação do evento para outros listeners
        event.stopPropagation();
    }
    
    // Adiciona a classe 'was-validated' para ativar os estilos de feedback de validação
    // (usado pelo Bootstrap para mostrar mensagens de validação)
    form.classList.add("was-validated");
}, false);