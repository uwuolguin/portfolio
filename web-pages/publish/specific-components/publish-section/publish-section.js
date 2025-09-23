import { getLanguage, getLoginState, getCompanyPublishState, setCompanyPublishState } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const publishSection = document.getElementById('publish-section');

    const translations = {
        es: {
            title: "Publica tu empresa",
            companyName: "Nombre de la empresa",
            productDescription: "Descripción del producto",
            address: "Dirección",
            phone: "Teléfono de la empresa",
            companyEmail: "Correo de la empresa",
            publishButton: "Publicar",
            selectImage: "📷 Seleccionar imagen de la empresa",
            publishSuccess: "¡Empresa publicada exitosamente!",
            publishError: "Error al publicar la empresa. Inténtalo de nuevo.",
            loginRequired: "Debes iniciar sesión para publicar tu empresa.",
            loginHere: "Inicia sesión aquí",
            alreadyPublished: "Ya has publicado una empresa.",
            viewProfile: "Ver mi perfil",
            alreadyPublishedMessage: "Tu empresa ya está publicada."
        },
        en: {
            title: "Publish your company",
            companyName: "Company name",
            productDescription: "Product description",
            address: "Address",
            phone: "Company phone",
            companyEmail: "Company email",
            publishButton: "Publish",
            selectImage: "📷 Select company image",
            publishSuccess: "Company published successfully!",
            publishError: "Error publishing company. Please try again.",
            loginRequired: "You must log in to publish your company.",
            loginHere: "Log in here",
            alreadyPublished: "You have already published a company.",
            viewProfile: "View my profile",
            alreadyPublishedMessage: "Your company is already published."
        }
    };

    function renderLoginRequired() {
        const lang = getLanguage();
        const t = translations[lang];

        publishSection.innerHTML = `
            <div class="publish-container">
                <h2 class="publish-title">${t.title}</h2>
                <div class="login-message">
                    ${t.loginRequired}
                    <br><br>
                    <a href="../login/login.html">${t.loginHere}</a>
                </div>
            </div>
        `;
    }

    function renderAlreadyPublished() {
        const lang = getLanguage();
        const t = translations[lang];

        publishSection.innerHTML = `
            <div class="publish-container">
                <h2 class="publish-title">${t.alreadyPublished}</h2>
                <div class="already-published-message">${t.alreadyPublishedMessage}</div>
                <div class="publish-actions">
                    <button id="viewProfileBtn" class="publish-button">${t.viewProfile}</button>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('viewProfileBtn').addEventListener('click', () => {
            window.location.href = '../profile-view/profile-view.html';
        });

    }

    function renderPublishForm() {
        const lang = getLanguage();
        const t = translations[lang];

        publishSection.innerHTML = `
            <div class="publish-container">
                <h2 class="publish-title">${t.title}</h2>
                <form id="publish-form" class="publish-form">
                    <div class="input-group">
                        <input type="text" id="companyName" class="publish-input" placeholder="${t.companyName}" required>
                    </div>
                    <div class="input-group">
                        <textarea id="productDescription" class="publish-textarea" placeholder="${t.productDescription}" required></textarea>
                    </div>
                    <div class="input-group">
                        <input type="text" id="address" class="publish-input" placeholder="${t.address}" required>
                    </div>
                    <div class="input-group">
                        <input type="tel" id="phone" class="publish-input" placeholder="${t.phone}" required>
                    </div>
                    <div class="input-group">
                        <input type="text" id="companyEmail" class="publish-input" placeholder="${t.companyEmail}" required>
                    </div>
                    <div class="input-group">
                        <div class="file-input-wrapper">
                            <input type="file" id="companyImage" class="file-input-hidden" accept="image/*">
                            <label for="companyImage" class="file-input-label" id="fileLabel">
                                ${t.selectImage}
                            </label>
                        </div>
                    </div>
                    <button type="submit" class="publish-button">${t.publishButton}</button>
                </form>
            </div>
        `;

        const form = document.getElementById("publish-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitButton = document.getElementById("publish-form").querySelector('.publish-button');
            const originalButtonText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = lang === 'es' ? 'Publicando...' : 'Publishing...';
            
            try {
                const formData = new FormData();
                formData.append('companyName', document.getElementById("companyName").value);
                formData.append('productDescription', document.getElementById("productDescription").value);
                formData.append('address', document.getElementById("address").value);
                formData.append('phone', document.getElementById("phone").value);
                formData.append('companyEmail', document.getElementById("companyEmail").value);
                
                const imageFile = document.getElementById("companyImage").files[0];
                if (imageFile) {
                    formData.append('companyImage', imageFile);
                }

                // Mock API delay for realistic UX
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock success response
                const mockSuccess = Math.random() > 0.1; // 90% success rate for testing
                
                if (mockSuccess) {
                    console.log("Publishing data:", {
                        companyName: document.getElementById("companyName").value,
                        productDescription: document.getElementById("productDescription").value,
                        address: document.getElementById("address").value,
                        phone: document.getElementById("phone").value,
                        companyEmail: document.getElementById("companyEmail").value,
                        companyImage: imageFile || null,
                    });
                    
                    // Set company publish state to true
                    setCompanyPublishState(true);
                    
                    // Show success message
                    alert(t.publishSuccess);
                    
                    // Render already published view
                    renderAlreadyPublished();
                    
                } else {
                    // Mock error for testing
                    throw new Error("Mock publish error");
                }
                
            } catch (error) {
                console.error('Error publishing company:', error);
                alert(t.publishError);
            } finally {
                // Re-enable button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });

        const fileInput = document.getElementById("companyImage");
        const fileLabel = document.getElementById("fileLabel");

        fileInput.addEventListener("change", (e) => {
            const fileName = e.target.files[0]?.name;
            const lang = getLanguage();
            const t = translations[lang];
            
            if (fileName) {
                fileLabel.textContent = `✅ ${fileName}`;
                fileLabel.classList.add("has-file");
            } else {
                fileLabel.textContent = t.selectImage;
                fileLabel.classList.remove("has-file");
            }
        });
    }

    function renderContent() {
        const isLoggedIn = getLoginState();
        const hasPublishedCompany = getCompanyPublishState();

        if (!isLoggedIn) {
            renderLoginRequired();
        } else if (hasPublishedCompany) {
            renderAlreadyPublished();
        } else {
            renderPublishForm();
        }
    }

    document.addEventListener("languageChange", renderContent);
    document.addEventListener("userHasLogged", renderContent);
    document.addEventListener("companyPublishStateChange", renderContent);
    renderContent();
});