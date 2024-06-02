document.addEventListener('DOMContentLoaded', () => {
    const userMenu = document.getElementById('userMenu');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        userMenu.innerHTML = `
            <li class="user-welcome">Welcome, ${loggedInUser.username}</li>
            <li><a href="#" id="logout" class="logout-button"><i class="fas fa-sign-out-alt"></i></a></li>
            <li><a href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>
        `;
        
        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});
