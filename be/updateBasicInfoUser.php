<?php
include_once "classes/user.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = file_get_contents("php://input");
    $userEdit = json_decode($data, true); // return a php array

    $user = new User();

    echo json_encode($user->updateBasicInfoUser($userEdit));
}
