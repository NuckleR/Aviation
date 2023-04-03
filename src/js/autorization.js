function check_connection()
{
    console.log("Start of check script");

    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let password_hash = CryptoJS.SHA256(password.value).toString(); 
    // let password_hashed = [];

    login_change();
    password_change();

    // const request = new XMLHttpRequest(); 
    // const url = "php/check_autorization.php";
    const params = "login=" + login.value
       + "&password=" + password_hash;

    // let string_array = [
    //     'Lz7GwYjK',
    //     'rE5fA9mX',
    //     'D8tZsNcV',
    //     'pR6vTnJh',
    //     'qM2xH3tB',
    //     'K9nCzG5L',
    //     'wY7fP8bT',
    //     'rU5dF1vH',
    //     'sX4fV6jK',
    //     'L7zW8yNt',
    //     'uS2xM9cV',
    //     'B3hA6gTq',
    //     'F1jK8lNz',
    //     'eG6sR7pW',
    //     'T4fV5hJm',
    //     'Q2wE3dRb',
    //     'hA9sL7nZ',
    //     'pT6dC4kX',
    //     'F8lN2jK7',
    //     'zW7xY9tB',
    //     'cV5nM2bH',
    //     'rP6vT9jK',
    //     'L1hF5tZs',
    //     'mX3dR7wE',
    //     'nN9cV2xM',
    //     'qT8bW6yG',
    //     'J5hK7fR6',
    //     'lZ2jN8tW',
    //     'sP9kC6vH',
    //     'yG4tQ1wE',
    //     'w2lciae4',
    //     'Admin'
    //   ];

    //   let saltArray = [
    //     "Gq4DX4uA",
    //     "f6UaGZ3r",
    //     "zTj9sX7n",
    //     "Rd2vYB1w",
    //     "Lc8bKF5m",
    //     "Qx7tHJ6k",
    //     "Ee5pCZ1g",
    //     "Mw3vNf4z",
    //     "Sd9uVJ5h",
    //     "Kf2yLm6c",
    //     "Pw8zNj7x",
    //     "Xe4bFg1v",
    //     "Yh5tCz3u",
    //     "Jk6pAq9r",
    //     "Uf7mDc2s",
    //     "Vz8nBw1x",
    //     "Tj2sGh3r",
    //     "Nc6tFy4p",
    //     "Wv1uLm5k",
    //     "Qx9zKg7e",
    //     "Rd3yHj8t",
    //     "Zs5nBf6w",
    //     "Xa7mCq9p",
    //     "Vf1uGk2s",
    //     "Yc2tLz8n",
    //     "Ux4bPj5h",
    //     "Sd6vFg7r",
    //     "Jp9mKw3z",
    //     "Wq8zNc1x",
    //     "Tg5bVf2s",
    //     "Mj7yHk4p",
    //     "zSoQisk9"
    //   ];

    // for(i=0; i< 32; i++){
    //     password_hashed[i] = CryptoJS.SHA256(string_array[i]).toString() + saltArray[i]; 
    // }

    console.log(params);

    // request.responseType = "json";
    // request.open("POST", url, true);
    // request.setRequestHeader("Content-type", 
    //     "application/x-www-form-urlencoded");

    // request.addEventListener("readystatechange", ()=>{
    //     console.log("Entered eventlistener");

    //     if(request.readyState === 4 && request.status === 200){
    //         let obj = request.response;
            
    //         console.log(obj);

    //        // data = JSON.parse(obj);

    //         if(obj[0]['succsess'] === true && 
    //             obj[0]['password'] === true &&
    //             obj[0]['login'] === true)
    //         {
    //             document.location.href = "employees.php";
    //             localStorage.setItem('AuthorizedUserId', obj[1]['id']);
    //             // localStorage.setItem('AuthorizedUserId', obj[1]['id']);
    //             // localStorage.setItem('AuthorizedUserName', obj[1]['Surename'] + " " 
    //             //     + obj[1]['Name'] + " " + obj[1]['Patronymic']);
    //             // localStorage.setItem('AuthorizedUserDepartment', obj[1]['DepartmentId']);
    //         }
    //         if(obj[0]['login'] === false)
    //         {
    //             document.getElementById("mistake_1").textContent="Неверный логин!";
    //         }
    //         if(obj[0]['password'] === false)
    //         {
    //             document.getElementById("mistake_2").textContent="Неверный пароль!";
    //         }
    //     }
    // })

    // request.send(params);

    // console.log(password_hash);
    // console.log(params);

    $.ajax({
        url: 'php/check_autorization.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            if(obj[0]['succsess'] === true)
            {
                localStorage.setItem('AccessLevel', obj[0]['users_group_id']);
                localStorage.setItem('DepartmentID', obj[0]['department_id']);
                
                // console.log(obj[0]['department_id']);

                $('#password').addClass('is-valid');
                $('#login').addClass('is-valid');
                $('#alert').remove();

                document.location.href = 'employees.php';
            }
            else if(obj[0]['succsess'] === false)
            {
                $('#password').addClass('is-invalid');
                $('#login').addClass('is-invalid');

                if($('#alert').length){
                    $('#alert').remove(); 
                }

                $('#password_block').after( 
                    `<div class="alert alert-danger alert-dismissible" role="alert" id="alert">
                        <div>Неверный логин или пароль!</div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`
                );
            }
        }
    });
}

function login_change(){
    if ($('#login').hasClass('is-invalid')) 
    {
        $('#login').removeClass('is-invalid');
    } 
}

function password_change(){
    if ($('#password').hasClass("is-invalid")) 
    {
        $('#password').removeClass("is-invalid");
    } 
}