<?php
include "./classes/db.php";
//Get Singer ID
$singer = DB::execute("Select * from singers");
echo json_encode($singer);

