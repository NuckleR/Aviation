<?php 

$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

$data = json_decode($data_json);

$_login = $data->{'login'};
$_password = $data->{'password'};


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
    //print_r("Хорошо");
    $query_1 = "SELECT DISTINCT id FROM Users
        WHERE password = '$_password'";
    
    $result = mysqli_query($link, $query_1);
    $dataRow_1 = array();
    
    while($row = mysqli_fetch_assoc($result))
    {
        $dataRow_1[] = $row;
    }

    if(sizeof($dataRow_1) == 0)
    {
        $dataRow[0]['password'] = false;
    }
    else
    {
        $dataRow[0]['password'] = true;
    }   

    $query_2 = "SELECT DISTINCT id FROM Users
        WHERE login = '$_login'";
    
    $result = mysqli_query($link, $query_2);
    $dataRow_2 = array();

    while($row = mysqli_fetch_assoc($result))
    {
        $dataRow_2[] = $row;
    }

    if(sizeof($dataRow_2) == 0)
    {
        $dataRow[0]['login'] = false;
    }
    else
    {
        $dataRow[0]['login'] = true;
    }   

    if($dataRow_1[0]['id'] != $dataRow_2[0]['id'] 
        || sizeof($dataRow_1) == 0 || sizeof($dataRow_2) == 0)
    {
        $dataRow[0]['succsess'] = false;
        echo json_encode($dataRow);
    }
    else
    {
        $query = "SELECT DISTINCT employee_id, users_group_id, password, login
            FROM Users
            -- JOIN Employee ON Employee.id = Users.employee_id
            -- JOIN Users_Groups ON Users_Groups = User.users_group_id
            WHERE login = '$_login' and password = '$_password'";

        $result = mysqli_query($link, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            $dataRow[] = $row;
        }
        
        if(sizeof($dataRow) == 0)
        {
            $dataRow[0]['succsess'] = false;
        
            echo json_encode($dataRow);
        }
        else
        {

            $dataRow[0]['succsess'] = true;
        
            echo json_encode($dataRow);
        }   
        //echo "Подключилось";
        //echo("Подключилось");
    }
}
//echo "sldkjdndl";
//print_r($_REQUEST);

?>