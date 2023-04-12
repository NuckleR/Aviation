function add_employee(element){
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');
    localStorage.setItem('Current_Dep_ID', element.id);

    let ranks = "";
    let specialities = "";
    let html = "";

    let params = 'id='+element.id
                + "&AL=" + Access_Level 
                + "&DID=" + Dep_ID;

    $.ajax({
        url: 'php/add_employee/prepare.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            let modal_body = 
            document.getElementById('modal_body');
           

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            let modal_footer = 
                document.getElementById('modal_footer');


            info_modalLable.textContent = 
                `Добавление сотрудника в отдел ${obj['department'][0]['name']}`; 
                // добавить какой отдел, вернется в json

            specialities+=
                `<option selected>...</option>`;
            if(obj['avaliable_specialities']!=null){
                for(i=0; i < obj['avaliable_specialities'].length; i++){
                    if(obj['avaliable_specialities'][i]['busy'] == 0 ){
                        specialities+=
                            `<option value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
                    }
                }
            }

            ranks+=
                `<option selected>...</option>`;
            if(obj['ranks']!=null){
                for(i=0; i < obj['ranks'].length; i++){
                        ranks+=
                        `<option value=${obj['ranks'][i]['id']}>${obj['ranks'][i]['name']}</option>`;
                }
            }
        

            html +=
            `
            <div class="container">
                    <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">
                        <div class="col-lg-4 col-md-12">
                            <div class="col-lg-8 col-md-12">
                                <label for="surname" class="form-label">Фамилия</label>
                                <input id="surname"
                                    type="text" class="form-control  " value="" placeholder="Фамилия"
                                    onchange="secondname_changing()">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="name" class="form-label">Имя</label>
                                <input id="name"
                                    type="text" class="form-control  " value="" placeholder="Имя"
                                    onchange="name_changing()">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="patronimic" class="form-label">Отчество</label>
                                <input id="patronimic"
                                    type="text" class="form-control  " value="" placeholder="Отчество"
                                    onchange="thirdname_changing()">
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <div class="col-md-12 col-lg-8">
                                <label for="rank" class="form-label">Звание</label>
                                <select id="rank" class="form-select select2" style= "cursor:pointer;"
                                    onchange="rank_changing()">
                                    ${ranks}
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="speciality" class="form-label">Должность</label>
                                <select id="speciality" class="form-select select2" style= "cursor:pointer;"
                                    onchange="speciality_changing()">
                                    ${specialities}
                                </select>
                            </div>
                        </div>
                        <div class="row g-3 d-flex justify-content-center col-lg-4 col-md-12">
                            <div class="col-md-12 d-flex justify-content-center">
                                <img id="img_info" src="img/placeholder_image.jpg" 
                                    class="img-fluid" 
                                    alt="lll" style="max-width: 150px; height: 200px;">
                            </div>
                            <button type="button" class="btn btn-primary mx-auto col-md-10  ">Загрузить картинку</button>
                        </div>
                        
                    </div>
                    <div class="col-md-10 col-lg-10 mx-auto pb-3 border-bottom">
                        <label for="comment" class="col-form-label ">Комментарий</label>
                        <textarea id="comment" class="form-control  " 
                            style="height: 70px;"></textarea>
                    </div>
                </div>
            `

            modal_body.innerHTML = html;

            html = `
                    <button type="button" class="btn btn-secondary  " onclick="close_emp_add()" title="Закрыть форму удаления сотрудника">Закрыть</button>
                    <button type="button" class="btn btn-primary  " onclick="add_emp()" title="Добавить сотрудника">Добавить</button>
                    `;

            modal_footer.innerHTML = html;
            
            // const modal = 
            // new bootstrap.Modal(document.getElementById('modal_form'));

            // modal.show();
            $("#modal_form").modal("show");

            $('.select2').select2({
                theme: 'bootstrap-5'
            });
        }

    });
}

function close_emp_add()
{
    let mas = {};

    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank');
    // var selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
    mas['name'] = document.getElementById('name').value;
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;
    mas['comment'] = document.getElementById('comment').value;
    mas['fullname'] = `${mas['secondname']} ${mas['name']} ${mas['thirdname']}`; 

    console.log(mas);
        // const emp_info_parsed = JSON.parse(emp_info);
        // console.log(emp_info_parsed);
        
        if( mas.name!= "" ||
            mas.secondname!= "" ||
            mas.thirdname!= "" ||
            mas.rank!= "..."||
            mas.speciality!="..." ||
            mas.comment!="")
        {
                //Появляется модальное окнок
                //предупреждающее, что надо 
                //сохранить
                let modal_body = 
                    document.getElementById('attention_modal_body');

                let info_modalLable = 
                    document.getElementById('attention_modalLabel');

                let modal_footer = 
                    document.getElementById('attention_modal_footer');

                info_modalLable.textContent = 'Внимание!';
                
                html="";

                html+=
                `<div class="container">
                    <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">Вы уверены, что хотите выйти?<br>Есть несохраненные данные!
                    
                    </div>        
                </div>`;

                modal_body.innerHTML = html;

                html="";
                html+=
                `
                    <button type="button" class="btn btn-secondary  " onclick="emp_no()" style="width: 50px;">Нет</button>
                    <button type="button" class="btn btn-primary  " onclick="emp_yes()" style="width: 50px;">Да</button>
                `;
                modal_footer.innerHTML = html;

                $("#modal_form_attention").modal("show");
                $("#modal_form").modal("hide");
            
        }
        else
        {
            $('#modal_form').modal('hide');
           
        }
}


function add_emp()
{
    let mas = {};

    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank');
    // var selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
    mas['name'] = document.getElementById('name').value;
    mas['department_id'] = localStorage.getItem('Current_Dep_ID'); 
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['speciality_id'] = document.getElementById('speciality').value;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;
    mas['comment'] = document.getElementById('comment').value;
    mas['fullname'] = `${mas['secondname']} ${mas['name']} ${mas['thirdname']}` 

        // console.log(mas);

    // let emp_info = localStorage.getItem("Current_employee");
    // const emp_info_parsed = JSON.parse(emp_info);
    // console.log(emp_info_parsed);
    

    if(mas.name == "" ||
        mas.secondname == "" ||
        mas.thirdnamename == "" ||
        mas.rank == "..."||
        mas.speciality =="...")
    {
        check_is_correct_add();
    }
    else
    {
        let User_ID = localStorage.getItem('UserID');
        
        let params = "&New_Name="+ mas.fullname
            + "&New_Rank=" + mas.rank
            + "&New_Rank_ID=" + mas.rank_id
            + "&New_Comment=" + mas.comment
            + "&New_Spec_ID=" + mas.speciality_id
            + "&New_Dep_ID=" + mas.department_id
            + "&UID=" + User_ID;

            // console.log(params);
            $.ajax({
                url: 'php/add_employee/add_employee.php',
                method: 'post',
                dataType: 'json',
                data: params,
                success: function(obj)
                {
                    // employee_info()
                
                    search_function();
                    console.log(obj);

                    if (localStorage.getItem('tableEmpScrollPosition') !== null) {
                        document.getElementById('table_body_id').scrollTop = localStorage.getItem('tableEmpScrollPosition');
                    }
                    console.log(localStorage.getItem('tableEmpScrollPosition'));

                  
                    localStorage.removeItem('Current_Dep_ID');
                    $('#modal_form').modal('hide'); 

                    show_notification(`${mas.fullname} успешно добавлен!`);
                    // localStorage.setItem('Current_employee',  JSON.stringify(obj['employee']));
                }
            });
        
    }

}

function check_is_correct_add(){

    let mas = {};
    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank'); 

    mas['name'] = document.getElementById('name').value;
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;

    if(mas.name == ""){
        $('#name').addClass('is-invalid');
    }
    if(mas.secondname == ""){
        $('#surname').addClass('is-invalid');
    }
    if(mas.thirdname == ""){
        $('#patronimic').addClass('is-invalid');
    }
    if(mas.speciality == "..."){
        $('#speciality').addClass('is-invalid');
    }
    if(mas.speciality == "..."){
        $('#rank').addClass('is-invalid');
    }
}


function employee_info(element){
    // console.log(element.id);
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');



    // const params = "AL=" + Access_Level 
    //     + "&DID=" + Dep_ID;
    // let modal_body = document.getElementById('modal_body');
    let params = 'id='+element.id
            + "&AL=" + Access_Level 
            + "&DID=" + Dep_ID;

    $.ajax({
        url: 'php/get_employee_info.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);
            
        
            // let name = document.getElementById('name_info');
            // name.value= obj[0]['name'];
            // let surname = document.getElementById('sur_info');
            // surname.value= obj[0]['surname'];
            

            
            let html = "";
            let ranks = "";
            let specialities = "";
            let departments = "";
            let locations = "";

            let modal_body = 
                document.getElementById('modal_body');

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            let modal_footer = 
                document.getElementById('modal_footer');

            info_modalLable.textContent = 'Информация о сотруднике';
            
            let name = obj['employee'][0]['name'].split(' ');

            localStorage.setItem('Current_employee',  JSON.stringify(obj['employee']));
            // localStorage.setItem('UserID',  JSON.stringify(obj['employee']));

            // console.log(name[0]);
            // console.log(name[1]);
            // console.log(name[2]);
            console.log(obj);

            //Грузим звания
            ranks+=
                `<option>...</option>`;
            if(obj['ranks']!=null){
                for(i=0; i < obj['ranks'].length; i++){
                    if(obj['ranks'][i]['name'] == obj['employee'][0]['rank'])
                    {
                        main_rank=obj['ranks'][i]['name'];
                        ranks+=
                        `<option selected value=${obj['ranks'][i]['id']}>${obj['ranks'][i]['name']}</option>`;
                    }
                    else
                    {
                        ranks+=
                        `<option value=${obj['ranks'][i]['id']}>${obj['ranks'][i]['name']}</option>`;
                    }
                }
            }

            departments+=
                `<option>...</option>`;
            if(obj['avaliable_departments']!=null){
                for(i=0; i < obj['avaliable_departments'].length; i++){
                    if(obj['avaliable_departments'][i]['name'] == obj['employee'][0]['department'])
                    {
                        main_dep=obj['avaliable_departments'][i]['name'];
                        departments+=
                        `<option selected value=${obj['avaliable_departments'][i]['id']}>${obj['avaliable_departments'][i]['name']}</option>`;
                    }
                    else
                    {
                        departments+=
                        `<option value=${obj['avaliable_departments'][i]['id']}>${obj['avaliable_departments'][i]['name']}</option>`;
                    }
                }
            }
            
            specialities+=
                `<option>...</option>`;
            if(obj['avaliable_specialities']!=null){
                for(i=0; i < obj['avaliable_specialities'].length; i++){
                    if(obj['avaliable_specialities'][i]['busy'] == 0 
                            || obj['avaliable_specialities'][i]['name'] 
                            == obj['employee'][0]['speciality']){
                        if(obj['avaliable_specialities'][i]['name'] == obj['employee'][0]['speciality'])
                        {
                            main_spec = obj['avaliable_specialities'][i]['name'];
                            specialities+=
                            `<option selected value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
                        }
                        else
                        {
                            specialities+=
                            `<option value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
                        }
                    }
                }
            }

            locations+=
                `<option>...</option>`;
            if(obj['locations']!=null){
                for(i=0; i < obj['locations'].length; i++){
                    if(obj['locations'][i]['name'] == obj['employee'][0]['location'])
                    {
                        main_loc = obj['locations'][i]['name'];
                        locations+=
                        `<option selected>${obj['locations'][i]['name']}</option>`;
                    }
                    else
                    {
                        locations+=
                        `<option>${obj['locations'][i]['name']}</option>`;
                    }
                }
            }

            html +=
            `
            <div class="container">
                    <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">
                        <div class="col-lg-4 col-md-12">
                            <div class="col-lg-8 col-md-12">
                                <label for="surname" class="form-label">Фамилия</label>
                                <input id="surname"
                                    type="text" class="form-control  " value="${name[0]}" placeholder="Фамилия"
                                    onchange="secondname_changing()">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="name" class="form-label">Имя</label>
                                <input id="name"
                                    type="text" class="form-control  " value="${name[1]}" placeholder="Имя"
                                    onchange="name_changing()">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="patronimic" class="form-label">Отчество</label>
                                <input id="patronimic"
                                    type="text" class="form-control  " value="${name[2]}" placeholder="Отчество"
                                    onchange="thirdname_changing()">
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="rank" class="form-label">Звание</label>
                                <select id="rank" class="form-select select2" style= "cursor:pointer;"
                                    onchange="function rank_changing()">
                                    ${ranks}
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <div class="col-md-12 col-lg-8">
                                <label for="speciality" class="form-label">Должность</label>
                                <select id="speciality" class="form-select select2" style= "cursor:pointer;"
                                    onchange="speciality_changing()">
                                    ${specialities}
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="department" class="form-label">Отдел</label>
                                <select id="department" class="form-select select2" style= "cursor:pointer;"
                                    onchange="department_changing(this)">
                                    ${departments}
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="location" class="form-label">Располжение</label>
                                <select id="location" ${(Access_Level == 40404) ? "": "disabled"} class="form-select select2" style= "cursor:pointer"
                                    onchange="location_changing(this)">
                                    ${locations}
                                </select>
                            </div>
                        </div>
                        <div class="row g-3 d-flex justify-content-center col-lg-4 col-md-12">
                            <div class="col-md-12 d-flex justify-content-center">
                                <img id="img_info" src="img/placeholder_image.jpg" 
                                    class="img-fluid" 
                                    alt="lll" style="max-width: 150px; height: 200px;">
                            </div>
                            <button type="button" class="btn btn-primary mx-auto col-md-10  ">Сменить картинку</button>
                        </div>
                        
                    </div>
                    <div class="col-md-10 col-lg-10 mx-auto pb-3   border-bottom">
                        <label for="comment" class="col-form-label ">Комментарий</label>
                        <textarea id="comment" class="form-control  " 
                            value="${obj['employee'][0]['comment']}" style="height: 70px;">${obj['employee'][0]['comment']}</textarea>
                    </div>
                    
            `
                // <div class="row g-3 d-flex col-md-10 col-lg-10 mx-auto pt-3  ">
                //         <div class="col-form-label col-md-12 col-lg-4">Состояние на</div>
                //         <input type="date" id="date" class="form-control col-md-12 col-lg-8  ">
                //         <input disabled id="status" type="text" 
                //             class="form-control col-md-12 col-lg-4  " value="" placeholder="Статус">
                //         <div class="col-1 text-center">
                //             c
                //         </div>
                //         <input disabled id="status_start" type="text" 
                //             class="form-control col-md-11 col-lg-3  " value="" placeholder="Число">
                //         <div class="col-1 text-center">
                //             по
                //         </div>
                //         <input  disabled id="status_end" type="text" 
                //             class="form-control col-md-11 col-lg-3  " value="" placeholder="Число">
                //     </div>
                // </div>
            modal_body.innerHTML = html;

            html = `
                    <button type="button" class="btn btn-secondary  " onclick="close_emp_info()" title="Закрыть модальное окно">Закрыть</button>
                    <button id="modal_button" type="button" class="btn btn-primary  " onclick="save_emp_info()" title="Сохранить информацию о сотруднике">Сохранить</button>
                    `

            // const modal = 
            // new bootstrap.Modal(document.getElementById('modal_form'));

            modal_footer.innerHTML = html;

            // modal.show();

            $("#modal_form").modal("show");

            $('.select2').select2({
                theme: 'bootstrap-5'
            });

        }
    });
 
    
}

function department_changing(element){
    if ($('#department').hasClass('is-invalid')) 
    {
        $('#department').removeClass('is-invalid');
    }

    let Access_Level = localStorage.getItem('AccessLevel');
    
    let params = 'D_ID='+element.value
            + "&AL=" + Access_Level;

    let emp_info = localStorage.getItem("Current_employee");
    const emp_info_parsed = JSON.parse(emp_info);
    // console.log(emp_info_parsed);

    let select_spec = document.getElementById('speciality');
    let specialities = "";
    specialities+=
                `<option selected>...</option>`;
    select_spec.innerHTML = specialities;

    $.ajax({
        url: 'php/emp_info_chg/dep_chg.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            specialities = "";

            // console.log(obj['avaliable_specialities']);
            // console.log(emp_info_parsed[0]['speciality']);
            specialities+=
                `<option selected>...</option>`;
            if(obj['avaliable_specialities']!=null){
                for(i=0; i < obj['avaliable_specialities'].length; i++){
                    if(obj['avaliable_specialities'][i]['busy'] == 0 
                            || obj['avaliable_specialities'][i]['name'] 
                            == emp_info_parsed[0]['speciality'])
                    {
                        specialities+=`<option value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
                    }
                }
            }

            // console.log(specialities);
            select_spec.innerHTML = specialities;
        }
    });
}

