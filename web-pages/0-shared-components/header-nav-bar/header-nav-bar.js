document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-container-component');

    function getLoginState() {
        let value = localStorage.getItem("isLoggedIn");
        if (value === null) {
            localStorage.setItem("isLoggedIn", "false");
            return false;
        }
        return value === "true";
    }

    function getLanguage() {
        let lang = localStorage.getItem("lang");
        if (!lang) {
            localStorage.setItem("lang", "es");
            return "es";
        }
        return lang;
    }

    function setLanguage(lang) {
        localStorage.setItem("lang", lang);
    }

    const isLoggedInBoolean = getLoginState();

    function renderNav() {
        const lang = getLanguage();

        const translations = {
            es: { profile: "Perfil", logout: "Cerrar sesión", register: "Regístrate", login: "Inicia sesión", publish: "Publícate", flag: "🇪🇸" },
            en: { profile: "Profile", logout: "Log out", register: "Sign up", login: "Log in", publish: "Post Ad", flag: "🇬🇧" }
        };

        let navBarContent = isLoggedInBoolean
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
                        <li class="nav-container-li lang-toggle"><button id="lang-btn">${translations[lang].flag}</button></li>
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
                        <li class="nav-container-li lang-toggle"><button id="lang-btn">${translations[lang].flag}</button></li>
                    </ul>
                </nav>`;
        
        navContainer.innerHTML = navBarContent;
    }

    navContainer.addEventListener("click", (e) => {
        if (e.target && e.target.id === "lang-btn") {
            const currentLang = getLanguage();
            const newLang = currentLang === "es" ? "en" : "es";
            setLanguage(newLang);
            renderNav();
        }
    });
    renderNav();
});
