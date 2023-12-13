<?php
include "./classes/release.php";
//Get Album

$album1 = new Release();

if (isset($_GET['albumId'])) {

    $albumId = $_GET['albumId'];

    $result = $album1->getAlbum($albumId);

    echo json_encode($result);

} else {
    echo json_encode(['error' => 'Missing release_id parameter']);
}
exit();