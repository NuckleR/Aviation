<?php
    $data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

    $data = json_decode($data_json);
    
    $_employee_id = $data->{'id'}; 
    
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
        $query = "Select e.id, e.department_id, e.name, 
                            e.surname, e.patronymic, r.name AS rank,
                            s.name AS speciality, d.name AS department,
                            l.name AS location
                    FROM Employee e 
                    LEFT JOIN Rank r ON e.rank_id=r.id
                    LEFT JOIN Speciality s ON e.speciality_id=s.id
                    LEFT JOIN Department d ON e.department_id=d.id
                    LEFT JOIN Location l ON d.location_id=l.id
                    WHERE e.id = '$_employee_id'";

        $result = mysqli_query($link, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            $dataRow[] = $row;
        }

        echo json_encode($dataRow);
    }
?>