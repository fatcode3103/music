<?php
include('classes/db.php');

$query = "SELECT tracks.*, singers.stage_name
    FROM tracks
    JOIN releases ON tracks.release_id = releases.release_id
    JOIN singers ON releases.singer_id = singers.singer_id
    GROUP BY tracks.track_id
    order by tracks.listen desc
";

$songs = DB::execute($query);

echo json_encode($songs);
?>

 