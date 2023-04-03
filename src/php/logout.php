<?php
    session_start();

    if($_SESSION['active'] == true){
        // $new_url = ;
        $_SESSION['active'] = false;
        $res['logout_success'] = true;
        
        session_destroy();

        echo json_encode($res);
    }

?>