function location_changing(element){
    if ($('#location').hasClass('is-invalid')) 
    {
        $('#location').removeClass('is-invalid');
    }

    let select_spec = document.getElementById('speciality');
    let specialities = "";

    specialities+=
        `<option selected>...</option>`;
    select_spec.innerHTML = specialities;


    let select_dep = document.getElementById('department');
    let departments = "";

    departments+=
        `<option selected>...</option>`;
    select_dep.innerHTML = departments;

    let Access_Level = localStorage.getItem('AccessLevel');
    
    let params = 'L_NAME='+element.value
            + "&AL=" + Access_Level;
    
    $.ajax({
        url: 'php/emp_info_chg/loc_chg.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            departments = "";

            departments+=
                `<option selected>...</option>`;
            if(obj['avaliable_departments']!=null){
                for(i=0; i < obj['avaliable_departments'].length; i++){
                    departments+=
                    `<option value=${obj['avaliable_departments'][i]['id']}>${obj['avaliable_departments'][i]['name']}</option>`;
                    
                }
            }

            select_dep.innerHTML = departments;
        }
    });
}

function speciality_changing(){
    if ($('#speciality').hasClass('is-invalid')) 
    {
        $('#speciality').removeClass('is-invalid');
    }
}

function rank_changing(){
    if($('#rank').hasClass('is-invalid'))
    {
        $('#rank').removeClass('is-invalid');
    }
}

