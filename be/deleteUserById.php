<?php
include_once "./classes/user.php";

$user = new User();

if (isset($_POST['user_id'])) {
    $userId = $_POST['user_id'];
    $result = $user->deleteUserById($userId);
} else {
    echo json_encode(['error' => 'Missing user_id parameter']);
}

exit();
