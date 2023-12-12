<?php
include "./classes/db.php";
//Get Album

$album1 = new Release();
// $album1->editAlbumById($)
// echo json_encode($album1);
echo $_POST['release_id'];

if (isset($_POST['release_id'])) {
    $albumId = $_POST['release_id'];
    $result = $album->editAlbumById($albumId);
} else {
    echo json_encode(['error' => 'Missing release_id parameter']);
}

exit();