function name_changing(){
    
    if($('#name').hasClass('is-invalid'))
    {
        $('#name').removeClass('is-invalid');
    }
}

function secondname_changing(){
    
    if($('#surname').hasClass('is-invalid'))
    {
        $('#surname').removeClass('is-invalid');
    }
}

function thirdname_changing(){
    
    if($('#patronimic').hasClass('is-invalid'))
    {
        $('#patronimic').removeClass('is-invalid');
    }
}

function close_emp_info()
{
    let mas = {};

    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank');
    let selectElementDep = document.getElementById('department'); 
    // var selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
    mas['name'] = document.getElementById('name').value;
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;
    mas['department'] = document.getElementById('department').options[selectElementDep.selectedIndex].textContent;
    mas['department_id'] = document.getElementById('department').value;
    mas['location'] = document.getElementById('location').value;
    mas['comment'] = document.getElementById('comment').value;
    mas['fullname'] = `${mas['secondname']} ${mas['name']} ${mas['thirdname']}` 

        console.log(mas);

    let emp_info = localStorage.getItem("Current_employee");
    if (emp_info) 
    {
        const emp_info_parsed = JSON.parse(emp_info);
        console.log(emp_info_parsed);
        
        if(emp_info_parsed[0]['department']!=mas.department ||
            emp_info_parsed[0]['location']!=mas.location ||
            emp_info_parsed[0]['name']!= mas.fullname ||
            emp_info_parsed[0]['rank']!=mas.rank ||
            emp_info_parsed[0]['speciality']!=mas.speciality ||
            emp_info_parsed[0]['comment']!=mas.comment)
        {
                //Появляется модальное окнок
                //предупреждающее, что надо 
                //сохранить
                let modal_body = 
                    document.getElementById('attention_modal_body');

                let info_modalLable = 
                    document.getElementById('attention_modalLabel');

                let modal_footer = 
                    document.getElementById('attention_modal_footer');

                info_modalLable.textContent = 'Внимание!';
                
                html="";

                html+=
                `<div class="container">
                    <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">Вы уверены, что хотите выйти?<br>Есть несохраненные данные!
                    
                    </div>        
                </div>`;

                modal_body.innerHTML = html;

                html="";
                html+=
                `
                    <button type="button" class="btn btn-secondary  " onclick="emp_no()" style="width: 50px;">Нет</button>
                    <button type="button" class="btn btn-primary  " onclick="emp_yes()" style="width: 50px;">Да</button>
                `;
                modal_footer.innerHTML = html;

                $("#modal_form_attention").modal("show");
                $("#modal_form").modal("hide");
            
        }
        else
        {
            $('#modal_form').modal('hide'); 
            localStorage.removeItem("Current_employee");
        }
        
    } 
    else 
    {
        return 0;
    }
}

