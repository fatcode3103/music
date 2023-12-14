<?php
include('classes/db.php');
// $stmt = DB::getConnection();
$singer = DB::execute("SELECT*FROM singers LIMIT 7");
// $singer = $stmt->get_result();
echo json_encode($singer);
?>