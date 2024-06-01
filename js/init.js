document.addEventListener('DOMContentLoaded', function() {
    fetch('/data/inventory.json')
        .then(response => response.json())
        .then(data => {
            console.log('Inventario:', data);

        })
        .catch(error => console.error('Error al cargar los datos:', error));

    fetch('/data/users.json')
        .then(response => response.json())
        .then(data => {
            console.log('Usuarios:', data);

        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
