document.addEventListener("DOMContentLoaded", function () {
    redirectUserAfterLogin();
});

const redirectUserAfterLogin = () => {
    let cookieName = "username";
    let cookies = document.cookie.split(";");
    let cookieValue = null;
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName + "=") === 0) {
            cookieValue = cookie.substring(
                (cookieName + "=").length,
                cookie.length
            );
            break;
        }
    }
    if (cookieValue !== "user") {
        window.location.href = "http://localhost:3000/fe/login/login.html";
    }
};
