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
            publishFirst: "Para ver los datos de tu empresa, primero debes publicarla.",
            updateProfile: "Actualizar Perfil",
            deleteProfile: "Eliminar Perfil",
            confirmDelete: "¿Estás seguro de que quieres eliminar tu perfil? Esta acción no se puede deshacer.",
            profileDeleted: "Perfil eliminado exitosamente.",
            deleteError: "Error al eliminar el perfil. Inténtalo de nuevo."
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
            publishFirst: "To see your company data, you must publish it first.",
            updateProfile: "Update Profile",
            deleteProfile: "Delete Profile",
            confirmDelete: "Are you sure you want to delete your profile? This action cannot be undone.",
            profileDeleted: "Profile deleted successfully.",
            deleteError: "Error deleting profile. Please try again."
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
        companyImage: "../../../logos-pictures/pictures/background-picture.jpg" // Mock image URL - TODO: Replace with real uploaded image URL from API
    };

    function handleUpdateProfile() {
        const lang = getLanguage();
        // TODO: Implement update profile functionality
        // TODO: Redirect to update profile page or open modal
        console.log("Update profile clicked");
        alert(lang === 'es' ? 'Funcionalidad de actualizar perfil - TODO' : 'Update profile functionality - TODO');
        // window.location.href = '../profile-edit/profile-edit.html';
    }

    function handleDeleteProfile() {
        const lang = getLanguage();
        const t = translations[lang];
        
        if (confirm(t.confirmDelete)) {
            try {
                // TODO: Replace with actual API call
                // const deleteResponse = await fetch('/api/delete-profile', {
                //     method: 'DELETE',
                //     headers: {
                //         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                //     }
                // });
                
                // Mock deletion process
                console.log("Deleting profile...");
                
                // TODO: Handle real API response
                // if (deleteResponse.ok) {
                //     localStorage.removeItem("isLoggedIn");
                //     localStorage.removeItem("hasPublishedCompany");
                //     alert(t.profileDeleted);
                //     window.location.href = '../login/login.html';
                // } else {
                //     throw new Error('Delete failed');
                // }
                
                // Mock success for now
                alert(t.profileDeleted);
                localStorage.setItem("isLoggedIn", "false");
                localStorage.setItem("hasPublishedCompany", "false");
                location.reload();
                
            } catch (error) {
                console.error('Error deleting profile:', error);
                alert(t.deleteError);
            }
        }
    }

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
                    <div class="profile-actions">
                        <button class="profile-button update-button" id="updateProfileBtn">${t.updateProfile}</button>
                        <button class="profile-button delete-button" id="deleteProfileBtn">${t.deleteProfile}</button>
                    </div>
                </div>
            `;
        } else {
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
                            
                            <div class="info-item">
                                <label class="info-label">${t.companyImage}</label>
                                ${mockUserData.companyImage ? `
                                    <img src="${mockUserData.companyImage}" alt="Company Image" class="company-image-preview">
                                ` : `
                                    <div class="info-value">${t.noData}</div>
                                `}
                            </div>
                        </div>
                    </div>
                    <div class="profile-actions">
                        <button class="profile-button update-button" id="updateProfileBtn">${t.updateProfile}</button>
                        <button class="profile-button delete-button" id="deleteProfileBtn">${t.deleteProfile}</button>
                    </div>
                </div>
            `;
        }

        // Add event listeners for buttons (only if user is logged in)
        if (isLoggedIn) {
            const updateBtn = document.getElementById('updateProfileBtn');
            const deleteBtn = document.getElementById('deleteProfileBtn');
            
            if (updateBtn) {
                updateBtn.addEventListener('click', handleUpdateProfile);
            }
            if (deleteBtn) {
                deleteBtn.addEventListener('click', handleDeleteProfile);
            }
        }
    }

    document.addEventListener("languageChange", renderProfileContent);
    document.addEventListener("companyPublishStateChange", renderProfileContent);
    renderProfileContent();
});