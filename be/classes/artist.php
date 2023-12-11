<?php
include_once "db.php";


class Artist
{
    public function getAllSingers()
    {
        $sql = "SELECT
                    singers.singer_id,
                    singers.si_name,
                    singers.stage_name,
                    COUNT(releases.release_id) AS numberOfReleases
                FROM
                    singers
                LEFT JOIN
                    releases ON singers.singer_id = releases.singer_id
                GROUP BY
                    singers.singer_id, singers.si_name, singers.stage_name;";
        $singers = DB::execute($sql);
        return $singers;
    }
}
