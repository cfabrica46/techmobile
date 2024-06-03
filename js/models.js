document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('brand');
    const modelsContainer = document.getElementById('models-container');
    const body = document.querySelector('body');

    if (!brandName) {
        console.error('No brand specified in the URL parameters.');
        modelsContainer.innerHTML = '<p>No brand specified.</p>';
        return;
    }

    const capitalizedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);
    document.getElementById('brand-name').textContent = capitalizedBrand;
    body.classList.add(`brand-${brandName.toLowerCase()}`);

    fetch('./data/inventory.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data) {
                console.error('Invalid JSON structure:', data);
                modelsContainer.innerHTML = '<p>Invalid JSON structure.</p>';
                return;
            }

            const brand = data.find(b => b.brand.toLowerCase() === brandName.toLowerCase());
            if (brand) {
                brand.models.forEach(model => {
                    const modelDiv = document.createElement('div');
                    modelDiv.classList.add('model');
                    modelDiv.innerHTML = `
                        <img src="${model.image_url}" alt="${model.model}">
                        <h2>${model.model}</h2>
                        <p>CPU: ${model.components.cpu}</p>
                        <p>RAM: ${model.components.ram}</p>
                        <p>Storage: ${model.components.storage}</p>
                        <p>Battery: ${model.components.battery}</p>
                        <p>Price: $${model.price.toFixed(2)}</p>
                        <button class="add-to-cart" data-product-id="${model.model}">Agregar al carrito</button>
                    `;
                    modelsContainer.appendChild(modelDiv);
                });

                document.querySelectorAll('.add-to-cart').forEach(button => {
                    button.addEventListener('click', event => {
                        const productId = event.target.getAttribute('data-product-id');
                        addToCart(productId, event.target);
                    });
                });

                updateCartCount();
            } else {
                console.error('Brand not found:', brandName);
                modelsContainer.innerHTML = '<p>No models found for this brand.</p>';
            }
        })
        .catch(error => {
            console.error('Error al cargar el archivo JSON:', error);
            modelsContainer.innerHTML = `<p>Error loading JSON file: ${error.message}</p>`;
        });
});

function addToCart(productId, button) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    fetch('./data/inventory.json')
        .then(response => response.json())
        .then(data => {
            const product = data.flatMap(brand => brand.models).find(model => model.model === productId);
            if (product) {
                const existingProduct = cart.find(item => item.model === productId);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    product.quantity = 1;
                    cart.push(product);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                animateProductToCart(button);
                updateCartCount();
            } else {
                alert('Product not found');
            }
        })
        .catch(error => {
            console.error('Error al agregar el producto al carrito:', error);
        });
}

function animateProductToCart(button) {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    const productImage = button.parentElement.querySelector('img').cloneNode(true);
    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    productImage.style.position = 'fixed';
    productImage.style.left = `${productRect.left}px`;
    productImage.style.top = `${productRect.top}px`;
    productImage.style.width = `${productRect.width}px`;
    productImage.style.height = `${productRect.height}px`;
    productImage.classList.add('fly-to-cart');

    document.body.appendChild(productImage);

    setTimeout(() => {
        productImage.style.left = `${cartRect.left}px`;
        productImage.style.top = `${cartRect.top}px`;
        productImage.style.width = '50px';
        productImage.style.height = '50px';
    }, 10);

    productImage.addEventListener('animationend', () => {
        productImage.remove();
    });
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((count, product) => count + product.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
