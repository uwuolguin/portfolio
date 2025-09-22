window.addEventListener("storage", (event) => {
    if (event.key === "lang" || event.key === "isLoggedIn" || event.key === "hasPublishedCompany") {
        location.reload();
    }
});