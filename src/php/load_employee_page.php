<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);
    
    $_AL = $data->{'AL'};

    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";

    $link = mysqli_connect($hostname, $username, $password, $databaseName);
    $dataRow = array();

    if($link === false)
    {
        die('Could not connect: ' . mysqli_error($link));
    } 
    else
    {
        if($_AL == 40404)
        {
            $query_1 = "Select id, name FROM Location";
            $query_2 = "Select location_id, id, name FROM Department";
            $query_3 = 'Select e.id, e.department_id, e.name, 
                                e.surname, e.patronymic, r.name AS rank,
                                s.name AS speciality
                        FROM Employee e 
                        LEFT JOIN Rank r ON e.rank_id=r.id
                        LEFT JOIN Speciality s ON e.speciality_id=s.id';
        }
        else if($_AL == 1)
        {

        }
        else if($_AL == 2)
        {
            
        }

        $result_1 = mysqli_query($link, $query_1);
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);
    
        // $data_Row_1 = array();
        $data_Row_res['locations']['departments']['employess'];

        while($row_1 = mysqli_fetch_assoc($result_1))
        {
            $dataRow_1[] = $row_1;
        }
        $data_Row_res['locations'] = $dataRow_1;

        while($row_2 = mysqli_fetch_assoc($result_2))
        {
            $dataRow_2[] = $row_2;
        }
        $data_Row_res['departments'] = $dataRow_2;

        while($row_3 = mysqli_fetch_assoc($result_3))
        {
            $dataRow_3[] = $row_3;
        }
        $data_Row_res['employees'] = $dataRow_3;

        // echo json_encode($dataRow_1);
        // echo json_encode([$dataRow_1, $dataRow_2, $dataRow_3]);
        echo json_encode($data_Row_res);
    }
?>