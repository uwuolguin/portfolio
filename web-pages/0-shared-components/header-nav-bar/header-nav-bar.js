import { getLoginState, getLanguage } from '../utils/shared-functions.js';
document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-container-component');
    
    const translations = {
            es: {
                profile: "Perfil",
                logout: "Cerrar sesión",
                register: "Regístrate",
                login: "Inicia sesión",
                publish: "Publícate",
                flag: "us",
                img: "../../logos-pictures/logos/us.svg"
            },
            en: {
                profile: "Profile",
                logout: "Log out",
                register: "Sign up",
                login: "Log in",
                publish: "Post Ad",
                flag: "es",
                img: "../../logos-pictures/logos/es.svg"
            }
    };


    function renderNav() {
        const lang = getLanguage();

        let navBarContent = getLoginState()
            ? `
                <nav class="nav-container-flex-container">
                    <div class="nav-container-logo-container">
                        <a href="www.google.cl">
                            <img src="../../logos-pictures/logos/logoSVG.svg" alt="Proveo Logo" >
                        </a>
                    </div>
                    <ul class="nav-container-ul">
                        <li class="nav-container-li"><a href="#" class="nav-container-a">${translations[lang].profile}</a></li>
                        <li class="nav-container-li"><a href="#" class="nav-container-a">${translations[lang].logout}</a></li>
                        <li class="nav-container-li lang-toggle">
                        <button id="lang-btn" class="lang-btn">
                            <img src="${translations[lang].img}" alt="${translations[lang].flag}" class="lang-flag">
                        </button>
                        </li>
                    </ul>
                </nav>`
            : `
                <nav class="nav-container-flex-container">
                    <div class="nav-container-logo-container">
                        <a href="www.google.cl">
                            <img src="../../logos-pictures/logos/logoSVG.svg" alt="Proveo Logo" >
                        </a>
                    </div>
                    <ul class="nav-container-ul">
                        <li class="nav-container-li"><a href="#" class="nav-container-a">${translations[lang].register}</a></li>
                        <li class="nav-container-li"><a href="#" class="nav-container-a">${translations[lang].login}</a></li>
                        <li class="nav-container-li"><a href="#" class="nav-container-a">${translations[lang].publish}</a></li>
                        <li class="nav-container-li lang-toggle">
                        <button id="lang-btn" class="lang-btn">
                            <img src="${translations[lang].img}" alt="${translations[lang].flag}" class="lang-flag">
                        </button>
                        </li>
                    </ul>
                </nav>`;

        navContainer.innerHTML = navBarContent;
    }

    // TODO: Use event delegation for all navbar actions (lang toggle, login, logout)
    //       This avoids reattaching listeners after every render.
    navContainer.addEventListener("click", (e) => {
        const btn = e.target.closest("#lang-btn");
        if (btn) {
            const currentLang = getLanguage();
            const newLang = currentLang === "es" ? "en" : "es";
            localStorage.setItem("lang", newLang);
            renderNav();
            const langChangeEvent = new CustomEvent("languageChange");
            document.dispatchEvent(langChangeEvent);
        }
    });

    renderNav();
});
