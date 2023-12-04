<?php
include "classes/user.php";
//xử lí form đăng kí
if (isset($_POST['submit']))
    if (
        $_POST['username'] != ''
        && $_POST['password'] != ''
        && $_POST['name'] != ''
    ) {
        $user_model = new User();

        //kiểm tra trùng user
        $r = count($user_model->getUserByName($_POST['username']));
        if ($r == 0) {
            $user = array(
                'name' => $_POST['name'],
                'username' => $_POST['username'],
                'password' => $_POST['password']
            );
            $user_model->signup($user);

            //Đăng ký thành công và thông báo
            echo "<script type='text/javascript'>
            window.alert('Đăng kí thành công');
            </script>";
            
        } else {
            echo "<script type='text/javascript'>
            window.alert('Trùng tên đăng nhập!');
            </script>";
                       
        }
    } else {
        echo "<script type='text/javascript'>
            window.alert('Chưa nhập đủ thông tin!');
            </script>";
    }
