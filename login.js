document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const formType = form.getAttribute('data-form-type');
            
            if (formType === 'register') {
                handleRegister();
            } else if (formType === 'login') {
                handleLogin();
            }
        });
    }
});

function handleRegister() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('Email já registrado.');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registro bem-sucedido!');
    window.location.href = 'login.html';
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Email ou senha incorretos.');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    alert('Login bem-sucedido!');
    window.location.href = 'index.html';
}
