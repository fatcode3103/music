<?php
include_once "classes/track.php";
include_once "classes/artist.php";
include_once "classes/release.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $param = $_GET['param'];
    $singer = new Artist();
    $track = new Track();
    $release = new Release();

    $singerResults = $singer->searchByName($param);
    $trackResults = $track->searchByName($param);
    $releaseResults = $release->searchByName($param);

    $response = array(
        'singer' => $singerResults,
        'track' => $trackResults,
        'release' => $releaseResults
    );

    echo json_encode($response);
}
