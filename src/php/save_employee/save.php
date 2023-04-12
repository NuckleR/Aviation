<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);

    $_UID = $data->{'UID'};
    $_Prev_Emp_ID = $data->{'Prev_Emp_ID'}; 
    $_Prev_Spec_ID = $data->{'Prev_Spec_ID'};
    $_New_Dep = $data->{'New_Dep'};
    $_New_Name = $data->{'New_Name'};
    $_New_Rank = $data->{'New_Rank'};
    $_New_Rank_ID = $data->{'New_Rank_ID'};
    $_New_Comment = $data->{'New_Comment'};
    $_New_Spec_ID = $data->{'New_Spec_ID'};
    $_New_Dep_ID = $data->{'New_Dep_ID'};
    $datetime = date('Y-m-d H:i:s');

    $hostname = "localhost";
    $username = "root";
    $password = "";
    $databaseName = "Personnel_information";

    // echo $_Prev_Emp_ID, $_Prev_Spec_ID, $_New_Dep, $_New_Name, $_New_Rank, $_New_Comment, $_New_Spec_ID; 

    $link = mysqli_connect($hostname, $username, $password, $databaseName);
    $dataRow = array();

    if($link === false)
    {
        die('Could not connect: '. mysqli_error($link));
    }
    else
    {
        if($_New_Spec_ID != $_Prev_Spec_ID){
            $query_1 = "UPDATE Fetch_Department_Speciality
                        SET busy = 0, employee_id = NULL
                        WHERE id=$_Prev_Spec_ID";
            $query_2 = "UPDATE Fetch_Department_Speciality
                        SET busy = 1, employee_id = $_Prev_Emp_ID
                        WHERE id=$_New_Spec_ID";
            $result_1 = mysqli_query($link, $query_1);
            $result_2 = mysqli_query($link, $query_2);
        }
        $query_3 = "UPDATE Employee
                    SET name = '$_New_Name', comment = '$_New_Comment', 
                        department_id = $_New_Dep_ID,
                        rank_id = $_New_Rank_ID, 
                        speciality_id = $_New_Spec_ID,
                        user_who_update = $_UID,
                        update_time = '$datetime'
                    WHERE id = $_Prev_Emp_ID";

        $query_4 = "SELECT e.id AS id, 
                        e.department_id AS department_id,
                        e.comment AS comment, 
                        e.name AS name, 
                        r.name AS rank,
                        f.id AS speciality_id, 
                        s.name AS speciality,
                        d.name AS department,
                        l.name AS location
                    FROM Employee e 
                    LEFT JOIN Rank r ON e.rank_id=r.id
                    LEFT JOIN Fetch_Department_Speciality f ON e.speciality_id=f.id
                    LEFT JOIN Speciality s ON f.speciality_id = s.id
                    LEFT JOIN Department d ON e.department_id=d.id
                    LEFT JOIN Location l ON d.location_id=l.id
                    WHERE e.id = $_Prev_Emp_ID";

        $result_3 = mysqli_query($link, $query_3);
        $result_4 = mysqli_query($link, $query_4);

        $data_Row_res['employee_id']['department_id']['employee'];
        $data_Row_res['employee_id'] = $_Prev_Emp_ID;
        $data_Row_res['department_id'] = $_New_Dep_ID;

        if($result_4)
        {
            while($row = mysqli_fetch_assoc($result_4))
            {
                $dataRow_4[] = $row;
            }
        }
        $data_Row_res['employee'] = $dataRow_4;

        echo json_encode($data_Row_res);
    }
?>