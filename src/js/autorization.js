function check_connection()
{
    console.log("Start of check script");

    let login = document.getElementById("login");
    let password = document.getElementById("password");
    let password_hash = CryptoJS.SHA256(password.value).toString(); 

    login_change();
    password_change();

    // const request = new XMLHttpRequest(); 
    // const url = "php/check_autorization.php";
    const params = "login=" + login.value
       + "&password=" + password_hash;

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