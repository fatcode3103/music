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
                "http://localhost:3000/fe/index.html";
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

const getAllAlbum = async () => {
    try { 
        const res = await fetch("http://localhost:3000/be/getAllAlbum.php");
        if (res.ok && res.status === 200) {
            const allAlbums = await res.json();
            console.log("allAlbum:>>> ", allAlbums);
            return allAlbums;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const displayAlbumToTable = async (albums) => {
    const tableElement = document.getElementsByTagName("table");
    albums.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-item-id", item.release_id);
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.rel_name || "-"}</td>
            <td>${item.stage_name || "-"}</td>            
            <td>${item.numberOfTracks || "-"}</td>
            <td>
                <i data-bs-toggle="modal" data-bs-target="#exampleModal"
                    class="fa-regular fa-pen-to-square btn-edit" onclick ="updateAlbumByID(${ item.release_id })"
                ></i>
                <i onclick="deleteAlbumById(${
                    item.release_id
                })"class="fa-regular fa-trash-can"></i>
            </td>
            
        `;
        tableElement[0].appendChild(row);
    });
};

const redirectAdminAfterLogin = () => {
    let cookieValue = "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) {
        cookieValue = parts.pop().split(";").shift();
    }
    if (cookieValue !== "admin") {
        window.location.href = "../../../fe/dashboard/login/login.html";
    }
};

function toggleMenu() {
    var menu = document.getElementById("menu-admin");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

const deleteAlbumById = async (albumId) => {
    var formData = new FormData();
    formData.append("release_id", albumId);
    const response = await fetch("../../../be/deleteAlbumById.php", {
        method: "POST",
        body: formData,
    });

    if (!response.ok || response.status !== 200) {
        alert(`Error: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
    } else {
        alert("Xoá thành công!");
        // Xóa hàng có release_id tương ứng khỏi DOM
        const deletedRow = document.querySelector(
            `tr[data-item-id="${albumId}"]`
        );
        if (deletedRow) {
            deletedRow.remove();
        } else {
            console.warn(`Row with user_id ${albumId} not found in DOM.`);
        }
    }
}

const updateAlbumByID = async (release_id) => {
    var formData = new FormData();
    formData.append("release_id", release_id);

    let getID = document.getElementById("release_id");
    let ten = document.getElementById("ten");
    let anh = document.getElementById("anh");
    let casi = document.getElementById("casi");
    let noidung = document.getElementById("noidung");

    getID.value = release_id;

    const response = await fetch(`../../../be/getAlbumID.php?albumId=${release_id}`, {
        method: "GET",
    });
    let aa = await response.json()
    console.log(aa[0]);
    anh.value = aa[0].image;
    ten.value = aa[0].rel_name;
    casi.value = aa[0].singer_id;
    noidung.value = aa[0].about;
}