import { getLanguage, getLoginState, getCompanyPublishState, getCompanyData, setCompanyData } from '';
document.addEventListener('DOMContentLoaded', () => {
    const profileEditSection = document.getElementById('profile-edit-section');

    const translations = {
        es: {
            title: "Editar perfil de empresa",
            companyName: "Nombre de la empresa",
            productDescription: "Descripción del producto",
            address: "Dirección",
            phone: "Teléfono de la empresa",
            companyAddress: "Dirección de la empresa",
            updateButton: "Actualizar",
            cancelButton: "Cancelar",
            deleteButton: "Eliminar empresa",
            selectImage: "📷 Cambiar imagen de la empresa",
            currentImage: "Imagen actual:",
            noImage: "No hay imagen seleccionada",
            updateSuccess: "¡Perfil actualizado exitosamente!",
            updateError: "Error al actualizar el perfil. Inténtalo de nuevo.",
            deleteSuccess: "¡Empresa eliminada exitosamente!",
            deleteError: "Error al eliminar la empresa. Inténtalo de nuevo.",
            deleteConfirm: "¿Estás seguro de que deseas eliminar tu empresa? Esta acción no se puede deshacer.",
            loginRequired: "Debes iniciar sesión para editar tu perfil.",
            loginHere: "Inicia sesión aquí",
            noCompany: "No tienes una empresa publicada para editar.",
            publishCompany: "Publicar empresa",
            noCompanyMessage: "Primero debes publicar una empresa para poder editarla.",
            updating: "Actualizando...",
            deleting: "Eliminando..."
        },
        en: {
            title: "Edit company profile",
            companyName: "Company name",
            productDescription: "Product description",
            address: "Address",
            phone: "Company phone",
            companyAddress: "Company address",
            updateButton: "Update",
            cancelButton: "Cancel",
            deleteButton: "Delete company",
            selectImage: "📷 Change company image",
            currentImage: "Current image:",
            noImage: "No image selected",
            updateSuccess: "Profile updated successfully!",
            updateError: "Error updating profile. Please try again.",
            deleteSuccess: "Company deleted successfully!",
            deleteError: "Error deleting company. Please try again.",
            deleteConfirm: "Are you sure you want to delete your company? This action cannot be undone.",
            loginRequired: "You must log in to edit your profile.",
            loginHere: "Log in here",
            noCompany: "You don't have a published company to edit.",
            publishCompany: "Publish company",
            noCompanyMessage: "You must publish a company first before you can edit it.",
            updating: "Updating...",
            deleting: "Deleting..."
        }
    };

    function renderLoginRequired() {
        const lang = getLanguage();
        const t = translations[lang];

        profileEditSection.innerHTML = `
            <div class="profile-edit-container">
                <h2 class="profile-edit-title">${t.title}</h2>
                <div class="login-message">
                    ${t.loginRequired}
                    <br><br>
                    <a href="../login/login.html">${t.loginHere}</a>
                </div>
            </div>
        `;
    }

    function renderNoCompany() {
        const lang = getLanguage();
        const t = translations[lang];

        profileEditSection.innerHTML = `
            <div class="profile-edit-container">
                <h2 class="profile-edit-title">${t.noCompany}</h2>
                <div class="no-company-message">${t.noCompanyMessage}</div>
                <div class="profile-edit-actions">
                    <button id="publishCompanyBtn" class="profile-edit-button">${t.publishCompany}</button>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('publishCompanyBtn').addEventListener('click', () => {
            window.location.href = '../publish/publish.html';
        });
    }

    function renderEditForm() {
        const lang = getLanguage();
        const t = translations[lang];
        const companyData = getCompanyData();

        profileEditSection.innerHTML = `
            <div class="profile-edit-container">
                <h2 class="profile-edit-title">${t.title}</h2>
                <form id="profile-edit-form" class="profile-edit-form">
                    <div class="input-group">
                        <input type="text" id="companyName" class="profile-edit-input" placeholder="${t.companyName}" value="${companyData?.companyName || ''}" required>
                    </div>
                    <div class="input-group">
                        <textarea id="productDescription" class="profile-edit-textarea" placeholder="${t.productDescription}" required>${companyData?.productDescription || ''}</textarea>
                    </div>
                    <div class="input-group">
                        <input type="text" id="address" class="profile-edit-input" placeholder="${t.address}" value="${companyData?.address || ''}" required>
                    </div>
                    <div class="input-group">
                        <input type="tel" id="phone" class="profile-edit-input" placeholder="${t.phone}" value="${companyData?.phone || ''}" required>
                    </div>
                    <div class="input-group">
                        <input type="text" id="companyAddress" class="profile-edit-input" placeholder="${t.companyAddress}" value="${companyData?.companyAddress || ''}" required>
                    </div>
                    <div class="input-group">
                        <div class="current-image-container">
                            <label class="current-image-label">${t.currentImage}</label>
                            ${companyData?.companyImage ? 
                                `<img src="${companyData.companyImage}" alt="Company Image" class="current-image">` :
                                `<div class="no-image-placeholder">${t.noImage}</div>`
                            }
                        </div>
                        <div class="file-input-wrapper">
                            <input type="file" id="companyImage" class="file-input-hidden" accept="image/*">
                            <label for="companyImage" class="file-input-label" id="fileLabel">
                                ${t.selectImage}
                            </label>
                        </div>
                    </div>
                    <div class="profile-edit-actions">
                        <button type="submit" class="profile-edit-button">${t.updateButton}</button>
                        <button type="button" id="cancelBtn" class="profile-edit-button secondary">${t.cancelButton}</button>
                        <button type="button" id="deleteBtn" class="profile-edit-button danger">${t.deleteButton}</button>
                    </div>
                </form>
            </div>
        `;

        const form = document.getElementById("profile-edit-form");
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = t.updating;
            
            try {
                const formData = new FormData();
                formData.append('companyName', document.getElementById("companyName").value);
                formData.append('productDescription', document.getElementById("productDescription").value);
                formData.append('address', document.getElementById("address").value);
                formData.append('phone', document.getElementById("phone").value);
                formData.append('companyAddress', document.getElementById("companyAddress").value);
                
                const imageFile = document.getElementById("companyImage").files[0];
                if (imageFile) {
                    formData.append('companyImage', imageFile);
                }

                // Mock API delay for realistic UX
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Mock success response
                const mockSuccess = Math.random() > 0.1; // 90% success rate for testing
                
                if (mockSuccess) {
                    const updatedData = {
                        companyName: document.getElementById("companyName").value,
                        productDescription: document.getElementById("productDescription").value,
                        address: document.getElementById("address").value,
                        phone: document.getElementById("phone").value,
                        companyAddress: document.getElementById("companyAddress").value,
                        companyImage: imageFile ? URL.createObjectURL(imageFile) : companyData?.companyImage || null,
                    };
                    
                    console.log("Updating company data:", updatedData);
                    
                    // Update company data
                    setCompanyData(updatedData);
                    
                    // Show success message
                    showMessage(t.updateSuccess, 'success');
                    
                    // Re-render form with updated data
                    setTimeout(() => {
                        renderEditForm();
                    }, 2000);
                    
                } else {
                    // Mock error for testing
                    throw new Error("Mock update error");
                }
                
            } catch (error) {
                console.error('Error updating company:', error);
                showMessage(t.updateError, 'error');
            } finally {
                // Re-enable button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            window.location.href = '../profile-view/profile-view.html';
        });

        // Delete button
        document.getElementById('deleteBtn').addEventListener('click', async () => {
            if (confirm(t.deleteConfirm)) {
                const deleteButton = document.getElementById('deleteBtn');
                const originalButtonText = deleteButton.textContent;
                
                deleteButton.disabled = true;
                deleteButton.textContent = t.deleting;
                
                try {
                    // Mock API delay for realistic UX
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Mock success response
                    const mockSuccess = Math.random() > 0.1; // 90% success rate for testing
                    
                    if (mockSuccess) {
                        console.log("Deleting company");
                        
                        // Clear company data and publish state
                        setCompanyData(null);
                        
                        // Show success message
                        showMessage(t.deleteSuccess, 'success');
                        
                        // Redirect to publish page after delay
                        setTimeout(() => {
                            window.location.href = '../publish/publish.html';
                        }, 2000);
                        
                    } else {
                        throw new Error("Mock delete error");
                    }
                    
                } catch (error) {
                    console.error('Error deleting company:', error);
                    showMessage(t.deleteError, 'error');
                    
                    deleteButton.disabled = false;
                    deleteButton.textContent = originalButtonText;
                }
            }
        });

        // File input handling
        const fileInput = document.getElementById("companyImage");
        const fileLabel = document.getElementById("fileLabel");

        fileInput.addEventListener("change", (e) => {
            const fileName = e.target.files[0]?.name;
            
            if (fileName) {
                fileLabel.textContent = `✅ ${fileName}`;
                fileLabel.classList.add("has-file");
            } else {
                fileLabel.textContent = t.selectImage;
                fileLabel.classList.remove("has-file");
            }
        });
    }

    function showMessage(message, type) {
        const container = document.querySelector('.profile-edit-container');
        const existingMessage = container.querySelector('.success-message, .error-message');
        
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;
        
        container.insertBefore(messageDiv, container.firstChild.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    function renderContent() {
        const isLoggedIn = getLoginState();
        const hasPublishedCompany = getCompanyPublishState();

        if (!isLoggedIn) {
            renderLoginRequired();
        } else if (!hasPublishedCompany) {
            renderNoCompany();
        } else {
            renderEditForm();
        }
    }

    document.addEventListener("languageChange", renderContent);
    document.addEventListener("userHasLogged", renderContent);
    document.addEventListener("companyPublishStateChange", renderContent);
    document.addEventListener("companyDataChange", renderContent);
    renderContent();
});