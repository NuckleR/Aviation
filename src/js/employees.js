// function initialization_fun()
// {
//     var perem = localStorage.getItem('AuthorizedUserId');

//     document.getElementById("account_name_lable").textContent=perem;
//     console.log(perem);
// }

// first_init = function(){
//     var perem = localStorage.getItem('AuthorizedUserId');

//     document.getElementById("account_name_lable").textContent=perem;
//     console.log(perem);
// }

// second_init = function(){
//     var perem = localStorage.getItem('AuthorizedUserId');

//     const request = new XMLHttpRequest(); 
//     const url = "php/load_employee_page.php";
//     const params = "Uid=" + perem;
    
//     request.responseType = "json";
//     request.open("POST", url, true);
//     request.setRequestHeader("Content-type", 
//         "application/x-www-form-urlencoded");

//     request.addEventListener("readystatechange", ()=>{
//         let obj = request.response;
        
//         console.log(obj);
//     })

//     request.send(params);

// }

// function init(){
//     first_init();
//     second_init();
// };

var height;

function Search_fun(){}{

}

function Info_for_account(){
   
    let body = document.getElementById('employee_page');
    
    let html = "";

    $('#header').after( 

     "<div id=\"info_window\" class=\"info_window\"></div>" 
        +"<div id=\"info_window_frame\" class=\"info_window_frame\">" 
        +"<div class=\"cap\">"
            +"<div class=\"info_window_exit\">"
                +"<svg onclick=\"info_window_exit()\" width=\"20\" id=\"exit_cross_1\" class=\"exit_cross\"" 
                   + "height=\"20\" viewBox=\"0 0 45 45\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">"
                   + "<path d=\"M37.5 37.5L7.5 7.5M37.5 7.5L7.5 37.5\" stroke=\"#6A67B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
                +"</svg>"   
            +"</div>"
        +"</div>"
        +"<div class=\"photo\">"
            +"<div class=\"photo_place\">"
                +"<img id=\"photo\" src=\"\" alt=\"\">"
            +"</div>"
            +"<input class=\"save_photo\" type=\"button\">"
        +"</div>"
        +"<div class=\"nsp_plus_info\">"
            +"<label class=\"nsp_info_lable\">"
                +"<br><span class=\"info_id\"></span>"
                +"<br><span class=\"info_name\"></span>"
                +"<br><span class=\"info_surename\"></span>"
                +"<br><span class=\"info_patronymic\"></span>"
                +"<br><span class=\"info_dep_id\"></span>"
                +"<br><span class=\"info_speciality\"></span>"
                +"<br><span class=\"info_sertification\"></span>"
                +"<br><span class=\"info_login\"></span>"
                +"<br><span class=\"info_password\"></span>"
            +"</label>"
        +"</div>"
        +"<div class=\"comment_block\">"
            +"<label class=\"comment_lable\">Комментарий:</label>"
            +"<input class=\"comment\" type =\"text\" readonly=\"true\">"
        +"</div>"
        +"<div class=\"status_block\">"
            +"<input type=\"date\">"
        +"</div>"
        +"<div class=\"button_block\"></div>"
    +"</div>"
    );

    console.log(html);

    body.innerHTML += html;
    
}

function Info_for_employee(){
   
    let body = document.getElementById('employee_page');
    
    let html = "";

    let table = document.getElementById('employee_table_body');

    height = table.scrollTop; //запоминать высоту скролла таблицы

    // console.log("hfpvth^ " + height);

    $('#header').after( 

     "<div id=\"info_window\" class=\"info_window\"></div>" 
        +"<div id=\"info_window_frame\" class=\"info_window_frame\">" 
        +"<div class=\"cap\">"
            +"<div class=\"info_window_exit\">"
                +"<svg onclick=\"info_window_exit()\" width=\"20\" id=\"exit_cross_1\" class=\"exit_cross\"" 
                   + "height=\"20\" viewBox=\"0 0 45 45\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">"
                   + "<path d=\"M37.5 37.5L7.5 7.5M37.5 7.5L7.5 37.5\" stroke=\"#6A67B8\" stroke-width=\"2\" stroke-linecap=\"round\"/>"
                +"</svg>"   
            +"</div>"
        +"</div>"
        +"<div class=\"photo\">"
            +"<div class=\"photo_place\">"
                +"<img id=\"photo\" src=\"\" alt=\"\">"
            +"</div>"
            +"<input class=\"save_photo\" type=\"button\">"
        +"</div>"
        +"<div class=\"nsp_plus_info\">"
            +"<label class=\"nsp_info_lable\">"
                +"<br><span class=\"info_id\"></span>"
                +"<br><span class=\"info_name\"></span>"
                +"<br><span class=\"info_surename\"></span>"
                +"<br><span class=\"info_patronymic\"></span>"
                +"<br><span class=\"info_dep_id\"></span>"
                +"<br><span class=\"info_speciality\"></span>"
                +"<br><span class=\"info_sertification\"></span>"
                +"<br><span class=\"info_login\"></span>"
                +"<br><span class=\"info_password\"></span>"
            +"</label>"
        +"</div>"
        +"<div class=\"comment_block\">"
            +"<label class=\"comment_lable\">Комментарий:</label>"
            +"<input class=\"comment\" type =\"text\" readonly=\"true\">"
        +"</div>"
        +"<div class=\"status_block\">"
            +"<input type=\"date\">"
        +"</div>"
        +"<div class=\"button_block\"></div>"
    +"</div>"
    );

    console.log(html);

    body.innerHTML += html;

    // table.scrollTo(0, height); //Добавлять скроллы после внешних функций с вызовом инфо

}

function info_window_exit() {
    document.getElementById("info_window").remove();
    document.getElementById("info_window_frame").remove();

    let table = document.getElementById('employee_table_body');
    table.scrollTo(0, height);
}

// var bg = document.getElementById('dad');
// document.getElementById('not').addEventListener("mouseover", function(){bg.style.background = "#c00";this.addEventListener("mouseout", function(){bg.style.background = "";});
// });


//window.onload(init_fun);