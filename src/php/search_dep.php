<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_D_Name = $data->{'DName'};

    // echo  $data_json;

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
        if($_D_Name != "...")
        {
            if($_D_Name == "..."){
                $_Condition_D_Name = "";
            }
            else{
                $_Condition_D_Name = "AND d.name = '$_D_Name'";
            }

            // echo "$_Condition_D_Name $_Condition_Rank $_Condition_Speciality $_Condition_E_Name";
            // echo $_Condition_E_name;
            $query_1 = "SELECT DISTINCT l.id as id, l.name as name,
                        l.deleted as deleted 
                    FROM Location l
                    LEFT JOIN Department d ON d.location_id = l.id
                    LEFT JOIN Employee e ON e.department_id = d.id
                    LEFT JOIN Rank r ON e.rank_id=r.id
                    LEFT JOIN Fetch_Department_Speciality f ON e.speciality_id=f.id
                    LEFT JOIN Speciality s ON f.speciality_id = s.id
                    WHERE l.id > 0 $_Condition_D_Name";
            // $query_2 = "SELECT location_id, id, name 
            //     FROM Department d
            //     WHERE d.id > 0 $_Condition_D_Name";
            // $query_3 = "SELECT e.id, e.department_id, e.name, 
            //             e.surname, e.patronymic, r.name AS rank,
            //             s.name AS speciality
            //     FROM Employee e 
            //     LEFT JOIN Rank r ON e.rank_id=r.id
            //     LEFT JOIN Speciality s ON e.speciality_id=s.id
            //     WHERE e.id > 0 $_Condition_Rank $_Condition_D_Name";

            $query_2 = "SELECT DISTINCT d.id as id, d.name as name,
                        d.location_id as location_id, d.deleted as deleted 
                    FROM Department d
                    LEFT JOIN Location l ON d.location_id = l.id
                    LEFT JOIN Employee e ON e.department_id = d.id
                    LEFT JOIN Rank r ON e.rank_id=r.id
                    LEFT JOIN Fetch_Department_Speciality f ON e.speciality_id=f.id
                    LEFT JOIN Speciality s ON f.speciality_id = s.id
                    WHERE l.id > 0 $_Condition_D_Name";
            
            $result_1 = mysqli_query($link, $query_1);
            $result_2 = mysqli_query($link, $query_2);

            $data_Row_res['locations']['departments']['success'];

            // $data_Row_res['locations'] = $query_1;
            // $data_Row_res['departments'] = $query_2;
            // $data_Row_res['employees'] = $query_3;
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

            $data_Row_res['success'] = true;
            echo json_encode($data_Row_res);
            
            // echo "$_Condition_D_Name $_Condition_Rank $_Condition_Speciality $_Condition_E_Name";
        }
        else
        {
            $data_Row_res['success'] = false;
            echo json_encode($data_Row_res);
        }
    }
?>