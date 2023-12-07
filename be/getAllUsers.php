<?php
include_once "./classes/user.php";

$allUser = User::getAllUsers();

echo json_encode($allUser);

exit();
