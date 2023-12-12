<?php
include_once "db.php";


class Release
{


    static public function getAllAlbum()
    {
        $sql = "SELECT
                    releases.release_id,
                    releases.rel_name,
                    singers.stage_name,
                    COUNT(tracks.track_id) AS numberOfTracks
                FROM
                    releases
                LEFT JOIN
                    tracks ON releases.release_id = tracks.release_id
                JOIN
                    singers ON releases.singer_id = singers.singer_id
                GROUP BY
                    releases.release_id,
                    releases.rel_name;";
        $album = DB::execute($sql);
        return $album;
    }
    static public function getAlbum()
    {
        $sql = "SELECT * FROM releases";
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
    function deleteAlbumById($albumId)
    {
        $sql = "delete from releases where release_id = ?;";
        $data = array($albumId);
        $res = DB::execute($sql, $data);
        return $res;
    }

    function editAlbumById($data)
    {  
        $sql = "UPDATE `releases` 
                SET `rel_name` = ?, `about` = ?, `image` = ?, `singer_id` = ?
                where release_id = ?;";        
        $rep = DB::execute($sql, $data);
        return $rep;
    }
}
