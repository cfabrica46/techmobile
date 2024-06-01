let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', event => {
        const productId = event.target.getAttribute('data-product-id');
        addToCart(productId);
    });
});

function addToCart(productId) {
    fetch('data/inventory.json')
        .then(response => response.json())
        .then(inventory => {
            const product = inventory.flatMap(brand => brand.models).find(model => model.model === productId);
            if (product) {
                cart.push(product);
                alert('Product added to cart');
                updateCart();
            }
        });
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(product => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <span>${product.model}</span>
            <span>${product.components.cpu}</span>
            <span>${product.components.ram}</span>
            <span>${product.components.storage}</span>
            <span>${product.components.battery}</span>
        `;
        cartItems.appendChild(item);
    });
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Proceeding to checkout');
});
