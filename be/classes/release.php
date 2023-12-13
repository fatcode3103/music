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
    static public function getAlbum($id)
    {
        $sql = "select * from releases where release_id = ? ;";
        $data = array($id);
        $albumID = DB::execute($sql, $data);
        return $albumID;
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
        $sql = "update releases 
                set rel_name = ?, about = ?, image = ?, singer_id = ?
                where release_id = ?;";
        $rep = DB::execute($sql, $data);
        return empty($rep);
    }
    function searchByName($keywords)
    {
        $sql = "SELECT releases.*, singers.stage_name
                FROM releases
                LEFT JOIN singers ON releases.singer_id = singers.singer_id
                WHERE releases.rel_name LIKE :keywords;";
        $data = array(':keywords' => '%' . $keywords . '%');
        $res = DB::execute($sql, $data);
        return $res;
    }
}
