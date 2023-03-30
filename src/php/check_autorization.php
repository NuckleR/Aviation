<?php 

session_start();

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
    $query = "SELECT DISTINCT id, employee_id, users_group_id, password, login
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
        $_SESSION['active'] = true;

        $dataRow[0]['succsess'] = true;
        // $dataRow[0]['session'] = $_SESSION['active'];
    
        echo json_encode($dataRow);
    }   
}

?>