function check_is_correct(){

    let mas = {};
    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank'); 

    mas['name'] = document.getElementById('name').value;
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;
    mas['department'] = document.getElementById('department').value;
    mas['location'] = document.getElementById('location').value;

    if(mas.name == ""){
        $('#name').addClass('is-invalid');
    }
    if(mas.secondname == ""){
        $('#surname').addClass('is-invalid');
    }
    if(mas.thirdname == ""){
        $('#patronimic').addClass('is-invalid');
    }
    if(mas.speciality == "..."){
        $('#speciality').addClass('is-invalid');
    }
    if(mas.department == "..."){
        $('#department').addClass('is-invalid');
    }
    if(mas.location == "..."){
        $('#location').addClass('is-invalid');
    }

}



function save_emp_info()
{
    let mas = {};

    let selectElement = document.getElementById("speciality");
    let selectElementRank = document.getElementById('rank');
    let selectElementDep = document.getElementById('department'); 
    // var selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
    mas['name'] = document.getElementById('name').value;
    mas['secondname'] = document.getElementById('surname').value;
    mas['thirdname'] = document.getElementById('patronimic').value;
    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['rank'] = document.getElementById('rank').options[selectElementRank.selectedIndex].textContent;
    mas['rank_id'] = document.getElementById('rank').value;
    mas['speciality_ID'] = document.getElementById('speciality').value;
    mas['department'] = document.getElementById('department').options[selectElementDep.selectedIndex].textContent;
    mas['department_id'] = document.getElementById('department').value;
    mas['location'] = document.getElementById('location').value;
    mas['comment'] = document.getElementById('comment').value;
    mas['fullname'] = `${mas['secondname']} ${mas['name']} ${mas['thirdname']}` 

        // console.log(mas);

    let emp_info = localStorage.getItem("Current_employee");
    if (emp_info) 
    {
        const emp_info_parsed = JSON.parse(emp_info);
        // console.log(emp_info_parsed);
        
        if(emp_info_parsed[0]['department']!=mas.department ||
            emp_info_parsed[0]['location']!=mas.location ||
            emp_info_parsed[0]['name']!= mas.fullname ||
            emp_info_parsed[0]['rank']!=mas.rank ||
            emp_info_parsed[0]['speciality']!=mas.speciality ||
            emp_info_parsed[0]['comment']!=mas.comment)
        {
            if(mas.name == "" || mas.secondname == "" ||
                mas.thirdname == "" || mas.rank == "..." ||
                mas.speciality == "..." || mas.department == "..."||
                mas.location == "...")
            {
                check_is_correct();
            }
            else
            {
                let User_ID = localStorage.getItem('UserID');
                
                let params = 'Prev_Emp_ID=' + emp_info_parsed[0]['id']
                    + "&Prev_Spec_ID=" + emp_info_parsed[0]['speciality_id']
                    + "&New_Dep=" + mas.department
                    + "&New_Name="+ mas.fullname
                    + "&New_Rank=" + mas.rank
                    + "&New_Rank_ID=" + mas.rank_id
                    + "&New_Comment=" + mas.comment
                    + "&New_Spec_ID=" + mas.speciality_ID
                    + "&New_Dep_ID=" + mas.department_id
                    + "&UID=" + User_ID;

                    console.log(params);
                    $.ajax({
                        url: 'php/save_employee/save.php',
                        method: 'post',
                        dataType: 'json',
                        data: params,
                        success: function(obj)
                        {
                            // employee_info()
                            table_init();
                            // console.log(obj['employee']);

                            if (localStorage.getItem('tableEmpScrollPosition') !== null) {
                                document.getElementById('table_body_id').scrollTop = localStorage.getItem('tableEmpScrollPosition');
                            }
                            console.log(localStorage.getItem('tableEmpScrollPosition'));

                            // localStorage.removeItem('Current_employee');
                            localStorage.setItem('Current_employee',  JSON.stringify(obj['employee']));
                        }
                    });
                //Сделать инсерт на место прежнего emp
                //Прочитать новые данные об emp, обновить 
                //модальное окно
                //Здесь происходит операция сохране
                //ния
               
            }
        }
        else
        {
            return 0; 
        }
        
    } 
    else 
    {
        return 0;
    }
}

