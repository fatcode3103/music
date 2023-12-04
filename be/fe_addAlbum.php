<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Thêm album - release</title>
</head>

<body>
    <h3>Thêm album</h3>
    <form action="./album.php" method="post">
        <input type="text" name = "rel_name" placeholder="Tên album" >
        <input type="text" name ="about" placeholder="Thông tin" >
        <input type="text" name ="image" placeholder="ảnh" >

        <!-- droplist // hiển thị singer name //lấy value= singer_id-->
        <select name="singer_id">
        <?php
            $username = 'root';
            $password = '';
            $server = 'localhost';
            $dbname = 'playlist_music';

            //Kết nối
            $connect = new mysqli($server, $username, $password, $dbname);
            //Thêm lựa chọn
            $sql = "select * from singers";
            $result = $connect->query($sql);

            while ($row = mysqli_fetch_assoc($result)) {
                echo "<option" . ' value = "' . $row['singer_id'] . '">' . $row['stage_name'] .  "</option>";
            }
            ?>
        </select>
        
        <button type="submit" name ="submit" type="button">Thêm mới</button>
    </form>

</body>

</html>