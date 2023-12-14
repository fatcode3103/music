<?php
include('classes/db.php');
$album = DB::execute("SELECT*FROM releases LIMIT 5");
echo json_encode($album);
?>  