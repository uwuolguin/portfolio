document.addEventListener('DOMContentLoaded', () => {
    const navContainer = document.getElementById('nav-container-component');
    const isLoggedIn = false; 

    let navBarContent;

    if (isLoggedIn) {
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