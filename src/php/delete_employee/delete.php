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
    $datetime = date('Y-m-d H:i:s');

    $link = mysqli_connect($hostname, $username, $password, $databaseName);
    // $dataRow = array();

    $_result['success_1']['success_2'];
    if($link === false)
    {
        die('Could not connect: ' . mysqli_error($link));
    } 
    else
    {

        $query_1 = "UPDATE Employee
                    SET deleted = 1,
                        delete_time = '$datetime',
                        user_who_delete = $_D_ID
                    WHERE id = $_employee_id";
        $query_2 = "UPDATE Fetch_Department_Speciality
                    SET busy = 0,
                        employee_id = NULL
                    WHERE employee_id = $_employee_id";

        $result_1 = mysqli_query($link, $query_1);
        if($result_1){
            $_result['success_1']="true";
        }
        $result_2 = mysqli_query($link, $query_2);
        if($result_2){
            $_result['success_2']="true";
        }

        echo json_encode($_result);

    }
?>