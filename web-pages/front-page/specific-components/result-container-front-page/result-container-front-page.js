import { getLanguage } from '../../../0-shared-components/utils/shared-functions.js';
document.addEventListener('DOMContentLoaded', () => {
    const resultsContainer = document.getElementById('results-container');
    const cardsPerPage = 8;
    const numbersPerPagination = 2;
    let currentPage = 1;

    const renderCards = (companies) => {
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        const companiesToDisplay = companies.slice(startIndex, endIndex);

        let cardsHtml = '';
        companiesToDisplay.forEach(company => {
            cardsHtml += `
                <div class="business-card">
                    <div class="card-picture">
                        <img src="${company.image}" alt="Product Image ${company.id}">
                    </div>
                    <div class="card-details">
                        <h3 class="business-name">${company.name}</h3>
                        <p class="concise-description">${company.description}</p>
                        <p class="location">${company.address}</p>
                        <p class="phone">Teléfono: ${company.phone}</p>
                        <p class="mail">Email: ${company.email}</p>
                    </div>
                </div>
            `;
        });
        return cardsHtml;
    };

    const renderPagination = (numbersPerPagination) => {
        let startPage = currentPage;
        let endPage = startPage + numbersPerPagination - 1;

        let paginationHtml = `
            <div class="pagination-container">
                <a href="#" class="page-link prev-link">&laquo;</a>
        `;

        for (let i = startPage; i <= endPage; i++) {
            paginationHtml += `
                <a href="#" class="page-link ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</a>
            `;
        }

        paginationHtml += `
                <a href="#" class="page-link next-link">&raquo;</a>
            </div>
        `;

        return paginationHtml;
    };

    const fetchAndRender = async () => {
    try {
        let currentLanguage = getLanguage();
        const response = await fetch(`./specific-components/result-container-front-page/data.json?page=${currentPage}`); 
        const data = await response.json();
        const companies = data[currentLanguage]?.companies || [];

        let cardsHtml = '';
        if (companies.length > 0) {
            cardsHtml = renderCards(companies);
        }

        const paginationHtml = renderPagination(numbersPerPagination);

        resultsContainer.innerHTML = `
            <div class="results-grid">${cardsHtml}</div>
            ${paginationHtml}
        `;

        const pageLinks = document.querySelectorAll('.page-link');
        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('prev-link')) {
                    currentPage = Math.max(1, currentPage - 1);
                } else if (e.target.classList.contains('next-link')) {
                    currentPage = currentPage + 1;
                } else {
                    currentPage = parseInt(e.target.getAttribute('data-page'));
                }
                fetchAndRender();
            });
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
    };
    document.addEventListener("languageChange", () => {
        fetchAndRender();
    });

    fetchAndRender();
});