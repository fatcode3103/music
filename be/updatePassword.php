<?php
include_once "classes/user.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = file_get_contents("php://input");
    $userEdit = json_decode($data, true);

    $oldPassword = $userEdit['oldPassword'];
    $newPassword = $userEdit['newPassword'];
    $username = $userEdit['username'];

    $user = new User();

    $dataCheck = array($username, $oldPassword);
    $dataUpdate = array($newPassword, $username);

    echo $user->checkPassword($dataCheck);

    if ($user->checkPassword($dataCheck)) {
        $user->updatePassword($dataUpdate);
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}
