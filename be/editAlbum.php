<?php
include "classes/release.php";

//Xử lí form cập nhật album


if (isset($_REQUEST['submit1']))
if ($_POST['rel_name'] != "" 
    && $_POST['image'] != ""
    && $_POST['singer_id'] != ""
    && $_POST['about'] != ""
    && $_REQUEST['release_id'] != "") 
    {   
        $name = $_POST['rel_name'];
        $img= $_POST['image'];
        $si_id = $_POST['singer_id'];
        $about = $_POST['about'];
        $id = $_REQUEST['release_id'];
        $alb = new Release();

        // $username = $_POST['username'];
        // $password = $_POST['password'];

        $data = [$name, $img, $si_id, $about,$id];
        $res = $alb->editAlbumById($data);

        if ($res === true) {
            $error_message = "Cập nhật thành công";
        } else {
            $error_message = $res;
        }
    } else {
        $error_message = "Xin vui lòng điền đầy đủ vào những ô trống cần thiết !";
    }
    echo "<script type='text/javascript'>
            alert('$error_message');
            
          </script>";