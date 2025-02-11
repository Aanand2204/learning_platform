document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            handleRegister(registerForm);
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default login submission
            handleLogin(loginForm);
        });
    }

    function handleRegister(form) {
        const formData = new FormData(form);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        fetch('/auth/register', { // Calls POST /auth/register on backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || `Registration failed with status: ${response.status}`); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message || 'Registration successful');
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        })
        .catch(error => {
            console.error('Registration error:', error);
            alert(error.message || 'Registration failed. Please try again.');
        });
    }

    function handleLogin(form) {
        const formData = new FormData(form);
        const userData = {};
        formData.forEach((value, key) => {
            userData[key] = value;
        });

        fetch('/auth/login', { // Calls POST /auth/login on backend
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message || `Login failed with status: ${response.status}`); });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message || 'Login successful');
            // In a real application, you would store a token (e.g., JWT) here and redirect to the main app page
            console.log('Login successful:', data); // For now, just log success and data
            window.location.href = 'index.html'; // Redirect to index page after login (adjust as needed)
        })
        .catch(error => {
            console.error('Login error:', error);
            alert(error.message || 'Login failed. Please check your credentials.');
        });
    }
});