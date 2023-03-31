<?php 

session_start();

$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

$data = json_decode($data_json);

$_login = $data->{'login'};
$_password_hash = $data->{'password'};

$hostname = "localhost";
$username = "root";
$password = "";
$databaseName = "Personnel_information";

$link = mysqli_connect($hostname, $username, $password, $databaseName);
$dataRow = array();
$tempRow = array();

if($link === false)
{
    die('Could not connect: ' . mysqli_error($link));
} 
else
{
    $query = "SELECT password_hash, salt
        FROM Users
        WHERE login = '$_login'";

    $result = mysqli_query($link, $query);
    if($result)
    {
        while($temp = mysqli_fetch_assoc($result))
        {
            $tempRow[] = $temp;
        }

        $temp_hash = $_password_hash . $tempRow[0]['salt'];
        $hashed_password = $tempRow[0]['password_hash'];

        $_cmp_res = strcmp($temp_hash , $hashed_password);
        
        // $temp[0]['RES'] =  $_cmp_res;
        // echo json_encode($temp);
        
        if($_cmp_res == 0) 
        {
            $query = "SELECT id, department_id, users_group_id
                FROM Users
                WHERE login = '$_login'";

            $result = mysqli_query($link, $query);
            // $temp[0]['RES'] =  $result;
            // echo json_encode($temp);

            if($result)
            {
                while($row = mysqli_fetch_assoc($result))
                {
                    $dataRow[] = $row;
                }

                $_SESSION['active'] = true;

                $dataRow[0]['succsess'] = true;
                // $dataRow[0]['session'] = $_SESSION['active'];
            
                echo json_encode($dataRow);
            }    
            else
            {
                $dataRow[0]['succsess'] = false;
                $dataRow[0]['temp_hash'] = $temp_hash;

                echo json_encode($dataRow);
                
            }   
        }
        else
        {

           
            $dataRow[0]['succsess'] = false;
            $dataRow[0]['temp_hash'] = $temp_hash;
    
            echo json_encode($dataRow);
        }
    }
    else
    {
        $dataRow[0]['succsess'] = false;
        $dataRow[0]['temp_hash'] = $temp_hash;
    
        echo json_encode($dataRow);
    } 
}

?>