<?php
include "classes/release.php";

//Get all album

$allAlbums = new Release;
echo json_encode($allAlbums->getAllAlbum());
exit();

//Delete Album by ID


