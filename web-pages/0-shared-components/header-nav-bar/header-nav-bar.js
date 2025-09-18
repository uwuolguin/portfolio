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

    // TODO: Replace localStorage-based login state with a server-side session check.
    //       Future plan: use secure HttpOnly cookies + /api/check-session endpoint
    //       instead of reading isLoggedIn from localStorage.
    function getLoginState() {
        let value = localStorage.getItem("isLoggedIn");
        if (value === null) {
            localStorage.setItem("isLoggedIn", "false");
            return false;
        }
        return value === "true";
    }

    // TODO: In the future, consider storing the language preference in the server-side
    //       session or user profile instead of localStorage for better security.
    function getLanguage() {
        let lang = localStorage.getItem("lang");
        if (!lang) {
            localStorage.setItem("lang", "es"); // default Spanish
            return "es";
        }
        return lang;
    }

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
        }
    });

    renderNav();
});
