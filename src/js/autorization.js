function check_connection()
{
    console.log("Start of check script");

    var login = document.getElementById("login");
    var password = document.getElementById("password");

    const request = new XMLHttpRequest(); 
    const url = "php/check_autorization.php";
    const params = "Login=" + login.value
       + "&Password=" + password.value;
    
    request.responseType = "json";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", 
        "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", ()=>{
        console.log("Entered eventlistener");

        if(request.readyState === 4 && request.status === 200){
            let obj = request.response;
            
            console.log(obj);

           // data = JSON.parse(obj);

            if(obj[0]['Succsess'] === true && 
                obj[0]['Password'] === true &&
                obj[0]['Login'] === true)
            {
                document.location.href = "employees.html";
                localStorage.setItem('AuthorizedUserId', obj[1]['id']);
                // localStorage.setItem('AuthorizedUserId', obj[1]['id']);
                // localStorage.setItem('AuthorizedUserName', obj[1]['Surename'] + " " 
                //     + obj[1]['Name'] + " " + obj[1]['Patronymic']);
                // localStorage.setItem('AuthorizedUserDepartment', obj[1]['DepartmentId']);
                //console.log(obj[1]['id']);
            }
            if(obj[0]['Login'] === false)
            {
                document.getElementById("mistake_1").textContent="Неверный логин!";
            }
            if(obj[0]['Password'] === false)
            {
                document.getElementById("mistake_2").textContent="Неверный пароль!";
            }
        }
    })
    
    request.send(params);

    // $.ajax({
    //     url: 'php/check_connection.php',
    //     method: 'post',
    //     dataType: 'json',
    //     data: params,
    //     success: function(res){
    //         console.log(res);
    //     }

    // });
}

function off_mistake_login()
{
    document.getElementById("mistake_1").textContent="";
}

function off_mistake_password()
{
    document.getElementById("mistake_2").textContent="";
}