import { getLanguage } from '../../../0-shared-components/utils/shared-functions.js';

document.addEventListener('DOMContentLoaded', () => {
    const publishSection = document.getElementById('publish-section');

    const translations = {
        es: {
            title: "Publica tu empresa",
            companyName: "Nombre de la empresa",
            productDescription: "Descripción del producto",
            address: "Dirección",
            phone: "Teléfono de la empresa",
            companyAddress: "Dirección de la empresa",
            publishButton: "Publicar"
        },
        en: {
            title: "Publish your company",
            companyName: "Company name",
            productDescription: "Product description",
            address: "Address",
            phone: "Company phone",
            companyAddress: "Company address",
            publishButton: "Publish"
        }
    };

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
                        <input type="text" id="companyAddress" class="publish-input" placeholder="${t.companyAddress}" required>
                    </div>
                    <button type="submit" class="publish-button">${t.publishButton}</button>
                </form>
            </div>
        `;

        // attach event listener
        const form = document.getElementById("publish-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const data = {
                companyName: document.getElementById("companyName").value,
                productDescription: document.getElementById("productDescription").value,
                address: document.getElementById("address").value,
                phone: document.getElementById("phone").value,
                companyAddress: document.getElementById("companyAddress").value,
            };
            console.log("Publishing data:", data);
            alert("Mock publish action. Data logged in console.");
        });
    }

    document.addEventListener("languageChange", renderPublishForm);
    renderPublishForm();
});
