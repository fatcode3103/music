<?php
include_once "./classes/artist.php";

$singer = new Artist();

if (isset($_POST['singer_id'])) {
    $singerId = $_POST['singer_id'];
    $result = $singer->deleteSingerById($singerId);
}

exit();
