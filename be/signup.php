<?php
include "./classes/user.php";
//xử lí form đăng kí
if(isset($_POST['submit']))
if(
    $_POST['username'] != ''
    && $_POST['password'] != ''
    && $_POST['name'] != '')
    {
        $user_model = new User();
        
        //kiểm tra trùng user
        $r = count($user_model->getUserByName($_POST['username']));
        if ($r==0){
            $user = array(
                'username' => $_POST['username'],
                'password' => $_POST['password']
            );
            $user_model->signup($user);
            echo "Đăng ký thành công";
        } else{
            echo "Trùng tên đăng nhập";
        }
    }
    else{
        echo "Chưa nhập đủ thông tin";
    }


?>