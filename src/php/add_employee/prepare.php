<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_AL = $data->{'AL'};
    $_D_ID = $data->{'DID'};
    $_Cur_Dep_ID = $data->{'id'};

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
        $query_1 = "SELECT s.name AS name, 
                        MAX(f.id) AS id,
                        MIN(f.busy) AS busy
                    FROM Fetch_Department_Speciality f
                    LEFT JOIN Speciality s ON f.speciality_id=s.id
                    LEFT JOIN Department d ON f.department_id=d.id
                    WHERE f.department_id = $_Cur_Dep_ID
                    GROUP BY s.name";

        $query_2 = "SELECT id, name
                    FROM Department
                    WHERE id = $_Cur_Dep_ID";
                    // добавить
        $query_3 = "SELECT id, name
                    FROM Rank";

        $result_1 = mysqli_query($link, $query_1);  
        $result_2 = mysqli_query($link, $query_2); 
        $result_3 = mysqli_query($link, $query_3);

        $data_Row_res['avaliable_specialities']['ranks']['department'];

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
        $data_Row_res['department'] = $dataRow_2;
       
        if($result_3)
        {
            while($row = mysqli_fetch_assoc($result_3))
            {
                $dataRow_3[] = $row;
            }
        }
        $data_Row_res['ranks'] = $dataRow_3;

        echo json_encode($data_Row_res);
    }
?>