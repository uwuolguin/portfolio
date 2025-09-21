window.addEventListener("storage", (event) => {
    if (event.key === "lang") {
        location.reload();
    }
});
