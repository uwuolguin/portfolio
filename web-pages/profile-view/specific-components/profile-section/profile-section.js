import { getLanguage, getLoginState, getCompanyPublishState } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('profile-section');

    const translations = {
        es: {
            title: "Mi Perfil",
            companyName: "Nombre de la empresa",
            productDescription: "Descripción del producto",
            address: "Dirección",
            phone: "Teléfono de la empresa",
            companyAddress: "Dirección de la empresa",
            companyImage: "Imagen de la empresa",
            loginRequired: "Debes iniciar sesión para ver tu perfil.",
            loginHere: "Inicia sesión aquí",
            noData: "No hay datos disponibles",
            noCompanyPublished: "Aún no has publicado una empresa.",
            publishCompanyHere: "Publica tu empresa aquí",
            publishFirst: "Para ver los datos de tu empresa, primero debes publicarla."
        },
        en: {
            title: "My Profile",
            companyName: "Company name",
            productDescription: "Product description",
            address: "Address",
            phone: "Company phone",
            companyAddress: "Company address",
            companyImage: "Company image",
            loginRequired: "You must log in to view your profile.",
            loginHere: "Log in here",
            noData: "No data available",
            noCompanyPublished: "You haven't published a company yet.",
            publishCompanyHere: "Publish your company here",
            publishFirst: "To see your company data, you must publish it first."
        }
    };

    // Mock user data - In a real app, this would come from an API
    const mockUserData = {
        name: "Juan Pérez",
        email: "juan.perez@email.com",
        companyName: "Tecnología Avanzada SPA",
        productDescription: "Desarrollamos soluciones tecnológicas innovadoras para empresas modernas, incluyendo software personalizado, aplicaciones móviles y sistemas de gestión empresarial.",
        address: "Av. Providencia 1234, Santiago",
        phone: "+56 9 8765 4321",
        companyAddress: "Av. Providencia 1234, Oficina 501, Providencia, Santiago",
        companyImage: null // In a real app, this would be a URL or file reference
    };

    function renderProfileContent() {
        const lang = getLanguage();
        const t = translations[lang];
        const isLoggedIn = getLoginState();
        const hasPublishedCompany = getCompanyPublishState();

        // Case 1: User not logged in
        if (isLoggedIn) {
            profileSection.innerHTML = `
                <div class="profile-container">
                    <h2 class="profile-title">${t.title}</h2>
                    <div class="login-message">
                        ${t.loginRequired}
                        <br><br>
                        <a href="../login/login.html" class="login-link">${t.loginHere}</a>
                    </div>
                </div>
            `;
            return;
        }

        // Case 2: User logged in but hasn't published a company
        if (!hasPublishedCompany) {
            profileSection.innerHTML = `
                <div class="profile-container">
                    <h2 class="profile-title">${t.title}</h2>
                    <div class="user-details">
                        <div class="user-name">${mockUserData.name}</div>
                        <div class="user-email">${mockUserData.email}</div>
                    </div>
                    <div class="login-message">
                        ${t.publishFirst}
                        <br><br>
                        <a href="../publish/publish.html" class="login-link">${t.publishCompanyHere}</a>
                    </div>
                </div>
            `;
            return;
        }

        // Case 3: User logged in and has published a company
        profileSection.innerHTML = `
            <div class="profile-container">
                <h2 class="profile-title">${t.title}</h2>
                <div class="profile-content">
                    <div class="user-details">
                        <div class="user-name">${mockUserData.name}</div>
                        <div class="user-email">${mockUserData.email}</div>
                    </div>
                    
                    <div class="profile-info">
                        <div class="info-item">
                            <label class="info-label">${t.companyName}</label>
                            <div class="info-value">${mockUserData.companyName || t.noData}</div>
                        </div>
                        
                        <div class="info-item">
                            <label class="info-label">${t.productDescription}</label>
                            <div class="info-value">${mockUserData.productDescription || t.noData}</div>
                        </div>
                        
                        <div class="info-item">
                            <label class="info-label">${t.address}</label>
                            <div class="info-value">${mockUserData.address || t.noData}</div>
                        </div>
                        
                        <div class="info-item">
                            <label class="info-label">${t.phone}</label>
                            <div class="info-value">${mockUserData.phone || t.noData}</div>
                        </div>
                        
                        <div class="info-item">
                            <label class="info-label">${t.companyAddress}</label>
                            <div class="info-value">${mockUserData.companyAddress || t.noData}</div>
                        </div>
                        
                        ${mockUserData.companyImage ? `
                        <div class="info-item">
                            <label class="info-label">${t.companyImage}</label>
                            <img src="${mockUserData.companyImage}" alt="Company Image" class="company-image-preview">
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    document.addEventListener("languageChange", renderProfileContent);
    document.addEventListener("companyPublishStateChange", renderProfileContent);
    renderProfileContent();
});