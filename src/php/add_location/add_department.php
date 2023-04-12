<?php
    $mas = $_POST['mas'];
    // $data_mas = json_encode( $mas, JSON_UNESCAPED_UNICODE);

    // $_AL = $data->{'speciality'};
    // $_D_ID = $data->{'speciality_ID'};

    $added_spec = $_POST['added_spec'];

    


    echo json_encode($added_spec);
    echo ($mas[0]['speciality']);
    // echo ("$_AL $_D_ID");
?>