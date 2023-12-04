<?php
include_once "db.php";


class User
{

    static public function getAllUsers()
    {
        $sql = "select * from user";
        $users = DB::execute($sql);
        return $users;
    }
    public function signup($user)
    {
        $sql = "insert into users(name, username, password)
        values('" . $user['name'] . "','" . $user['username'] . "','" . $user['password'] . "')";
        $insert = DB::execute($sql);
        return $insert;
    }
    public function getUserByName($username)
    {

        $sql = "select * from users where username = :username ";

        $data = array(':username' => $username);
        $users = DB::execute($sql, $data);
        return $users;
    }
    public function checkUsername($email)
    {
        $sql = "select * from users where username = ?";
        $data = array($email);
        $insert = DB::execute($sql, $data);
        return !empty($insert);
    }
    public function checkPassword($data)
    {
        $sql = "select * from users where username = ? and password = ?";
        $insert = DB::execute($sql, $data);
        return !empty($insert);
    }
    public function login($data)
    {
        if ($this->checkUsername($data[0])) {
            if ($this->checkPassword($data))
                return true;
            return "Mật khẩu sai !";
        }
        return "Username không tồn tại !";
    }
}
