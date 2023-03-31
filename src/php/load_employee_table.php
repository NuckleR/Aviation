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
    // $dataRow = array();

    if($link === false)
    {
        die('Could not connect: ' . mysqli_error($link));
    } 
    else
    {
        if($_AL == 40404)
        {
            $query_1 = "SELECT id, name FROM Location";
            $query_2 = "SELECT location_id, id, name FROM Department";
            $query_3 = 'SELECT e.id, e.department_id, e.name, 
                                e.surname, e.patronymic, r.name AS rank,
                                s.name AS speciality
                        FROM Employee e 
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Speciality s ON e.speciality_id=s.id';
        }
        else if($_AL == 1)
        {
            $query_1 = "SELECT l.id as id, l.name as name 
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID";
            $query_2 = "SELECT location_id, id, name 
                        FROM Department
                        WHERE location_id = 
                        (SELECT l.id
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID)";
            $query_3 = "SELECT e.id, e.department_id, e.name, 
                                e.surname, e.patronymic, r.name AS rank,
                                s.name AS speciality
                        FROM Employee e 
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Speciality s ON e.speciality_id=s.id
                        LEFT JOIN Department d ON e.department_id=d.id
                        WHERE d.location_id =
                        (SELECT l.id
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID)";
        }
        else if($_AL == 2)
        {
            $query_1 = "SELECT l.id as id, l.name as name 
                        FROM Department d
                        LEFT JOIN Location l ON d.location_id = l.id
                        WHERE d.id = $_D_ID";
            $query_2 = "SELECT location_id, id, name 
                        FROM Department
                        WHERE id = $_D_ID";
            $query_3 = "SELECT e.id, e.department_id, e.name, 
                                e.surname, e.patronymic, r.name AS rank,
                                s.name AS speciality
                        FROM Employee e 
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Speciality s ON e.speciality_id=s.id
                        LEFT JOIN Department d ON e.department_id=d.id
                        WHERE d.id = $_D_ID)";
        }

        $result_1 = mysqli_query($link, $query_1);
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);
    
        // $data_Row_1 = array();
        $data_Row_res['locations']['departments']['employess'];

        if($result_1)
        {
            while($row_1 = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row_1;
            }
        }
        $data_Row_res['locations'] = $dataRow_1;

        if($result_2)
        {
            while($row_2 = mysqli_fetch_assoc($result_2))
            {
                $dataRow_2[] = $row_2;
            }
        }
        $data_Row_res['departments'] = $dataRow_2;

        if($result_3)
        {
            while($row_3 = mysqli_fetch_assoc($result_3))
            {
                $dataRow_3[] = $row_3;
            }
        }
        $data_Row_res['employees'] = $dataRow_3;

        // echo json_encode($dataRow_1);
        // echo json_encode([$dataRow_1, $dataRow_2, $dataRow_3]);
        echo json_encode($data_Row_res);
    }
?>