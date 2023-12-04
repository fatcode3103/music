<?php
include_once "db.php";


class Release
{


    static public function getAllAlbum()
    {
        $sql = "select * from releases";
        $album = DB::execute($sql);
        return $album;
    }

    public function addAlbum($newAlbum)
    {

        //insert vào database
        $sql = "insert into releases(rel_name, about, image, singer_id)
        values('" . $newAlbum['rel_name'] . "','" . $newAlbum['about'] . "','" . $newAlbum['image'] . "','" . $newAlbum['singer_id'] . "')";
        $insert = DB::execute($sql);
        return $insert;
    }

    public function deleteAlbum($Album)
    {
        
    }
}
