<?php
include_once "./classes/artist.php";

$allSinger = new Artist;

echo json_encode($allSinger->getAllSingers());

exit();
