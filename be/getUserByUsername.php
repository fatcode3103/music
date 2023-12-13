<?php
include "classes/user.php";

$user = new User();

if ($_GET(['username'])) {
    echo json_encode($user->getUserByName($_GET(['username'])));
}
