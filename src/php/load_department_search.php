<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_AL = $data->{'AL'};
    $_D_ID = $data->{'DID'};

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
        if($_AL == 40404)
        {
            $query_1 = "SELECT location_id, id, name FROM Department";
        }
        else if($_AL == 1)
        {
            $query_1 = "SELECT location_id, id, name 
                        FROM Department
                        WHERE location_id =
                        (SELECT l.id
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID)";
        }
        else if($_AL == 2)
        {
            $query_1 = "SELECT location_id, id, name 
                        FROM Department d
                        WHERE d.id = $_D_ID";
        }

        $result_1 = mysqli_query($link, $query_1);

        $data_Row_res['departments'];

        if($result_1)
        {
            while($row_1 = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row_1;
            }
        }
        $data_Row_res['departments'] = $dataRow_1;

        echo json_encode($data_Row_res);
    }