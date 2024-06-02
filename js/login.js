document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica si hay usuarios en localStorage o inicializa un arreglo vacío
    let users = [];
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }

    // Busca el usuario
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        alert('Login successful');
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid credentials';
    }
});
