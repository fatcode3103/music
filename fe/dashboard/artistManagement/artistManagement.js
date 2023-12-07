document.addEventListener("DOMContentLoaded", function () {
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
        window.location.href = "./dashboard/login/login.html";
    }
};

function toggleMenu() {
    var menu = document.getElementById("menu-admin");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}
