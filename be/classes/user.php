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
    public function signup($user) {
        $sql = "insert into users(username, password)
        values('".$user['username']."','".$user['password']."')";
        $insert = DB::execute($sql);
        return $insert;
    }
    public function getUserByName($username)
    {
        
        $sql = "select * from users where username = :username ";

        $data = array(':username'=>$username);
        $users = DB::execute($sql, $data);
        return $users;
    }
}
