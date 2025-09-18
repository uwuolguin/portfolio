document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-container-component');

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

    const isLoggedInBoolean = getLoginState();

    let navBarContent;

    if (isLoggedInBoolean) {
        navBarContent = `
            <nav class="nav-container-flex-container">
                <div class="nav-container-logo-container">
                    <a href="www.google.cl">
                        <img src="../../logos-pictures/logos/logoSVG.svg" alt="Proveo Logo" >
                    </a>
                </div>
                <ul class="nav-container-ul">
                    <li class="nav-container-li"><a href="#" class="nav-container-a">Perfil</a></li>
                    <li class="nav-container-li"><a href="#" class="nav-container-a">Cerrar sesión</a></li>
                </ul>
            </nav>
        `;
    } else {
        navBarContent = `
            <nav class="nav-container-flex-container">
                <div class="nav-container-logo-container">
                    <a href="www.google.cl">
                        <img src="../../logos-pictures/logos/logoSVG.svg" alt="Proveo Logo" >
                    </a>
                </div>
                <ul class="nav-container-ul">
                    <li class="nav-container-li"><a href="#" class="nav-container-a">Regístrate</a></li>
                    <li class="nav-container-li"><a href="#" class="nav-container-a">Inicia sesión</a></li>
                    <li class="nav-container-li"><a href="#" class="nav-container-a">Publícate</a></li>
                </ul>
            </nav>
        `;
    }

    navContainer.innerHTML = navBarContent;
});