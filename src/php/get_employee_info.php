<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);
    
    $_employee_id = $data->{'id'}; 
    $_AL = $data->{'AL'};
    $_D_ID = $data->{'DID'};

    
    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";
    
    $link = mysqli_connect($hostname, $username, $password, $databaseName);
    $dataRow = array();

    if($link === false)
    {
        die('Could not connect: '. mysqli_error($link));
    }
    else
    {
        $query_1 = "SELECT e.id AS id, e.department_id AS department_id,
                            e.comment AS comment, 
                            e.name AS name, 
                            r.name AS rank, s.name AS speciality,
                            d.name AS department,
                            l.name AS location
                    FROM Employee e 
                    LEFT JOIN Rank r ON e.rank_id=r.id
                    LEFT JOIN Fetch_Department_Speciality f ON e.speciality_id=f.id
                    LEFT JOIN Speciality s ON f.speciality_id = s.id
                    LEFT JOIN Department d ON e.department_id=d.id
                    LEFT JOIN Location l ON d.location_id=l.id
                    WHERE e.id = $_employee_id";
        
        if($_AL == 40404)
        {
            $query_2 = "SELECT r.name AS name
                        FROM Rank r";
        }
        else
        {
            $query_2 = "SELECT r.name AS name
                        FROM Rank r
                        WHERE r.id != 40404";
        }
        $query_3 = "SELECT d.name AS name,
                        d.location_id AS location_id
                    FROM Department d
                    WHERE d.location_id = 
                    (SELECT l.id
                    FROM Department d
                    LEFT JOIN Location l ON d.location_id = l.id
                    WHERE d.id = $_D_ID)";
        $query_4 = "SELECT l.name AS name
                    FROM Location l";
        $query_5 = "SELECT DISTINCT s.name AS name, 
                        f.busy
                    FROM Fetch_Department_Speciality f
                    LEFT JOIN Speciality s ON f.speciality_id=s.id
                    WHERE f.department_id = $_D_ID";

        $result_1 = mysqli_query($link, $query_1);
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);
        $result_4 = mysqli_query($link, $query_4);
        $result_5 = mysqli_query($link, $query_5);


        $data_Row_res['employee']['avaliable_departments']['locations']['avaliable_specialities']['ranks'];

        if($result_1)
        {
            while($row = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row;
            }
        }
        $data_Row_res['employee'] = $dataRow_1;

        if($result_2)
        {
            while($row = mysqli_fetch_assoc($result_2))
            {
                $dataRow_2[] = $row;
            }
        }
        $data_Row_res['ranks'] = $dataRow_2;

        if($result_3)
        {
            while($row = mysqli_fetch_assoc($result_3))
            {
                $dataRow_3[] = $row;
            }
        }
        $data_Row_res['avaliable_departments'] = $dataRow_3;
        
        if($result_4)
        {
            while($row = mysqli_fetch_assoc($result_4))
            {
                $dataRow_4[] = $row;
            }
        }
        $data_Row_res['locations'] = $dataRow_4;

        if($result_5)
        {
            while($row = mysqli_fetch_assoc($result_5))
            {
                $dataRow_5[] = $row;
            }
        }
        $data_Row_res['avaliable_specialities'] = $dataRow_5;

        echo json_encode($data_Row_res);
    }
?>