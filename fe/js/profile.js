document.addEventListener("DOMContentLoaded", async () => {
    //get value user name in local
    const username = localStorage.getItem("mytime");
    getUserByUsername(username);
});

const getUserByUsername = async (userNameCurr) => {
    try {
        const res = await fetch(
            `../../be/getUserByUsername.php?username=${userNameCurr}`
        );
        if (res.ok && res.status === 200) {
            const repo = await res.json();
            console.log(repo);
        } else {
            throw new Error(`HTTP error! Status: ${res.status}`);
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
        console.log(e);
    }
};
