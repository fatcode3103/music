<?php
include('classes/db.php');

$query = " SELECT tracks.*, singers.stage_name
FROM tracks
JOIN releases ON tracks.release_id = releases.release_id
JOIN singers ON releases.singer_id = singers.singer_id
WHERE tracks.release_id = ?
";
$id = $_GET['albumID'];
// $id = 3;
$data = array($id);
$songs = DB::execute($query,$data);

echo json_encode($songs);
?>