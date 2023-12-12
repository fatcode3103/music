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
        window.location.href =
            "http://localhost:3000/fe/dashboard/login/login.html";
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
};
// const updateAlbumByID = async (release_id) => {

//     var formData = new FormData();
//     formData.append("release_id", release_id);
//     var getID = document.getElementById("release_id");
//     var ten = document.getElementById("Ten");
//     var anh = document.getElementById("anh");
//     var casi = document.getElementById("casi");
//     var noidung = document.getElementById("noidung");

//     getID.value = release_id;
//     ten.value='Khanh';
//     // const result = document.querySelector(".singer");                                                   
//     async function getData() {
//         try {
//             const response = await fetch("/be/getdemo.php");
//             const album1 = await response.json();
//             return album1;
//         } catch (error) {
//             console.error('Lỗi khi lấy dữ liệu:', error);
//             return [];
//         }
//     }

//     (async () => {
//         const album1 = await getData();
//         console.log(album1);



//         for (const item of album1){
//             if (getID.value == item.release_id) {
                
//                 ten.value = item.rel_name; 
//                 anh.value = item.image; 
//                 casi.value = item.singer_id;
//                 noidung.value = item.about;
//                 break;
//             } else{
//                 console.error('Lỗi');
//             }            
//         }
    
//     })();

// }

const updateAlbumByID = async (release_id) => {
    var formData = new FormData();
    formData.append("release_id", release_id);

    var getID = document.getElementById("release_id");
    var ten = document.getElementById("Ten");
    var anh = document.getElementById("anh");
    var casi = document.getElementById("casi");
    var noidung = document.getElementById("noidung");

    getID.value = release_id;

    const response = await fetch("../../../be/getdemo.php", {
        method: "POST",
        body: formData,
    });
    console.log(response);
    // if (!response.ok || response.status !== 200) {
    //     alert(`Error: ${response.status}`);
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // } else {
    //     for (const item of album1) {
    //         if (getID.value == item.release_id) {
    //           anh.value = item.image;
    //           ten.value = item.rel_name;
    //           casi.value = item.singer_id;
    //           noidung.value = item.about;              
    //           break; // Thoát khỏi vòng lặp khi tìm thấy kết quả
    //         }
    //       }

    //     // alert("Xoá thành công!");
    //     // // Xóa hàng có release_id tương ứng khỏi DOM
    //     // const deletedRow = document.querySelector(
    //     //     `tr[data-item-id="${albumId}"]`
    //     // );
        
    // }


    // var getID = document.getElementById("release_id");
    // var ten = document.getElementById("Ten");
    // var anh = document.getElementById("anh");
    // var casi = document.getElementById("casi");
    // var noidung = document.getElementById("noidung");
  
    // getID.value = release_id;
  
    // async function getData() {
    //   try {
    //     const response = await fetch("../../../be/getdemo.php");
    //     const album1 = await response.json();
    //     return album1;
    //   } catch (error) {
    //     console.error('Lỗi khi lấy dữ liệu:', error);
    //     return [];
    //   }
    // }
  
    // (async () => {
    //   const album1 = await getData();
    //   console.log(album1);
  
    //   let found = false; // Sử dụng biến để kiểm tra xem có tìm thấy hay không
  
    //   for (const item of album1) {
    //     if (getID.value == item.release_id) {
    //       anh.value = item.image;
    //       ten.value = item.rel_name;
    //       casi.value = item.singer_id;
    //       noidung.value = item.about;
    //       found = true; // Đặt biến found thành true khi tìm thấy kết quả
    //       break; // Thoát khỏi vòng lặp khi tìm thấy kết quả
    //     }
    //   }
  
    //   if (!found) {
    //     console.error('Lỗi: Không tìm thấy release_id trong album1');
    //   }
    // })();
  }

// const getAllAlbums = async () => {
//     try { 
//         const res = await fetch("http://localhost:3000/be/getdemo.php");
//         if (res.ok && res.status === 200) {
//             const allAlbum1 = await res.json();
//             console.log("allAlbum1:>>> ", allAlbum1);
//             return allAlbum1;
//         } else {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//     } catch (e) {
//         console.log(e);
//     }
    
// };