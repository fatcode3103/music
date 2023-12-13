<?php
include "classes/user.php";

if (isset($_POST['admin'])) {
    if ($_POST['username'] == "admin" && $_POST['password'] == "admin") {
        setcookie("username", 'admin', time() + 3600, "/");
        header("Location: ../fe/dashboard/userManagement/userManagement.html");
    } else {
        header("Location: ../fe/dashboard/login/login.html?error=true");
    }
} else {
    if ($_POST['username'] != "" && $_POST['password'] != "") {
        $user = new User();

        $username = $_POST['username'];
        $password = $_POST['password'];

        $data = [$_POST['username'], $_POST['password']];
        $res = $user->login($data);

        if ($res === true) {
            // Login successful, redirect to home page
            setcookie("username", $_POST['username'], time() + 3600, "/");
            header("Location: ../fe/index.html");
        } else {
            $error_message = $res;
        }
    } else {
        $error_message = "Xin vui lòng điền đầy đủ vào những ô trống cần thiết !";
    }
    echo "<script type='text/javascript'>
            alert('$error_message');
            window.location.href = '../fe/login.php';
          </script>";
}
