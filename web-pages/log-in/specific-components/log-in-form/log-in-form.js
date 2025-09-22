import { getLanguage, getLoginState, setLoginState } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login-section');

    const translations = {
        es: {
            title: "Inicia sesión",
            usernamePlaceholder: "Correo",
            passwordPlaceholder: "Contraseña",
            loginButton: "Iniciar sesión",
            alreadyLoggedTitle: "Ya has iniciado sesión",
            alreadyLoggedMessage: "Ya tienes una sesión activa. ¿Qué te gustaría hacer?",
            goToMainPage: "Ir a la página principal",
            logout: "Cerrar sesión"
        },
        en: {
            title: "Log in",
            usernamePlaceholder: "Email",
            passwordPlaceholder: "Password",
            loginButton: "Log in",
            alreadyLoggedTitle: "You're already logged in",
            alreadyLoggedMessage: "You have an active session. What would you like to do?",
            goToMainPage: "Go to main page",
            logout: "Log out"
        }
    };

    function renderAlreadyLoggedView() {
        const lang = getLanguage();
        const t = translations[lang];

        const alreadyLoggedContent = `
            <div class="login-container">
                <h2 class="login-title">${t.alreadyLoggedTitle}</h2>
                <p class="already-logged-message">${t.alreadyLoggedMessage}</p>
                <div class="logged-in-actions">
                    <button id="go-to-main" class="login-button primary">${t.goToMainPage}</button>
                    <button id="logout-button" class="login-button secondary">${t.logout}</button>
                </div>
            </div>
        `;

        loginSection.innerHTML = alreadyLoggedContent;

        // Add event listeners
        document.getElementById('go-to-main').addEventListener('click', () => {
            window.location.href = '../front-page/front-page.html';
        });

        document.getElementById('logout-button').addEventListener('click', () => {
            setLoginState(false);
            // Page will reload automatically due to storage listener
        });
    }

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

        // Attach event listener to the form for login action
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitButton = loginForm.querySelector('.login-button');
                const originalButtonText = submitButton.textContent;
                
                // Disable button and show loading state
                submitButton.disabled = true;
                submitButton.textContent = lang === 'es' ? 'Iniciando sesión...' : 'Logging in...';
                
                try {
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                    
                    // TODO: Replace this mock with actual API call
                    // const loginResponse = await fetch('/api/login', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify({ username, password }),
                    // });

                    // Mock API delay for realistic UX
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Mock success response (90% success rate for testing)
                    const mockSuccess = Math.random() > 0.1;
                    
                    if (mockSuccess) {
                        console.log("Attempting to log in with username:", username);
                        
                        // Set login state to true
                        setLoginState(true);
                        
                        // Redirect to main page
                        window.location.href = '../front-page/front-page.html';
                        
                    } else {
                        // Mock error for testing
                        throw new Error("Mock login error");
                    }
                    
                } catch (error) {
                    console.error('Login error:', error);
                    const errorMsg = lang === 'es' ? 
                        'Error al iniciar sesión. Verifica tus credenciales.' : 
                        'Login error. Please check your credentials.';
                    alert(errorMsg);
                } finally {
                    // Re-enable button and restore original text
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            });
        }
    }

    function renderContent() {
        const isLoggedIn = getLoginState();
        
        if (isLoggedIn) {
            renderAlreadyLoggedView();
        } else {
            renderLoginForm();
        }
    }

    document.addEventListener("languageChange", renderContent);
    document.addEventListener("userHasLogged", renderContent);

    renderContent();
});