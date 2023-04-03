<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="css/autorization.css"> -->
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="bootstrap/bootstrap-grid.min.css">
    <title>Авторизация</title>
</head>
<body class="d-flex flex-column align-items-center justify-content-center">
    <div class="d-flex flex-column align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
    <p class="display-3">ГААСУ "Авиация"</p>
        <form class="col-md-10" novalidate>
            <div class="mb-3 fs-5">
                <label for="login" class="form-label">Логин</label>
                <input onchange="login_change()"
                    type="text" class="form-control fs-5" id="login">
            </div>
            <div class="mb-3 fs-5" id="password_block">
                <label for="password" class="form-label">Пароль</label>
                <input onchange="password_change()" 
                    type="password" class="form-control fs-5" id="password">  
            </div>
            
            <button type="button" class="btn btn-primary w-100 fs-5" onclick="check_connection()">Войти</button>
        </form>
    </div>

    <!-- <script type="text/javascript" src="js/CryptoJS/core-min.js"></script>
    <script type="text/javascript" src="js/CryptoJS/x64-core-min.js"></script>
    <script type="text/javascript" src="js/CryptoJS/sha_256.js"></script> -->
    <script type="text/javascript" src="js/jQuery/jQuery.js"></script>
    <script type="text/javascript" src="js/CryptoJS/crypto-js.min.js"></script>
    <script type="text/javascript" src="bootstrap/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="js/autorization.js"></script>
</body>
</html>