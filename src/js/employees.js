function add_employee(element){

    let params = 'id='+element.id;

    $.ajax({
        url: 'php/get_employee_info.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            let modal_body = 
            document.getElementById('modal_body');
            let html = "";

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            let modal_footer = 
                document.getElementById('modal_footer');


            info_modalLable.textContent = 
                'Добавление сотрудника в отдел ...'; 
                // добавить какой отдел, вернется в json

            html +=
            `
            <div class="container">
                    <div class="row g-3 mx-auto col-12 pb-3 pt-0 border-bottom">
                        <div class="col-lg-4 col-md-12">
                            <div class="col-lg-8 col-md-12">
                                <label for="surname" class="form-label">Фамилия</label>
                                <input id="surname"
                                    type="text" class="form-control  " value="" placeholder="Фамилия">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="name" class="form-label">Имя</label>
                                <input id="name"
                                    type="text" class="form-control  " value="" placeholder="Имя">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="patronimic" class="form-label">Отчество</label>
                                <input id="patronimc"
                                    type="text" class="form-control  " value="" placeholder="Отчество">
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <div class="col-md-12 col-lg-8">
                                <label for="rank" class="form-label">Звание</label>
                                <select id="rank" class="form-select select2" style= "cursor:pointer;">
                                    <option selected>Выберите...</option>
                                    <option>...</option>
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="speciality" class="form-label">Должность</label>
                                <select id="speciality" class="form-select select2" style= "cursor:pointer;">
                                    <option selected>Выберите...</option>
                                    <option>...</option>
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
                    <div class="col-md-10 col-lg-10 mx-auto pb-3   border-bottom">
                        <label for="comment" class="col-form-label ">Комментарий</label>
                        <textarea id="comment" class="form-control  " 
                            style="height: 70px;"></textarea>
                    </div>
                </div>
            `

            modal_body.innerHTML = html;

            html = `
                    <button type="button" class="btn btn-secondary  " onclick="close_emp_info()" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary  " onclick="add_emp()">Добавить</button>
                    `;

            modal_footer.innerHTML = html;
            
            const modal = 
            new bootstrap.Modal(document.getElementById('modal_form'));

            modal.show();

            $('.select2').select2({
                theme: 'bootstrap-5'
            });
        }

    });
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

            let main_dep="";
            let main_rank="";
            let main_loc="";
            let main_spec="";

            let modal_body = 
                document.getElementById('modal_body');

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            let modal_footer = 
                document.getElementById('modal_footer');

            info_modalLable.textContent = 'Информация о сотруднике';
            
            let name = obj['employee'][0]['name'].split(' ');

            localStorage.setItem('Current_employee', obj['employee'][0]);

            console.log(name[0]);
            console.log(name[1]);
            console.log(name[2]);
            
            //Грузим звания
            ranks+=
                `<option id="...">...</option>`;
            if(obj['ranks']!=null){
                for(i=0; i < obj['ranks'].length; i++){
                    if(obj['ranks'][i]['name'] == obj['employee'][0]['rank'])
                    {
                        main_rank=obj['ranks'][i]['name'];
                        ranks+=
                        `<option id="${obj['ranks'][i]['name']}">${obj['ranks'][i]['name']}</option>`;
                    }
                    else
                    {
                        ranks+=
                        `<option id="${obj['ranks'][i]['name']}">${obj['ranks'][i]['name']}</option>`;
                    }
                }
            }

            departments+=
                `<option id="...">...</option>`;
            if(obj['avaliable_departments']!=null){
                for(i=0; i < obj['avaliable_departments'].length; i++){
                    if(obj['avaliable_departments'][i]['name'] == obj['employee'][0]['department'])
                    {
                        main_dep=obj['avaliable_departments'][i]['name'];
                        departments+=
                        `<option id="${obj['avaliable_departments'][i]['name']}">${obj['avaliable_departments'][i]['name']}</option>`;
                    }
                    else
                    {
                        departments+=
                        `<option id="${obj['avaliable_departments'][i]['name']}">${obj['avaliable_departments'][i]['name']}</option>`;
                    }
                }
            }
            
            specialities+=
                `<option id="...">...</option>`;
            if(obj['avaliable_specialities']!=null){
                for(i=0; i < obj['avaliable_specialities'].length; i++){
                    if(obj['avaliable_specialities'][i]['name'] == obj['employee'][0]['speciality'])
                    {
                        main_spec = obj['avaliable_specialities'][i]['name'];
                        specialities+=
                        `<option id="${obj['avaliable_specialities'][i]['name']}">${obj['avaliable_specialities'][i]['name']}</option>`;
                    }
                    else
                    {
                        specialities+=
                        `<option id="${obj['avaliable_specialities'][i]['name']}">${obj['avaliable_specialities'][i]['name']}</option>`;
                    }
                }
            }

            locations+=
                `<option id="...">...</option>`;
            if(obj['locations']!=null){
                for(i=0; i < obj['locations'].length; i++){
                    if(obj['locations'][i]['name'] == obj['employee'][0]['location'])
                    {
                        main_loc = obj['locations'][i]['name'];
                        locations+=
                        `<option id="${obj['locations'][i]['name']}">${obj['locations'][i]['name']}</option>`;
                    }
                    else
                    {
                        locations+=
                        `<option id="${obj['locations'][i]['name']}">${obj['locations'][i]['name']}</option>`;
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
                                    type="text" class="form-control  " value="${name[0]}" placeholder="Фамилия">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="name" class="form-label">Имя</label>
                                <input id="name"
                                    type="text" class="form-control  " value="${name[1]}" placeholder="Имя">
                            </div>
                            <div class="col-lg-8 col-md-12">
                                <label for="patronimic" class="form-label">Отчество</label>
                                <input id="patronimc"
                                    type="text" class="form-control  " value="${name[2]}" placeholder="Отчество">
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="rank" class="form-label">Звание</label>
                                <select id="rank" class="form-select select2" style= "cursor:pointer">
                                    ${ranks}
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                            <div class="col-md-12 col-lg-8">
                                <label for="speciality" class="form-label">Должность</label>
                                <select id="speciality" class="form-select select2" style= "cursor:pointer">
                                    ${specialities}
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="department" class="form-label">Отдел</label>
                                <select id="department" class="form-select select2" style= "cursor:pointer"
                                    onchange="department_changing()">
                                    ${departments}
                                </select>
                            </div>
                            <div class="col-md-12 col-lg-8">
                                <label for="location" class="form-label">Располжение</label>
                                <select id="location" ${(Access_Level == 40404) ? "": "disabled"} class="form-select select2" style= "cursor:pointer">
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
                    <div class="row g-3 d-flex col-md-10 col-lg-10 mx-auto pt-3  ">
                        <div class="col-form-label col-md-12 col-lg-4">Состояние на</div>
                        <input type="date" id="date" class="form-control col-md-12 col-lg-8  ">
                        <input disabled id="status" type="text" 
                            class="form-control col-md-12 col-lg-4  " value="" placeholder="Статус">
                        <div class="col-1 text-center">
                            c
                        </div>
                        <input disabled id="status_start" type="text" 
                            class="form-control col-md-11 col-lg-3  " value="" placeholder="Число">
                        <div class="col-1 text-center">
                            по
                        </div>
                        <input  disabled id="status_end" type="text" 
                            class="form-control col-md-11 col-lg-3  " value="" placeholder="Число">
                    </div>
                </div>
            `

            modal_body.innerHTML = html;

            html = `
                    <button type="button" class="btn btn-secondary  " onclick="close_emp_info()" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-primary  " onclick="save_emp_info()">Сохранить</button>
                    `

            const modal = 
            new bootstrap.Modal(document.getElementById('modal_form'));

            modal_footer.innerHTML = html;

            modal.show();
            $('.select2').select2({
                theme: 'bootstrap-5'
            });

            // var options = document.querySelectorAll('#speciality option');

            // // Для каждой опции установить значение selected на false
            // options.forEach(function(option) {
            //     option.selected = false;
            // });

            // $('#speciality').val(null).trigger('change');
            // $('#rank').val(null).trigger('change');
            // $('#location').val(null).trigger('change');
            // $('#department').val(null).trigger('change');
        }
    });
 
    
}

function department_changing(element){
    if ($('#department').hasClass('is-invalid')) 
    {
        $('#department').removeClass('is-invalid');
    }
    
    
}

function location_changing(element){
    if ($('#location').hasClass('is-invalid')) 
    {
        $('#location').removeClass('is-invalid');
    }



}

function speciality_changing(){
    if ($('#speciality').hasClass('is-invalid')) 
    {
        $('#speciality').removeClass('is-invalid');
    }
}