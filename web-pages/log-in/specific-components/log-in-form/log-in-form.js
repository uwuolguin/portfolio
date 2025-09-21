import { getLanguage } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');

    const translations = {
        es: {
            title: "Inicia sesión",
            usernamePlaceholder: "Nombre de usuario",
            passwordPlaceholder: "Contraseña",
            loginButton: "Iniciar sesión"
        },
        en: {
            title: "Log in",
            usernamePlaceholder: "Username",
            passwordPlaceholder: "Password",
            loginButton: "Log in"
        }
    };

    function renderLoginForm() {
        const lang = getLanguage();
        const t = translations[lang];

        const loginFormContent = `
            <div class="login-container">
                <h2 class="login-title">${t.title}</h2>
                <form id="login-form" class="login-form">
                    <div class="input-group">
                        <input type="text" id="username" class="login-input" placeholder="${t.usernamePlaceholder}" required>
                    </div>
                    <div class="input-group">
                        <input type="password" id="password" class="login-input" placeholder="${t.passwordPlaceholder}" required>
                    </div>
                    <button type="submit" class="login-button">${t.loginButton}</button>
                </form>
            </div>
        `;

        loginSection.innerHTML = loginFormContent;
    }

    renderLoginForm();
    
    // Attach event listener to the form for a mock login action
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            // In a real application, you would send this to a server for authentication
            console.log("Attempting to log in with username:", username);
            alert("This is a mock login action. In a real application, this would authenticate the user.");
        });
    }

});
