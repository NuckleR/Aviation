<?php
    // Проверка сессии
    session_start();
    // var_dump($_SESSION['active']);
    // exit();
    if(!isset($_SESSION['active']) || $_SESSION['active'] == false){
        // $new_url = ;
        header("Location: http://aviation/src/index.php"); 
        exit();
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="css/employee.css"> -->
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="bootstrap/bootstrap-grid.min.css">
    <link rel="stylesheet" href="addons/select_2/dist/css/select2.min.css">
    <link rel="stylesheet" href="addons/select_2/dist/css/select2-bootstrap.min.css">
    <link rel="stylesheet" href="addons/swup/swup.css">
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/select2-bootstrap-5-theme@1.3.0/dist/select2-bootstrap-5-theme.min.css"> -->
    <title>Отдел</title>
</head>
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom sticky-top"
            style="background:#ffffff;">

        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
         
        </a>
        <ul class="nav col-12 col-md-auto nav nav-pills mb-2 justify-content-center mb-md-0">
        <li class="nav-item"><a href="employees.php" class="nav-link  " aria-current="page">Работники</a></li>
        <li class="nav-item"><a href="#" class="nav-link  active ">Отдел</a></li>
        <li class="nav-item"><a href="combatant.php" class="nav-link  ">Строевая</a></li>
        </ul>

        <div class="col-md-3 text-end">
            <button type="button" class="btn btn-danger me-2  " onclick="logout()">Выход</button>
        </div>
    </header>
<!-- <body onload="proba_pera()"> -->
<body class="transition-fade d-flex flex-column min-vh-100" onload="init()">

    <form class="row g-3 mx-auto col-8 pb-3 justify-content-center d-flex">
        <div class="col-md-6 col-lg-3 col-xl-2">
            <label for="department_search" class="form-label">Отдел</label>
            <select id="department_search" class="form-select overflow-y-scroll select2" style= "cursor:pointer;"
                placeholder="Выберите отдел" value="">
            
            </select>
        </div>
        <div class="d-flex justify-content-center col-md-12 col-lg-12 col-xl-12">
            <div class="d-flex justify-content-center col-md-6 col-lg-2">
                <button type="button" class="btn btn-primary" style="width: 100px;" 
                    onclick="search_function()">Поиск</button>
            </div>
            <div class="d-flex justify-content-center col-md-6 col-lg-2">
                <button type="button" class="btn btn-warning" style="width: 100px;"
                    onclick="clear_search_function()">Очистить</button>
            </div>
        </div>
    </form>

    
    <div class="text-center   col-10 mx-auto mb-0">
        <table class="table justify-content-center table-sm table-bordered mb-0">
            <thead style="background:#0d6efd; color: #ffffff;">
                <tr>
                    <th scope="col" class="col-md-9" style="border: 1px solid #0a53be;">Отдел</th>
                    <th scope="col" class="col-md-3 text-break" style="border: 1px solid #0a53be;">Инструменты</th>
                </tr>
            </thead>
        </table>
    </div>
    <div id="table_body_id" class="text-center   col-10 mx-auto overflow-y-auto mt-0 mb-0" style="max-height: 480px">
        <table  class="table justify-content-center table-sm table-bordered mb-0">
            <tbody id="table_body">
            
            </tbody>
        </table>
    </div>





        <!-- Scrollable modal -->
    <div class="modal fade" id="modal_form" tabindex="-1" 
        data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="info_modalLabel" aria-hidden="true">`
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title  " id="info_modalLabel">Информация о сотруднике</h6>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            </div>
            <div class="modal-body" id="modal_body">
            </div>
                <div id="modal_footer" class="modal-footer">
                    <button type="button" class="btn btn-secondary  " data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary  ">Сохранить</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal_form_attention" tabindex="-1" 
        data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="attention_modalLabel" aria-hidden="true">`
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header d-flex justify-content-center">
                    <h4 class="modal-title  " id="attention_modalLabel">Информация о сотруднике</h4>
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body" id="attention_modal_body">
                    <div class="container">
                        <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">
                            
                        </div>        
                    </div>
                </div>
                <div id="attention_modal_footer" class="modal-footer d-flex justify-content-center">
                    
                </div>
            </div>
        </div>
    </div>

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1051;">
    <div id="notification" class="toast bg-white text-primary" role="alert" data-bs-autohide="true" data-bs-delay="4000" aria-live="assertive" aria-atomic="true">
        <div id="notification_header" class="toast-header">
        <strong class="me-auto">Уведомление</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div id="notification_body" class="toast-body">
        </div>
    </div>
    </div>
    
<script type="text/javascript">
        $(function() {
            $('#datepicker').datepicker();
        });
    </script>

    <script type="text/javascript" src="js/jQuery/jQuery.js"></script>
    <script type="text/javascript" src="bootstrap/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="addons/select_2/dist/js/select2.full.min.js"></script>
    <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="js/Departments/department_page_init.js"></script>
    <script type="text/javascript" src="js/Departments/departments.js"></script>
    <script type="text/javascript" src="js/Departments/search.js"></script>
    <script type="text/javascript" src="js/Autorization/logout.js"></script>
    <script type="text/javascript" src="js/for_select_2.js"></script>
    <script type="text/javascript" src="addons/swup/swup.min.js"></script>
    <script>
        const swup = new Swup();
    </script>
    <!-- <script type="text/javascript">
        $(function() {
            $('.select2').select2();
        });

    </script> -->

    <!-- Ниже заглушка модальное окно -->
    <footer class="bd-footer mt-auto col-12 py-3 my-4  ">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted"
            data-bs-toggle="modal" data-bs-target="#modal_form_attention">О приложении</a></li>
        </ul>
        <p class="text-center text-muted">ГААСУ "Авиация"</p>
    </footer>

</body>

</html>