const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');

let cart = [];

// Salva o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(cart));
}

// Carrega o carrinho do localStorage
function carregarCarrinho() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
        cart = JSON.parse(carrinhoSalvo);
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartSubtotal.textContent = '0,00';
        cartTotal.textContent = '0,00';
        salvarCarrinho(); // salva mesmo que vazio
        return;
    }

    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('d-flex', 'align-items-center', 'mb-3');
        itemDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;" class="me-2 rounded border">
            <div class="flex-grow-1">
                <strong>${item.name}</strong><br>
                R$ ${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-md btn-custom me-1" onclick="changeQuantity(${index}, -1)">-</button>
                <button class="btn btn-md btn-custom me-1" onclick="changeQuantity(${index}, 1)">+</button>
                <button class="btn btn-md btn-custom" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    cartSubtotal.textContent = subtotal.toFixed(2);
    cartTotal.textContent = subtotal.toFixed(2);
    salvarCarrinho();
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartDisplay();
}

document.querySelectorAll(".add-to-cart-btn").forEach(button => {
    button.addEventListener("click", function () {
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const img = this.dataset.img;

        // Verificação de dados
        if (!name || isNaN(price) || !img) {
            console.warn("Item com dados inválidos foi ignorado:", { name, price, img });
            return;
        }

        addToCart({ name, price, img });
    });
});

function validarpedido() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.");
        return false;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (total < 50) {
        alert("O pedido mínimo é de R$ 50,00.");
        return false;
    }

    return true;
}

function finalizarpedido() {
    if (!validarpedido()) return;

    console.log("Pedido validado e pronto pra ser enviado", cart);

    // Aqui você pode adicionar lógica de envio do pedido (API, WhatsApp, etc.)

    alert("Pedido finalizado com sucesso!");

    // Limpa carrinho após finalizar
    cart = [];
    localStorage.removeItem('carrinho');
    updateCartDisplay();
}

// Carrega o carrinho ao iniciar a página
carregarCarrinho();
