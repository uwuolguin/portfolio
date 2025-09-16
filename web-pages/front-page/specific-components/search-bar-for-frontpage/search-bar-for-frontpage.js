document.addEventListener('DOMContentLoaded', () => {
    const searchContainer = document.getElementById('search-container');
    

    const filterOptions = [ "Todas las comunas","La Florida", "Lo Curro" ];

    const optionsHTML = filterOptions.map(option => `
        <option value="${option.toLowerCase()}">${option}</option>
    `).join('');

    const searchBarContent = `
        <div class="search-flex-container">
            <select class="filter-input">
                ${optionsHTML}
            </select>
            <select class="filter-input">
                <option value="departamentos">Departamentos</option>
                <option value="casas">Casas</option>
            </select>
            <div class="search-input-container">
                <input type="text" placeholder="Ingresa comuna o ciudad">
            </div>
            <button class="search-button">Buscar</button>
        </div>
    `;

    searchContainer.innerHTML = searchBarContent;
});