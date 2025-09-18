    // TODO: Replace localStorage-based login state with a server-side session check.
    //       Future plan: use secure HttpOnly cookies + /api/check-session endpoint
    //       instead of reading isLoggedIn from localStorage.
    export function getLoginState() {
        let value = localStorage.getItem("isLoggedIn");
        if (value === null) {
            localStorage.setItem("isLoggedIn", "false");
            return false;
        }
        return value === "true";
    }

    // TODO: In the future, consider storing the language preference in the server-side
    //       session or user profile instead of localStorage for better security.
    export function getLanguage() {
        let lang = localStorage.getItem("lang");
        if (!lang) {
            localStorage.setItem("lang", "es"); // default Spanish
            return "es";
        }
        return lang;
    }