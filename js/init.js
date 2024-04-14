document.addEventListener('DOMContentLoaded', function() {
    fetch('/data/database.json')
        .then(response => response.json())
        .then(data => {
            console.log('Usuarios:', data.users);
            console.log('Inventario:', data.inventory);

        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
