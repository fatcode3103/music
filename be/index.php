<?php
include "./user.php";

$users = User::getAllUsers();

print_r($users);
