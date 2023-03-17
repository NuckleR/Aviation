<?php 

$data_json = json_encode($_POST, JSON_UNESCAPED_UNICODE);

$data = json_decode($data_json);

$_login = $data->{'Login'};
$_password = $data->{'Password'};

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
    $query_1 = "SELECT DISTINCT id FROM Employee
        WHERE Password = '$_password'";
    
    $result = mysqli_query($link, $query_1);
    $dataRow_1 = array();
    
    while($row = mysqli_fetch_assoc($result))
    {
        $dataRow_1[] = $row;
    }

    if(sizeof($dataRow_1) == 0)
    {
        $dataRow[0]['Password'] = false;
    }
    else
    {
        $dataRow[0]['Password'] = true;
    }   

    $query_2 = "SELECT DISTINCT id FROM Employee
        WHERE Login = '$_login'";
    
    $result = mysqli_query($link, $query_2);
    $dataRow_2 = array();

    while($row = mysqli_fetch_assoc($result))
    {
        $dataRow_2[] = $row;
    }

    if(sizeof($dataRow_2) == 0)
    {
        $dataRow[0]['Login'] = false;
    }
    else
    {
        $dataRow[0]['Login'] = true;
    }   

    if($dataRow_1[0]['id'] != $dataRow_2[0]['id'] 
        || sizeof($dataRow_1) == 0 || sizeof($dataRow_2) == 0)
    {
        $dataRow[0]['Succsess'] = false;
        echo json_encode($dataRow);
    }
    else
    {
        $query = "SELECT DISTINCT id FROM Employee
            WHERE Login = '$_login' and Password = '$_password'";

        $result = mysqli_query($link, $query);

        while($row = mysqli_fetch_assoc($result))
        {
            $dataRow[] = $row;
        }
        
        if(sizeof($dataRow) == 0)
        {
            $dataRow[0]['Succsess'] = false;
        
            echo json_encode($dataRow);
        }
        else
        {

            $dataRow[0]['Succsess'] = true;
        
            echo json_encode($dataRow);
        }   
        //echo "Подключилось";
        //echo("Подключилось");
    }
}
//echo "sldkjdndl";
//print_r($_REQUEST);

?>