<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_AL = $data->{'AL'};
    $_L_NAME = $data->{'L_NAME'};

    // echo $_L_NAME;

    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";

    $link = mysqli_connect($hostname, $username, $password, $databaseName);

    if($link === false)
    {
        die('Could not connect: ' . mysqli_error($link));
    }
    else
    {
        $query_1 = "SELECT d.name AS name,
                        d.location_id AS location_id,
                        d.id AS id
                    FROM Department d
                    WHERE d.location_id IN 
                    (SELECT l.id
                    FROM Department d
                    LEFT JOIN Location l ON d.location_id = l.id
                    WHERE l.name = '$_L_NAME')";

        $result_1 = mysqli_query($link, $query_1);  

        $data_Row_res['avaliable_departments'];

        if($result_1)
        {
            while($row = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row;
            }
        }
        $data_Row_res['avaliable_departments'] = $dataRow_1;

        echo json_encode($data_Row_res);
    }
?>