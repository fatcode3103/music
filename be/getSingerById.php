<?php
include_once "./classes/artist.php";


if (isset($_GET['singerId'])) {
    $singer = new Artist();
    $singerId = $_GET['singerId'];
    echo json_encode($singer->getSingerById($singerId));
}

exit();
