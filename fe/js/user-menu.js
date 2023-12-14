const btnLogin = document.querySelector(".login-form-btn");
const avartarUser = document.querySelector(".avartar-user");
const avartarUserMenu = document.querySelector(".avatar-menu");
const logoutBtn = document.querySelector(".logout-menu-user");

document.addEventListener("DOMContentLoaded", () => {
    const usernameCookie = getCookie("username");
    if (usernameCookie) {
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
//search
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-btn");

searchButton.addEventListener("click", function () {
    performSearch();
});

searchInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        performSearch();
    }
});

const performSearch = async () => {
    try {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== "") {
            const response = await fetch(
                `../../be/search.php?param=${searchTerm}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok && response.status === 200) {
                const res = await response.json();
                localStorage.setItem("searchResult", JSON.stringify(res));
                window.location.href = `../../fe/search.html?q=${searchTerm}`;
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } else {
            Toastify({
                text: "Missing search term",
                className: "success",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        }
    } catch (e) {
        Toastify({
            text: e,
            className: "success",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
};
