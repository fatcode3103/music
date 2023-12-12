<?php
include_once "./classes/release.php";

$album = new Release();

echo $_POST['release_id'];

if (isset($_POST['release_id'])) {
    $albumId = $_POST['release_id'];
    $result = $album->deleteAlbumById($albumId);
} else {
    echo json_encode(['error' => 'Missing release_id parameter']);
}

exit();
