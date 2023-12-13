<?php
include "classes/user.php";

$user = new User();

if (isset($_GET['username'])) {
    echo json_encode($user->getUserByName($_GET['username']));
}
