<?php

class DB
{
    static private $connection;
    const DB_TYPE = "mysql";
    const DB_HOST = "localhost";
    const DB_NAME = "playlist_music";
    const USER_NAME = "root";
    const USER_PASSWORD = "";

    static public function getConnection()
    {
        if (static::$connection == null) {
            try {
                static::$connection = new PDO(self::DB_TYPE . ":host=" . self::DB_HOST . ";dbname=" . self::DB_NAME, self::USER_NAME, self::USER_PASSWORD);
            } catch (Exception $exception) {
                throw new Exception("Connection fail");
            }
        }
        return static::$connection;
    }

    static public function execute($sql, $data = null)
    {
        $statement = DB::getConnection()->prepare($sql);
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        $statement->execute($data);

        $result = [];

        while ($item = $statement->fetch()) {
            $result[] = $item;
        }

        return $result;
    }
}
