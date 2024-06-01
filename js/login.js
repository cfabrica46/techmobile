document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('data/users.json')
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                alert('Login successful');
                window.location.href = 'index.html';
            } else {
                document.getElementById('loginMessage').textContent = 'Invalid credentials';
            }
        });
});
