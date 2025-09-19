import { getLanguage } from '../../../0-shared-components/utils/shared-functions.js';
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.getElementById('search-container');
    const lang = getLanguage();

    const translations = {
        es: {
            places: ["Todas las comunas", "La Florida", "Lo Curro", "Los Troncos"],
            products: ["Todos Los Productos", "Fiambrería", "Lácteos", "Legumbres"],
            placeholder: "Introduzca un término de búsqueda.",
            button: "Buscar"
        },
        en: {
            places: ["All communes", "La Florida", "Lo Curro", "Los Troncos"],
            products: ["All Products", "Fiambrería", "Dairy", "Legumes"],
            placeholder: "Enter a search term.",
            button: "Search"
        }
    };

    function renderSearchBar() {
        const currentLang = getLanguage();
        const filterOptionsPlaces = translations[currentLang].places;
        const filterOptionsProducts = translations[currentLang].products;

        const optionsPlacesHTML = filterOptionsPlaces.map(option => `
            <option value="${option.toLowerCase().replace(/ /g, '-')}">${option}</option>
        `).join('');

        const optionsProductsHTML = filterOptionsProducts.map(option => `
            <option value="${option.toLowerCase().replace(/ /g, '-')}">${option}</option>
        `).join('');

        const searchBarContent = `
            <div class="search-flex-container">
                <select class="filter-input">
                    ${optionsPlacesHTML}
                </select>
                <select class="filter-input">
                    ${optionsProductsHTML}
                </select>
                <div class="search-input-container">
                    <input type="text" placeholder="${translations[currentLang].placeholder}">
                </div>
                <button class="search-button">${translations[currentLang].button}</button>
            </div>
        `;

        searchContainer.innerHTML = searchBarContent;
    }

    document.addEventListener("languageChange", () => {
        renderSearchBar();
    });
    
    renderSearchBar();
});