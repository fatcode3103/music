<?php
include "classes/release.php";

//Xử lí form cập nhật album
if (isset($_REQUEST['submit1']))
if ( $_POST['release_id'] != "") 
    {   
        $name = $_POST['rel_name'];
        $img= $_POST['image'];
        $si_id = $_POST['singer_id'];
        $about = $_POST['about'];
        $id = $_POST['release_id'];

        $alb = new Release();
        $data = [$name, $img, $about,$si_id,$id];
        $res = $alb->editAlbumById($data);

        if ($res === true) {
            $error_message = "Cập nhật thành công";
        } else {
            $error_message = $res;
        }
    } else {
        $error_message = "Lỗi khi lấy ID";
    }
    echo "<script type='text/javascript'>
            alert('$error_message');
            // window.location.href = '../fe/dashboard/albumManagement/albumManagement.html';           
          </script>";
    header("Location: ../fe/dashboard/albumManagement/albumManagement.html");