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
    public function addNewSinger($data)
    {
        $stageName = $data["stageName"];
        $realName = $data["realName"];
        $imageUrl = $data["imageUrl"];
        $introduction = $data["introduction"];
        $biography = $data["biography"];

        $sql = "INSERT INTO singers (stage_name, si_name, image, subtitle, about) 
                VALUES ('$stageName', '$realName', '$imageUrl', '$introduction', '$biography')";

        $singer = DB::execute($sql);
        return $singer;
    }
    function deleteSingerById($singerId)
    {
        $sql = "delete from singers where singer_id = ?;";
        $data = array($singerId);
        $res = DB::execute($sql, $data);
        return $res;
    }
    function getSingerById($singerId)
    {
        $sql = "select * from singers where singer_id  = ?;";
        $data = array($singerId);
        $res = DB::execute($sql, $data);
        return $res;
    }
    function editSingerById($dataInput)
    {
        $stageName = $dataInput["stageName"];
        $realName = $dataInput["realName"];
        $imageUrl = $dataInput["imageUrl"];
        $introduction = $dataInput["introduction"];
        $biography = $dataInput["biography"];
        $singer_id = $dataInput["singer_id"];

        $sql = "UPDATE singers
                SET
                    stage_name = ?,
                    si_name = ?,
                    image = ?,
                    subtitle = ?,
                    about = ?
                WHERE
                    singer_id = ?;";
        $data = array(
            $stageName,
            $realName,
            $imageUrl,
            $introduction,
            $biography,
            $singer_id,
        );
        $res = DB::execute($sql, $data);
        return $res;
    }
    function searchByName($keywords)
    {
        $sql = "SELECT *
                FROM singers
                WHERE stage_name LIKE :keywords
           ";
        $data = array(':keywords' => '%' . $keywords . '%');
        $res = DB::execute($sql, $data);
        return $res;
    }
}
