<?php
include "classes/user.php";

if (isset($_POST['submit'])) {
    if ($_POST['username'] != "" && $_POST['password'] != "") {
        $user = new User();

        $username = $_POST['username'];
        $password = $_POST['password'];

        $data = [$_POST['username'], $_POST['password']];
        $res = $user->login($data);

        if ($res === true) {
            // Login successful, redirect to home page
            setcookie("username", $username, time() + 3600, "/");
            header("Location: signup.html");
        } else {
            $error_message = $res;
        }
    } else {
        $error_message = "Xin vui lòng điền đầy đủ vào những ô trống cần thiết !";
    }
    echo "<script type='text/javascript'>
            alert('$error_message');
            window.location.href = 'login.html';
          </script>";
}
