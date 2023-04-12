<?php

    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $data_Row_res['success']['avaliable_specialities'];

    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";

    $_Cur_Loc_ID = $data->{'id'};
    $_AL = $data->{'AL'};
    $_D_ID = $data->{'DID'};
  
    $link = mysqli_connect($hostname, $username, $password, $databaseName);

    // echo "$_Cur_Loc_ID бпаза";

    if($link === false)
    {
        $data_Row_res['success'] = false;
        die('Could not connect: ' . mysqli_error($link));
    }
    else
    {
        if($_AL!= 40404){
            $query_1 = "SELECT id, name FROM Speciality WHERE id != 40404";
            $query_2 = "SELECT name FROM Department WHERE id != 28";
            $query_3 = "SELECT l.name 
                        FROM Location l
                        WHERE l.id = $_Cur_Loc_ID";
        }
        else{
            $query_1 = "SELECT id, name FROM Speciality";
            $query_2 = "SELECT name FROM Department";
            $query_3 = "SELECT l.name 
                        FROM Location l
                        WHERE l.id = $_Cur_Loc_ID";
        }

        $result_1 = mysqli_query($link, $query_1); 
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);
        
        if($result_1)
        {
            while($row = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row;
            }
        }
        $data_Row_res['avaliable_specialities'] = $dataRow_1;

        if($result_2)
        {
            while($row = mysqli_fetch_assoc($result_2))
            {
                $dataRow_2[] = $row;
            }
        }
        $data_Row_res['avaliable_departments'] = $dataRow_2;

        if($result_3)
        {
            while($row = mysqli_fetch_assoc($result_3))
            {
                $dataRow_3[] = $row;
            }
        }
        $data_Row_res['location'] = $dataRow_3;

        $data_Row_res['success'] = true;
        echo json_encode($data_Row_res);
    }
?>