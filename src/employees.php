<?php
    // Проверка сессии
    session_start();

    if($_SESSION['active'] == false){
        // $new_url = ;
        header("Location: http://aviation/src/index.php"); 
        exit;
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
    <title>Работники</title>
</head>
<!-- <body onload="proba_pera()"> -->
<body class="d-flex flex-column min-vh-100" onload="init()">
    <!-- <header class="d-flex justify-content-center py-3 sticky-top fs-5 border-bottom pb-3" style="background:#ffffff;">  
    <ul class="nav nav-pills">
        <li class="nav-item"><a href="#" class="nav-link  active" aria-current="page">Работники</a></li>
        <li class="nav-item"><a href="#" class="nav-link col-md-12">Отдел</a></li>
      </ul>
      <button type="button" class="btn btn-danger fs-5 col-md-1" onclick="init()">Выход</button>
    </header> -->
    <!-- <div class="container"> -->
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom sticky-top"
            style="background:#ffffff;">

        <a href="/" class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
         
        </a>
        <ul class="nav col-12 col-md-auto nav nav-pills mb-2 justify-content-center mb-md-0">
        <li class="nav-item"><a href="#" class="nav-link  active fs-5" aria-current="page">Работники</a></li>
        <li class="nav-item"><a href="#" class="nav-link fs-5">Отдел</a></li>
        </ul>

        <div class="col-md-3 text-end">
            <button type="button" class="btn btn-danger me-2 fs-5" onclick="logout()">Выход</button>
        </div>
    </header>
  <!-- </div> -->

    <form class="row g-3 mx-auto col-6 fs-5 pb-3">
        <div class="col-md-6 col-lg-3">
            <label for="department_search" class="form-label">Отдел</label>
            <select id="department_search" class="form-select overflow-y-scroll fs-5" style= "cursor:pointer">
                <option selected>...</option>
            </select>
        </div>
        <div class="col-md-6 col-lg-3">
            <label for="rank_search" class="form-label">Звание</label>
            <select id="rank_search" class="form-select fs-5" style= "cursor:pointer">
                <option selected>...</option>
            </select>
        </div>
        <!-- <div class="col-md-6 col-lg-3">
            <label for="speciality_search" class="form-label">Должность</label>
            <select id="speciality_search" class="form-select fs-5" style= "cursor:pointer">
            <option selected>...</option>
            <option>...</option>
            </select>
        </div> -->
        <div class="d-flex justify-content-center col-md-8 col-lg-3" style="padding-top: 41px;">
            <button type="button" class="btn btn-primary fs-5" 
                onclick="search_function()">Поиск</button>
        </div>
        </form>

    <!-- Scrollable modal -->
    <div class="modal fade" id="modal_form" tabindex="-1" 
        data-bs-backdrop="static" data-bs-keyboard="false"
        aria-labelledby="exampleModalLabel" aria-hidden="true">`
        <div class="modal-dialog modal-dialog-scrollable modal-lg">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="info_modalLabel">Информация о сотруднике</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modal_body">
                <div class="container">
                    <div class="row g-3 mx-auto col-10 fs-5 pb-1 border-bottom">
                        <div class="col-lg-8 col-md-12 mt-5">
                            <div class="col-lg-8 col-md-12">
                                <label for="surname" class="form-label">Фамилия</label>
                                <input id="surname"
                                    type="text" class="form-control fs-5" value="" placeholder="Фамилия">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="name" class="form-label">Имя</label>
                                <input id="name"
                                    type="text" class="form-control fs-5" value="" placeholder="Имя">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="patronimic" class="form-label">Отчество</label>
                                <input id="patronimc"
                                    type="text" class="form-control fs-5" value="" placeholder="Отчество">
                            </div>
                        </div>
                        <div class="row g-3 d-flex justify-content-center col-lg-4 col-md-12">
                            <div class="col-md-12 d-flex justify-content-center">
                                <img id="img_info" src="img/placeholder_image.jpg" 
                                    class="img-fluid" 
                                    alt="lll" style="max-width: 150px; height: 200px;">
                            </div>
                            <button type="button" class="btn btn-primary col-md-12 fs-5">Сменить картинку</button>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <label for="rank" class="form-label">Звание</label>
                            <select id="rank" class="form-select fs-5" style= "cursor:pointer">
                                <option selected>Выберите...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <!-- <div class="col-md-12 col-lg-6">
                            <label for="speciality" class="form-label">Должность</label>
                            <select id="speciality" class="form-select fs-5" style= "cursor:pointer">
                                <option selected>Выберите...</option>
                                <option>...</option>
                            </select>
                        </div> -->
                        <div class="col-md-12 col-lg-6">
                            <label for="department" class="form-label">Отдел</label>
                            <select id="department" class="form-select fs-5" style= "cursor:pointer">
                                <option selected>Выберите...</option>
                                <option>...</option>
                            </select>
                        </div>
                        <div class="col-md-12 col-lg-6">
                            <label for="location" class="form-label">Располжение</label>
                            <select id="location" class="form-select fs-5" style= "cursor:pointer">
                                <option selected>Выберите...</option>
                                <option>...</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-10 col-lg-10 mx-auto pb-3 fs-5 border-bottom">
                        <label for="message-text" class="col-form-label ">Комментарий</label>
                        <textarea id="message-text" class="form-control fs-5" style="height: 100px;"></textarea>
                    </div>
                    <div class="row g-3 d-flex col-md-10 col-lg-10 mx-auto pt-3 fs-5">
                        <div class="col-form-label col-md-12 col-lg-4">Состояние на</div>
                        <input type="date" id="date" class="form-control col-md-12 col-lg-8 fs-5">
                        <input id="status" type="text" 
                            class="form-control col-md-12 col-lg-4 fs-5" value="" placeholder="Статус">
                        <div class="col-1 text-center">
                            c
                        </div>
                        <input id="status_start" type="text" 
                            class="form-control col-md-11 col-lg-3 fs-5" value="" placeholder="Число">
                        <div class="col-1 text-center">
                            по
                        </div>
                        <input id="status_end" type="text" 
                            class="form-control col-md-11 col-lg-3 fs-5" value="" placeholder="Число">
                    </div>
                </div>
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary fs-5" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary fs-5">Сохранить</button>
                </div>
            </div>
        </div>
    </div>
    <div class="text-center fs-5 col-10 mx-auto mb-0">
        <table class="table justify-content-center table-sm table-bordered mb-0">
            <thead style="background:#0d6efd; color: #ffffff;">
                <tr>
                <th scope="col" class="col-md-4" style="border: 1px solid #0a53be;">ФИО</th>
                    <th scope="col" class="col-md-4" style="border: 1px solid #0a53be;">Звание</th>
                    <th scope="col" class="col-md-4 text-break" style="border: 1px solid #0a53be;">Инструменты</th>
                    <!-- <th scope="col" class="col-md-4" style="border: 1px solid #0a53be;">ФИО</th>
                    <th scope="col" class="col-md-2" style="border: 1px solid #0a53be;">Звание</th>
                    <th scope="col" class="col-md-3" style="border: 1px solid #0a53be;">Должность</th>
                    <th scope="col" class="col-md-3 text-break" style="border: 1px solid #0a53be;">Инструменты</th> -->
                </tr>
            </thead>
        </table>
    </div>
    <div class="text-center fs-5 col-10 mx-auto overflow-y-auto mt-0 mb-0" style="max-height: 480px">
        <table class="table justify-content-center table-sm table-bordered mb-0">
            <tbody id="table_body">
            <!-- <tr>
                <th colspan="4" style="background: #F37777; border: 1px solid #EC2D2D; color: #EBEBEB;">
                    Авиация
                </th>
            </tr>
            <tr>
                <th colspan="4" style="background: #EEE2A3; border: 1px solid #978D5C;">
                    Авиация
                </th>
            </tr>
            <tr>
                <td class="col-md-4">1</td>
                <td class="col-md-2">Mark</td>
                <td class="col-md-3">Otto</td>
                <td class="col-md-3">
                    <div class="row g-3 mx-auto pt-2 pb-2">
                        <svg id="info_button_1" class="info_icon col-md-4" width="30" 
                            height="30" viewBox="0 0 45 45" fill="none" 
                            data="icons/emp_info_icon.svg"
                            style="cursor:pointer">
                            <path d="M16.875 22.5C19.1128 22.5 21.2589 21.6111 22.8412 20.0287C24.4236 18.4464 25.3125 16.3003 25.3125 14.0625C25.3125 11.8247 24.4236 9.67863 22.8412 8.09629C21.2589 6.51395 19.1128 5.625 16.875 5.625C14.6372 5.625 12.4911 6.51395 10.9088 8.09629C9.32645 9.67863 8.4375 11.8247 8.4375 14.0625C8.4375 16.3003 9.32645 18.4464 10.9088 20.0287C12.4911 21.6111 14.6372 22.5 16.875 22.5ZM2.8125 39.375C2.8125 39.375 0 39.375 0 36.5625C0 33.75 2.8125 25.3125 16.875 25.3125C30.9375 25.3125 33.75 33.75 33.75 36.5625C33.75 39.375 30.9375 39.375 30.9375 39.375H2.8125ZM30.9375 9.84375C30.9375 9.47079 31.0857 9.1131 31.3494 8.84938C31.6131 8.58566 31.9708 8.4375 32.3438 8.4375H43.5938C43.9667 8.4375 44.3244 8.58566 44.5881 8.84938C44.8518 9.1131 45 9.47079 45 9.84375C45 10.2167 44.8518 10.5744 44.5881 10.8381C44.3244 11.1018 43.9667 11.25 43.5938 11.25H32.3438C31.9708 11.25 31.6131 11.1018 31.3494 10.8381C31.0857 10.5744 30.9375 10.2167 30.9375 9.84375ZM32.3438 16.875C31.9708 16.875 31.6131 17.0232 31.3494 17.2869C31.0857 17.5506 30.9375 17.9083 30.9375 18.2812C30.9375 18.6542 31.0857 19.0119 31.3494 19.2756C31.6131 19.5393 31.9708 19.6875 32.3438 19.6875H43.5938C43.9667 19.6875 44.3244 19.5393 44.5881 19.2756C44.8518 19.0119 45 18.6542 45 18.2812C45 17.9083 44.8518 17.5506 44.5881 17.2869C44.3244 17.0232 43.9667 16.875 43.5938 16.875H32.3438ZM37.9688 25.3125C37.5958 25.3125 37.2381 25.4607 36.9744 25.7244C36.7107 25.9881 36.5625 26.3458 36.5625 26.7188C36.5625 27.0917 36.7107 27.4494 36.9744 27.7131C37.2381 27.9768 37.5958 28.125 37.9688 28.125H43.5938C43.9667 28.125 44.3244 27.9768 44.5881 27.7131C44.8518 27.4494 45 27.0917 45 26.7188C45 26.3458 44.8518 25.9881 44.5881 25.7244C44.3244 25.4607 43.9667 25.3125 43.5938 25.3125H37.9688ZM37.9688 33.75C37.5958 33.75 37.2381 33.8982 36.9744 34.1619C36.7107 34.4256 36.5625 34.7833 36.5625 35.1562C36.5625 35.5292 36.7107 35.8869 36.9744 36.1506C37.2381 36.4143 37.5958 36.5625 37.9688 36.5625H43.5938C43.9667 36.5625 44.3244 36.4143 44.5881 36.1506C44.8518 35.8869 45 35.5292 45 35.1562C45 34.7833 44.8518 34.4256 44.5881 34.1619C44.3244 33.8982 43.9667 33.75 43.5938 33.75H37.9688Z" fill="#5B5B5B"/>
                        </svg>
                        <svg id="edit_button_1" class="edit_icon col-md-4" width="30" 
                            height="30" viewBox="0 0 45 45" fill="none" 
                            data="icons/edit_icon.svg"
                            style="cursor:pointer">
                            <path d="M31.575 5.11875C30.8438 5.11875 30.1313 5.4 29.5688 5.94375L25.5938 9.91875L35.5313 19.875L39.5063 15.9375C40.6313 14.7938 40.6313 13.0125 39.5063 11.925L33.5625 5.94375C33 5.4 32.2875 5.11875 31.575 5.11875ZM24.2625 11.25L9.075 26.4562L13.875 26.9813L14.2125 31.275L18.4875 31.5938L19.0312 36.3938L34.2188 21.1875M7.96875 28.2L4.6875 40.7438L17.25 37.3875L16.8 33.3375L12.4688 33.0188L12.1312 28.6688" fill="#5B5B5B"/>
                        </svg>
                        <svg id="delete_button_1" class="delete_icon col-md-4" width="30" 
                            height="30" viewBox="0 0 45 45" fill="none" 
                            data="icons/delete_icon.svg"
                            style="cursor:pointer">
                            <path d="M11.25 35.625C11.25 37.6875 12.9375 39.375 15 39.375H30C32.0625 39.375 33.75 37.6875 33.75 35.625V13.125H11.25V35.625ZM15.8625 22.275L18.5062 19.6313L22.5 23.6063L26.475 19.6313L29.1187 22.275L25.1437 26.25L29.1187 30.225L26.475 32.8688L22.5 28.8937L18.525 32.8688L15.8813 30.225L19.8563 26.25L15.8625 22.275ZM29.0625 7.5L27.1875 5.625H17.8125L15.9375 7.5H9.375V11.25H35.625V7.5H29.0625Z" fill="#EC2D2D"/>
                        </svg>  
                    </div>
                </td>
            </tr>
            
             -->
          </tbody>
        </table>
    </div>

    <script type="text/javascript">
        $(function() {
            $('#datepicker').datepicker();
        });
    </script>

    <script type="text/javascript" src="js/jQuery/jQuery.js"></script>
    <script type="text/javascript" src="bootstrap/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="js/util.js"></script>
    <script type="text/javascript" src="js/employee_page_init.js"></script>s
    <script type="text/javascript" src="js/employees.js"></script>
    <script type="text/javascript" src="js/search.js"></script>
    <script type="text/javascript" src="js/logout.js"></script>

    <!-- Ниже заглушка модальное окно -->
    <footer class="bd-footer mt-auto col-12 py-3 my-4 fs-5">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted"
            data-bs-toggle="modal" data-bs-target="#modal_form">О приложении</a></li>
        </ul>
        <p class="text-center text-muted">ГААСУ "Авиация"</p>
    </footer>

</body>

</html>