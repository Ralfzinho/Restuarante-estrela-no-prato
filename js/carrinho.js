const cartItemsContainer = document.getElementById('cart-items-container');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');

let cart = [];

function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        cartSubtotal.textContent = '0,00';
        cartTotal.textContent = '0,00';
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
