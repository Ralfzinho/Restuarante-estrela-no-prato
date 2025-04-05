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

form.addEventListener('submit', function (e) {
  // Combina checkboxes da mesa
  const mesa = [...form.querySelectorAll('input[name="mesa[]"]:checked')]
                .map(el => el.value).join(', ');
  // Combina checkboxes da confirmação
  const confirmacao = [...form.querySelectorAll('input[name="confirmacao[]"]:checked')]
                       .map(el => el.value).join(', ');

  // Cria inputs escondidos que serão enviados no lugar dos arrays
  const mesaInput = document.createElement('input');
  mesaInput.type = 'hidden';
  mesaInput.name = 'data[mesa]';
  mesaInput.value = mesa;

  const confirmacaoInput = document.createElement('input');
  confirmacaoInput.type = 'hidden';
  confirmacaoInput.name = 'data[confirmacao]';
  confirmacaoInput.value = confirmacao;

  form.appendChild(mesaInput);
  form.appendChild(confirmacaoInput);
});