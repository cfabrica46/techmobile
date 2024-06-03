document.addEventListener('DOMContentLoaded', function() {
    const receiptContainer = document.getElementById('receipt-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        receiptContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let total = 0;

    cart.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('receipt-item');
        itemDiv.innerHTML = `
            <div class="item-info">
                <img src="${product.image_url}" alt="${product.model}">
                <div class="item-details">
                    <h2>${product.model}</h2>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="item-total">
                $${(product.price * product.quantity).toFixed(2)}
            </div>
        `;
        receiptContainer.appendChild(itemDiv);
        total += product.price * product.quantity;
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('receipt-summary');
    totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    receiptContainer.appendChild(totalDiv);
});
