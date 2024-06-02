document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Verifica si hay usuarios en localStorage o inicializa un arreglo vacío
    let users = [];
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
    }

    // Verifica si el usuario o el email ya existen
    const userExists = users.some(u => u.username === username || u.email === email);
    if (userExists) {
        document.getElementById('registerMessage').textContent = 'Username or email already exists';
    } else {
        const newUser = { username, password, email };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        alert('Registration successful');
        window.location.href = 'index.html';
    }
});
