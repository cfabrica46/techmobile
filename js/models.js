document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const brandName = urlParams.get('brand');
    const modelsContainer = document.getElementById('models-container');
    const body = document.querySelector('body');

    // Verifica si brandName está definido
    if (!brandName) {
        console.error('No brand specified in the URL parameters.');
        modelsContainer.innerHTML = '<p>No brand specified.</p>';
        return;
    }

    // Capitalizar el nombre de la marca para mostrar
    const capitalizedBrand = brandName.charAt(0).toUpperCase() + brandName.slice(1);
    document.getElementById('brand-name').textContent = capitalizedBrand;

    // Aplicar clase específica para la marca activa
    body.classList.add(`brand-${brandName.toLowerCase()}`);

    fetch('../data/inventory.json')
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
                    console.log("MODEL:",model)
                    const modelDiv = document.createElement('div');
                    modelDiv.classList.add('model');
                    modelDiv.innerHTML = `
                        <img src="${model.image_url}" alt="${model.model}">
                        <h2>${model.model}</h2>
                        <p>CPU: ${model.components.cpu}</p>
                        <p>RAM: ${model.components.ram}</p>
                        <p>Storage: ${model.components.storage}</p>
                        <p>Battery: ${model.components.battery}</p>
                    `;
                    modelsContainer.appendChild(modelDiv);
                });
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
