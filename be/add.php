<?php
include "classes/release.php";

//Xử lí form thêm album của nghệ sĩ

if (isset($_GET['submit']))
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
        echo "<script type='text/javascript'>
            window.alert('Them thanh cong');
            </script>";
    } else {
        echo "<script type='text/javascript'>
            window.alert('Chưa nhập đủ thông tin!');
            </script>";
    }
