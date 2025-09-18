import { getLoginState, getLanguage } from '../../../0-shared-components/utils/sharedFunctions.js';
document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.getElementById('search-container');
    

    const filterOptionsPlaces = [ "Todas las comunas","La Florida", "Lo Curro", "Los Troncos" ];
    const filterOptionsProducts = [ "Todos Los Productos","Fiambrería", "Lácteos", "Legumbres"];

    const optionsPlacesHTML = filterOptionsPlaces.map(option => `
        <option value="${option.toLowerCase()}">${option}</option>
    `).join('');

    const optionsProductsHTML = filterOptionsProducts.map(option => `
        <option value="${option.toLowerCase()}">${option}</option>
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
                <input type="text" placeholder="Introduzca un término de búsqueda.">
            </div>
            <button class="search-button">Buscar</button>
        </div>
    `;

    searchContainer.innerHTML = searchBarContent;
});