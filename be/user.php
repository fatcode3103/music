<?php
include_once "./db.php";


class User
{

    static public function getAllUsers()
    {
        $sql = "select * from user";
        $users = DB::execute($sql);
        return $users;
    }
}