function emp_yes(){
    $("#modal_form_attention").modal("hide");
    if(localStorage.getItem("Current_employee")!= null){
        localStorage.removeItem("Current_employee");
    }
}

function emp_no(){
    $("#modal_form_attention").modal("hide");
    $('#modal_form').modal('show'); 

}


function delete_employee(element)
{
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');



    // const params = "AL=" + Access_Level 
    //     + "&DID=" + Dep_ID;
    // let modal_body = document.getElementById('modal_body');
    let params = 'id='+element.id
            + "&AL=" + Access_Level 
            + "&DID=" + Dep_ID;
    $.ajax({
        url: 'php/get_employee_info.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);
       

            let modal_body = 
                document.getElementById('attention_modal_body');

            let info_modalLable = 
                document.getElementById('attention_modalLabel');

            let modal_footer = 
                document.getElementById('attention_modal_footer');

            info_modalLable.textContent = 'Внимание!';

            localStorage.setItem('id', obj['employee'][0]['id'] );
            localStorage.setItem('name', obj['employee'][0]['name']);
            html="";

            html+=
            `<div class="container">
                <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">Вы уверены, что хотите удалить<br>${obj['employee'][0]['name']}<br>из "${obj['employee'][0]['department']}"?</div>        
            </div>`;

            modal_body.innerHTML = html;

            html="";
            html+=
            `
                <button  type="button" class="btn btn-secondary  " onclick="delete_employee_no()" style="width: 50px;">Нет</button>
                <button  type="button" class="btn btn-primary  " onclick="delete_employee_yes()" style="width: 50px;">Да</button>
            `;
            modal_footer.innerHTML = html;
            $("#modal_form_attention").modal("show");
        }
    });
}

function delete_employee_yes()
{
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');
    let id = localStorage.getItem('id');
    let name = localStorage.getItem('name');



    // const params = "AL=" + Access_Level 
    //     + "&DID=" + Dep_ID;
    // let modal_body = document.getElementById('modal_body');
    let params = 'id='+ id
            + "&AL=" + Access_Level 
            + "&DID=" + Dep_ID;
    $.ajax({
        url: 'php/delete_employee/delete.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            show_notification(`${name} успешно удален!`);

            localStorage.removeItem('name');
            localStorage.removeItem('id');
            $("#modal_form_attention").modal("hide");
            search_function();
        }
    });
}

function delete_employee_no()
{   
    // $("#notification_body").toast("show");
    $("#modal_form_attention").modal("hide");
}

function show_notification(text){
    let notification_body = 
                document.getElementById('notification_body');
    notification_body.textContent = text;
    
    $('#notification').toast('show');
    // var notif = document.getElementById('notification')
    // var notif_1 = new bootstrap.Toast(notif)
    // notif_1.show()
}





