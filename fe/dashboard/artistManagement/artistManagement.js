const btnLogoutElement = document.querySelector(".btn-logout");
const loaderElement = document.querySelector(".loader");

function updateLoaderDisplay(isLoading) {
    loaderElement.style.display = isLoading ? "block" : "none";
}

btnLogoutElement.onclick = async () => {
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
            window.location.href =
                "http://localhost:3000/fe/dashboard/login/login.html";
        }
    } catch (e) {
        console.log(e);
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    // Lấy URL hiện tại
    const currentUrl = window.location.href;

    // Lấy danh sách các link trong navbar
    const navLinks = document.querySelectorAll(".navbar-item");

    // Duyệt qua từng link và kiểm tra nếu URL của link trùng với URL hiện tại thì thêm class 'active'
    navLinks.forEach((link) => {
        if (link.href === currentUrl) {
            link.classList.add("active");
        }
    });

    redirectAdminAfterLogin();
});

const getAllSingers = async () => {
    try {
        const res = await fetch("http://localhost:3000/be/getAllSingers.php");
        if (res.ok && res.status === 200) {
            const allSinger = await res.json();
            console.log("allSinger:>>> ", allSinger);
            return allSinger;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const displaySingersToTable = async (singers) => {
    const tableElement = document.getElementsByTagName("table");
    singers.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-item-id", item.singer_id);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.stage_name || "-"}</td>
            <td>${item.si_name || "-"}</td>
            <td>${item.numberOfReleases || "-"}</td>
            <td>
                <i
                    class="fa-regular fa-pen-to-square btn-edit"
                ></i>
                <i class="fa-regular fa-trash-can"></i>
            </td>
        `;
        tableElement[0].appendChild(row);
    });
};

const redirectAdminAfterLogin = () => {
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
    if (cookieValue !== "admin") {
        window.location.href =
            "http://localhost:3000/fe/dashboard/login/login.html";
    }
};

function toggleMenu() {
    var menu = document.getElementById("menu-admin");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
