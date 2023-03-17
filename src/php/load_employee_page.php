<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);
    
    $_Uid = $data->{'Uid'};

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
        $query_1 = "Select * FROM Location";
        $query_2 = "Select * FROM Department";
        $query_3 = "Select * FROM Employee";

        $result_1 = mysqli_query($link, $query_1);
        $result_2 = mysqli_query($link, $query_2);
        $result_3 = mysqli_query($link, $query_3);
    
        $data_Row_1 = array();

        while($row_1 = mysqli_fetch_assoc($result_1))
        {
            $dataRow_1[] = $row_1;
        }
        $array = array(
            "end_of_location_part" => true,
        );
        $dataRow_1[] = $array;
       
        while($row_2 = mysqli_fetch_assoc($result_2))
        {
            $dataRow_1[] = $row_2;
        }
        $array = array(
            "end_of_department_part" => true,
        );
        $dataRow_1[] = $array;
       
        while($row_3 = mysqli_fetch_assoc($result_3))
        {
            $dataRow_1[] = $row_3;
        }
        $array = array(
            "end_of_employee_part" => true,
        );
        $dataRow_1[] = $array;
        
        echo json_encode($dataRow_1);
    }
?>