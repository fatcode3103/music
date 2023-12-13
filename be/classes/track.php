<?php
include_once "db.php";


class Track
{
    function searchByName($keywords)
    {
        $sql = "SELECT *
                FROM tracks
                WHERE trackname LIKE :keywords
           ";
        $data = array(':keywords' => '%' . $keywords . '%');
        $res = DB::execute($sql, $data);
        return $res;
    }
}
