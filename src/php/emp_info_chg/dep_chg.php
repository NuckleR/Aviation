<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_AL = $data->{'AL'};
    $_D_ID = $data->{'D_ID'};

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
                    WHERE d.id = '$_D_ID'
                    GROUP BY s.name";

        $result_1 = mysqli_query($link, $query_1);  

        $data_Row_res['avaliable_specialities'];

        if($result_1)
        {
            while($row = mysqli_fetch_assoc($result_1))
            {
                $dataRow_1[] = $row;
            }
        }
        $data_Row_res['avaliable_specialities'] = $dataRow_1;

        echo json_encode($data_Row_res);
    }
?>