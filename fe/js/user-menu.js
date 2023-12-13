const btnLogin = document.querySelector(".login-form-btn");
const avartarUser = document.querySelector(".avartar-user");
const avartarUserMenu = document.querySelector(".avatar-menu");
const logoutBtn = document.querySelector(".logout-menu-user");

document.addEventListener("DOMContentLoaded", () => {
    const usernameCookie = getCookie("username");

    if (usernameCookie === "user") {
        avartarUser.style.display = "block";
    } else {
        btnLogin.style.display = "block";
    }
});
//user menu
const toggleMenu = () => {
    avartarUserMenu.style.display =
        avartarUserMenu.style.display === "block" ? "none" : "block";
};

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

logoutBtn.onclick = async () => {
    try {
        const params = new URLSearchParams();
        params.append("logout", true);
        const url = "../../../be/logout.php?" + params.toString();
        const response = await fetch(url, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok || response.status !== 200) {
            alert("Logout failed !");
        } else {
            window.location.href = "../../../fe/login.html";
        }
    } catch (e) {
        console.log(e);
    }
};
//
