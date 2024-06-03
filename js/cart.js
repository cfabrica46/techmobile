document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadCartItems();

    document.getElementById('checkout').addEventListener('click', function() {
        window.location.href = 'receipt.html';
    });
});

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');
        itemDiv.innerHTML = `
            <div class="item-info">
                <img src="${product.image_url}" alt="${product.model}">
                <h2>${product.model}</h2>
                <p class="item-price">$${product.price.toFixed(2)}</p>
            </div>
            <div class="item-quantity">
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-product-id="${product.model}">-</button>
                    <span>${product.quantity}</span>
                    <button class="increase-quantity" data-product-id="${product.model}">+</button>
                </div>
                <button class="remove-from-cart" data-product-id="${product.model}">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-product-id');
            removeFromCart(productId, event.target.closest('.item'));
        });
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-product-id');
            updateProductQuantity(productId, 1);
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', event => {
            const productId = event.target.getAttribute('data-product-id');
            updateProductQuantity(productId, -1);
        });
    });
}

function removeFromCart(productId, itemElement) {
    itemElement.classList.add('fade-out');
    itemElement.addEventListener('animationend', () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(product => product.model !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        itemElement.remove();
        updateCartCount();
        if (cart.length === 0) {
            document.getElementById('cart-items').innerHTML = '<p>Your cart is empty.</p>';
        }
    });
}

function updateProductQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(product => product.model === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart = cart.filter(product => product.model !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
