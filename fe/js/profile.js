const userNameElement = document.querySelector(".user-name-profile");
const nameSettingElement = document.querySelector(".name-profile-setting");
const userNameSettingElement = document.querySelector(
    ".user-name-profile-setting"
);
const userIdElement = document.querySelector(".user-id-profile");
const btnChangeUserNameElement = document.querySelector(".btn-change-username");

let userIdCurr;

document.addEventListener("DOMContentLoaded", async () => {
    const toastMessage = localStorage.getItem("toastMessage");

    if (toastMessage) {
        Toastify({
            text: toastMessage,
            className: "success",
            position: "center",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();

        localStorage.removeItem("toastMessage");
    }

    redirectUserAfterLogin();

    //get value user name in local
    const username = getCookieByName("username");
    getUserByUsername(username);
});

const getCookieByName = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
};

const getUserByUsername = async (userNameCurr) => {
    try {
        const res = await fetch(
            `../../be/getUserByUsername.php?username=${userNameCurr}`
        );
        if (res.ok && res.status === 200) {
            const repo = await res.json();
            console.log(repo[0]);
            userIdCurr = repo[0].user_id;
            fillInfoToHtml(repo[0]);
        } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
    } catch (e) {
        console.log(e);
    }
};

const fillInfoToHtml = (data) => {
    userNameElement.innerHTML = data.name;
    userNameSettingElement.value = data.username;
    nameSettingElement.value = data.name;
    userIdElement.innerHTML = data.user_id;
};

btnChangeUserNameElement.onclick = async () => {
    const newName = nameSettingElement.value;
    const newUserName = userNameSettingElement.value;
    const data = {
        name: newName,
        username: newUserName,
        user_id: userIdCurr,
    };

    const res = await fetch("../../be/updateBasicInfoUser.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (res.ok && res.status === 200) {
        localStorage.setItem(
            "toastMessage",
            "Update basic information successful"
        );
        window.location.reload();
    } else {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
};

const redirectUserAfterLogin = () => {
    let cookieValue = "";
    const value = `; ${document.cookie}`;
    const parts = value.split(`; username=`);
    if (parts.length === 2) {
        cookieValue = parts.pop().split(";").shift();
    }
    if (!cookieValue) {
        window.location.href = "../../fe/login.html";
    }
};
