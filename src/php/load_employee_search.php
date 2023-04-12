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
            $query_2 = "SELECT DISTINCT r.name AS name
                        FROM Employee e
                        LEFT JOIN Rank r ON e.rank_id=r.id";
            $query_3 = "SELECT DISTINCT s.name, s.id
                        FROM Fetch_Department_Speciality f
                        LEFT JOIN Speciality s ON f.speciality_id=s.id
                        LEFT JOIN Department d ON f.department_id=d.id";
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
            $query_2 = "SELECT DISTINCT r.name AS name
                        FROM Employee e
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Department d ON e.department_id=d.id
                        WHERE d.location_id =
                        (SELECT l.id
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID)";
            $query_3 = "SELECT DISTINCT s.name AS name, s.id AS id
                        FROM Fetch_Department_Speciality f
                        LEFT JOIN Speciality s ON f.speciality_id=s.id
                        LEFT JOIN Department d ON f.department_id=d.id
                        WHERE d.location_id =
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
            $query_2 = "SELECT DISTINCT r.name AS name
                        FROM Employee e
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Department d ON e.department_id=d.id
                        WHERE d.id = $_D_ID";
            $query_3 = "SELECT DISTINCT s.name, s.id
                        FROM Fetch_Department_Speciality f
                        LEFT JOIN Speciality s ON f.speciality_id=s.id
                        LEFT JOIN Department d ON f.department_id=d.id
                        WHERE d.id = $_D_ID";
        }

        $result_1 = mysqli_query($link, $query_1);
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);

        $data_Row_res['departments']['ranks']['specialities'];

        if($result_1)
        {
            while($row_1 = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row_1;
            }
        }
        $data_Row_res['departments'] = $dataRow_1;

        if($result_2)
        {
            while($row_2 = mysqli_fetch_assoc($result_2))
            {
                $dataRow_2[] = $row_2;
            }
        }
        $data_Row_res['ranks'] = $dataRow_2;


        if($result_3)
        {
            while($row_3 = mysqli_fetch_assoc($result_3))
            {
                $dataRow_3[] = $row_3;
            }
        }
        $data_Row_res['specialities'] = $dataRow_3;

        echo json_encode($data_Row_res);
    }