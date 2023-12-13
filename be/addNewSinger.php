<?php
include_once "./classes/artist.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $data = file_get_contents("php://input");
    $singer = json_decode($data, true); // return a php array

    $artist = new Artist();
    $result = $artist->addNewSinger($singer);

    echo json_encode($result);
}
