import { getLanguage } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const signupSection = document.getElementById('signup-section');

    const translations = {
        es: {
            title: "Regístrate",
            namePlaceholder: "Nombre",
            emailPlaceholder: "Correo",
            passwordPlaceholder: "Contraseña",
            signupButton: "Registrarse"
        },
        en: {
            title: "Sign up",
            namePlaceholder: "Name",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            signupButton: "Sign up"
        }
    };

    function renderSignupForm() {
        const lang = getLanguage();
        const t = translations[lang];

        const signupFormContent = `
            <div class="signup-container">
                <h2 class="signup-title">${t.title}</h2>
                <form id="signup-form" class="signup-form">
                    <div class="input-group">
                        <input type="text" id="name" class="signup-input" placeholder="${t.namePlaceholder}" required>
                    </div>
                    <div class="input-group">
                        <input type="email" id="email" class="signup-input" placeholder="${t.emailPlaceholder}" required>
                    </div>
                    <div class="input-group">
                        <input type="password" id="password" class="signup-input" placeholder="${t.passwordPlaceholder}" required>
                    </div>
                    <button type="submit" class="signup-button">${t.signupButton}</button>
                </form>
            </div>
        `;

        signupSection.innerHTML = signupFormContent;
    }

    // Attach event listener to the form for a mock signup action
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            // In a real application, you would send this to a server for registration
            console.log("Attempting to sign up with name:", name, "and email:", email);
            alert("This is a mock sign up action. In a real application, this would register the user.");
        });
    }

    document.addEventListener("languageChange", () => {
        renderSignupForm();
    });

    renderSignupForm();
});