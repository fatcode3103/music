const btnLogoutElement = document.querySelector(".btn-logout");
const loaderElement = document.querySelector(".loader");
const addSingerBtn = document.querySelector(
    ".wrapper-btn-new-singer button[data-bs-target='#exampleModal']"
);

let totalPages = 0;
let currentPage = 1;
let recordsPerPage = 5;
let modalMode = "add"; // Default mode is "add"

const prevPage = () => {
    if (currentPage > 1) {
        currentPage--;
        displaySingersToTable([]);
        getAllSingers();
    }
};

const nextPage = () => {
    if (currentPage < totalPages) {
        currentPage++;
        displaySingersToTable([]);
        getAllSingers();
    }
};

function updateLoaderDisplay(isLoading) {
    loaderElement.style.display = isLoading ? "block" : "none";
}

addSingerBtn.addEventListener("click", () => {
    modalMode = "add";
    clearModalFields();
});

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
            window.location.href = "../../../fe/dashboard/login/login.html";
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

    const addSingerBtn = document.querySelector(
        ".wrapper-btn-new-singer button[data-bs-target='#exampleModal']"
    );

    addSingerBtn.addEventListener("click", () => {
        // Xóa giá trị các trường nhập liệu khi mở modal
        clearModalFields();
    });

    redirectAdminAfterLogin();

    await getAllSingers();
});

const getAllSingers = async () => {
    try {
        updateLoaderDisplay(true);
        setTimeout(async () => {
            const singers = await allSingers();
            totalPages = Math.ceil(singers.length / recordsPerPage);
            displaySingersToTable(singers);
            updateLoaderDisplay(false);
        }, 1000);
    } catch (error) {
        console.error(error);
    }
};

const allSingers = async () => {
    try {
        const res = await fetch("../../../be/getAllSingers.php");
        if (res.ok && res.status === 200) {
            const allSinger = await res.json();
            return allSinger;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const displaySingersToTable = async (singers) => {
    const tableElement = document.querySelector("table");
    const existingTitleRow = tableElement.querySelector("tr:first-child"); // Select the first row (title row)
    clearTable();

    if (existingTitleRow) {
        // Clone the existing title row and append the clone
        const clonedTitleRow = existingTitleRow.cloneNode(true);
        tableElement.appendChild(clonedTitleRow);
    }

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const singersToShow = singers.slice(startIndex, endIndex);

    singersToShow.forEach((item, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-item-id", item.singer_id);
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${item.stage_name || "-"}</td>
            <td>${item.si_name || "-"}</td>
            <td>${item.numberOfReleases || "-"}</td>
            <td>
                <i class="fa-regular fa-pen-to-square btn-edit" onclick="getSingerById(${
                    item.singer_id
                })"></i>
                <i onclick="deleteSingerById(${
                    item.singer_id
                })" class="fa-regular fa-trash-can"></i>
            </td>
        `;
        tableElement.appendChild(row);
    });

    document.getElementById(
        "pageInfo"
    ).innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById("pagination").style.display =
        totalPages > 1 ? "block" : "none";
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

function addNewSingerHandler() {
    const stageName = document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ danh']"
    ).value;
    const realName = document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ sĩ']"
    ).value;
    const imageUrl = document.querySelector(
        "#exampleModal input[placeholder='Chèn link ảnh']"
    ).value;
    const introduction = document.querySelector(
        "#exampleModal input[placeholder='Giới thiệu sơ bộ']"
    ).value;
    const biography = document.querySelector("#exampleModal textarea").value;

    if (modalMode === "add") {
        addNewSinger(stageName, realName, imageUrl, introduction, biography);
    } else if (modalMode === "edit") {
        editSingerById(stageName, realName, imageUrl, introduction, biography);
    }
}

const addNewSinger = async (
    stageName,
    realName,
    imageUrl,
    introduction,
    biography
) => {
    const data = {
        stageName: stageName,
        realName: realName,
        imageUrl: imageUrl,
        introduction: introduction,
        biography: biography,
    };

    try {
        const res = await fetch("../../../be/addNewSinger.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.ok && res.status === 200) {
            await updateTable();
            Toastify({
                text: "Add new singer success",
                className: "success",
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
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

const deleteSingerById = async (singerId) => {
    try {
        var formData = new FormData();
        formData.append("singer_id", singerId);
        const response = await fetch("../../../be/deleteSingerById.php", {
            method: "POST",
            body: formData,
        });

        if (!response.ok || response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
            await updateTable();
            Toastify({
                text: "Delete user success",
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
            className: "info",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
    }
};

const getSingerById = async (singerId) => {
    try {
        const myModal = new bootstrap.Modal(
            document.getElementById("exampleModal")
        );
        myModal.show();
        modalMode = "edit";
        const res = await fetch(
            `../../../getSingerById.php?singerId=${singerId}`
        );
        if (res.ok && res.status === 200) {
            const result = await res.json();
            fillModalForEdit(result[0]);
            console.log(result[0]);
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const editSingerById = () => {};

const fillModalForEdit = (singerDetails) => {
    document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ danh']"
    ).value = singerDetails.stage_name || "";
    document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ sĩ']"
    ).value = singerDetails.si_name || "";
    document.querySelector(
        "#exampleModal input[placeholder='Chèn link ảnh']"
    ).value = singerDetails.image || "";
    document.querySelector(
        "#exampleModal input[placeholder='Giới thiệu sơ bộ']"
    ).value = singerDetails.subtitle || "";
    document.querySelector("#exampleModal textarea").value =
        singerDetails.about || "";
};

function clearModalFields() {
    document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ danh']"
    ).value = "";
    document.querySelector(
        "#exampleModal input[placeholder='Nhập tên nghệ sĩ']"
    ).value = "";
    document.querySelector(
        "#exampleModal input[placeholder='Chèn link ảnh']"
    ).value = "";
    document.querySelector(
        "#exampleModal input[placeholder='Giới thiệu sơ bộ']"
    ).value = "";
    document.querySelector("#exampleModal textarea").value = "";
}

function clearTable() {
    const table = document.getElementById("table");
    if (table) {
        while (table.rows.length > 0) {
            table.deleteRow(0);
        }
    } else {
        console.error("Bảng không tồn tại.");
    }
}

const updateTable = async () => {
    const value = await allSingers();
    clearTable();
    displaySingersToTable(value);
};
