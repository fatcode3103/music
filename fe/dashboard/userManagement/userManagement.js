const btnLogoutElement = document.querySelector(".btn-logout");
const loaderElement = document.querySelector(".loader");

function updateLoaderDisplay(isLoading) {
    loaderElement.style.display = isLoading ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", (e) => {
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

    //all users
    getAllUsers();

    redirectAdminAfterLogin();
});

const redirectAdminAfterLogin = () => {
    let cookieValue = "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) {
        cookieValue = parts.pop().split(";").shift();
    }
    if (cookieValue !== "admin") {
        window.location.href =
            "http://localhost:3000/fe/dashboard/login/login.html";
    }
};

const toggleMenu = () => {
    var menu = document.getElementById("menu-admin");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
};

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

const getAllUsers = async () => {
    try {
        updateLoaderDisplay(true);
        const res = await fetch("http://localhost:3000/be/getAllUsers.php");
        if (res.ok && res.status === 200) {
            setTimeout(async () => {
                const allUser = await res.json();
                console.log(allUser);
                updateLoaderDisplay(false);
                displayUsersToTable(allUser);
            }, 1000);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const displayUsersToTable = (users) => {
    const tableElement = document.getElementsByTagName("table");

    users.forEach((user, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-user-id", user.user_id);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name || "-"}</td>
            <td>${user.username || "-"}</td>
            <td>${user.password || "-"}</td>
            <td>${user.playlist_count || "-"}</td>
            <td><i onclick="deleteUserById(${
                user.user_id
            })" class="fa-regular fa-trash-can"></i></td>
        `;
        tableElement[0].appendChild(row);
    });
};

const deleteUserById = async (userId) => {
    var formData = new FormData();
    formData.append("user_id", userId);
    const response = await fetch("../../../be/deleteUserById.php", {
        method: "POST",
        body: formData,
    });

    if (!response.ok || response.status !== 200) {
        Toastify({
            text: `Error: ${response.status}`,
            className: "success",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        const deletedRow = document.querySelector(
            `tr[data-user-id="${userId}"]`
        );
        if (deletedRow) {
            deletedRow.remove();
        }
        Toastify({
            text: "Delete user success",
            className: "success",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
};
