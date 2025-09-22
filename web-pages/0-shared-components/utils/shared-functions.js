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
    export function setLoginState(hasLogged) {
        localStorage.setItem("isLoggedIn", hasLogged.toString());
        document.dispatchEvent(new CustomEvent("userHasLogged"));
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
    export function setLanguage(Lang) {
        localStorage.setItem("lang", Lang);
        document.dispatchEvent(new CustomEvent("languageChange"));
    }
    
    // TODO: Replace localStorage-based company publish state with server-side data
//       Future plan: Get this info from the login endpoint response or dedicated API
    export function getCompanyPublishState() {
        let value = localStorage.getItem("hasPublishedCompany");
        if (value === null) {
            localStorage.setItem("hasPublishedCompany", "false");
            return false;
        }
        return value === "true";
    }

    export function setCompanyPublishState(hasPublished) {
        localStorage.setItem("hasPublishedCompany", hasPublished.toString());
        document.dispatchEvent(new CustomEvent("companyPublishStateChange"));
    }