<?php
include "classes/release.php";

//Xử lí form thêm album của nghệ sĩ

if (isset($_REQUEST['submit']))
    if (
        $_POST['rel_name'] != ''
        && $_POST['about'] != ''
        && $_POST['image'] != ''
        && $_POST['singer_id'] != ''
    ) {
        $release_model = new Release();
        $release = array(
            'rel_name' => $_POST['rel_name'],
            'about' => $_POST['about'],
            'image' => $_POST['image'],
            'singer_id' => $_POST['singer_id']
        );
        $release_model->addAlbum($release);
        header("Location: ../fe/dashboard/albumManagement/albumManagement.html");
        echo "<script type='text/javascript'>
            window.alert('Them thanh cong');
            </script>";
    } else {
        echo "<script type='text/javascript'>
            window.alert('Chưa nhập đủ thông tin!');
            </script>";
    } else {
        echo "<script type='text/javascript'>
            window.alert('Lỗi');
            </script>";
    }
