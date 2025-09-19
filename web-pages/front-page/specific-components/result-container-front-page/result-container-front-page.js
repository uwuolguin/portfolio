document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const numCards = 8;
    let cardsHtml = '';

    for (let i = 1; i <= numCards; i++) {
        cardsHtml += `
            <div class="business-card">
                <div class="card-picture">
                    <img src="https://corporate.target.com/getmedia/4a72aa51-e709-4222-8c01-92b483ec6fc1/Upcoming-Stores-Target.jpg?width=1144" alt="Product Image ${i}">
                </div>
                <div class="card-details">
                    <h3 class="business-name">Nombre de Empresa ${String.fromCharCode(64 + i)}</h3>
                    <p class="concise-description">Descripción de Producto ${i}.</p>
                    <p class="location">Dirección ${i}, Ciudad</p>
                    <p class="phone">Teléfono: +123 456 789${i}</p>
                    <p class="mail">Email: info@empresa${i}.com</p>
                </div>
            </div>
        `;
    }

    const paginationHtml = `
        <div class="pagination-container">
            <a href="#" class="page-link">&laquo;</a>
            <a href="#" class="page-link active">1</a>
            <a href="#" class="page-link">2</a>
            <a href="#" class="page-link">3</a>
            <a href="#" class="page-link">&raquo;</a>
        </div>
    `;

    resultsContainer.innerHTML = `<div class="results-grid">${cardsHtml}</div>${paginationHtml}`;
});