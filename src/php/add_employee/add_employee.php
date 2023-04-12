<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_UID = $data->{'UID'};
    $_New_Name = $data->{'New_Name'};
    $_New_Rank = $data->{'New_Rank'};
    $_New_Rank_ID = $data->{'New_Rank_ID'};
    $_New_Comment = $data->{'New_Comment'};
    $_New_Spec_ID = $data->{'New_Spec_ID'};
    $_New_Dep_ID = $data->{'New_Dep_ID'};
    $datetime = date('Y-m-d H:i:s');

    // let params = "&New_Name="+ mas.fullname
    //         + "&New_Rank=" + mas.rank
    //         + "&New_Rank_ID=" + mas.rank_id
    //         + "&New_Comment=" + mas.comment
    //         + "&New_Spec_ID=" + mas.speciality_ID
    //         + "&New_Dep_ID=" + mas.department_id
    //         + "&UID=" + User_ID;


    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";

    // echo "$_New_Dep_ID, '$_New_Name', $_New_Rank_ID, '$_New_Comment','$datetime, $_New_Spec_ID, $_UID"; 

    $link = mysqli_connect($hostname, $username, $password, $databaseName);
    $dataRow = array();

    if($link === false)
    {
        die('Could not connect: '. mysqli_error($link));
    }
    else
    {
        $query_1 = "UPDATE Fetch_Department_Speciality
                    SET busy = 1, employee_id = 
                    ((SELECT id FROM Employee WHERE speciality_id = '$_New_Spec_ID'))
                    WHERE id=$_New_Spec_ID";

        $query_2 = "INSERT INTO `Employee`
                    (`name`, `comment`, 
                    `department_id`, `rank_id`, 
                    `speciality_id`, 
                    `add_time`, `user_who_add`) 
                    VALUES 
                    ('$_New_Name','$_New_Comment',
                    $_New_Dep_ID, $_New_Rank_ID,
                    $_New_Spec_ID, '$datetime',
                    $_UID)";

        $result_2 = mysqli_query($link, $query_2);
        $result_1 = mysqli_query($link, $query_1);

        if($result_2){
            $data_Row_res['success'] = true;
            echo json_encode($data_Row_res);
        }
        else
        {
            $data_Row_res['success'] = false;
            echo json_encode($data_Row_res);
        }
    }
?>