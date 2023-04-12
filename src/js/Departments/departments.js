let added_spec = [];
let exist_dep;

function show_notification(text){
    let notification_body = 
                document.getElementById('notification_body');
    notification_body.textContent = text;
    
    $('#notification').toast('show');
    // var notif = document.getElementById('notification')
    // var notif_1 = new bootstrap.Toast(notif)
    // notif_1.show()
}

function add_location(element){
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');
    localStorage.setItem('added_spec_ID', 0) ;
    added_spec = [];
    
    console.log(element.id);

    let params = "id=" + element.id
            + "&AL=" + Access_Level 
            + "&DID=" + Dep_ID;

    $.ajax({
        url: 'php/add_location/prepare.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            
            let html = "";
            let ranks = "";
            let specialities = "";
            let departments = "";
            let locations = "";

            exist_dep = obj['avaliable_departments'];
            console.log(exist_dep);
            
            let modal_body = 
                document.getElementById('modal_body');

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            let modal_footer = 
                document.getElementById('modal_footer');

            info_modalLable.textContent = `Добавление отдела в ${obj['location'][0]['name']}`;
            
            // let name = obj['employee'][0]['name'].split(' ');

            // localStorage.setItem('Current_employee',  JSON.stringify(obj['employee']));
            // localStorage.setItem('UserID',  JSON.stringify(obj['employee']));

            // console.log(name[0]);
            // console.log(name[1]);
            // console.log(name[2]);
            console.log(obj);

            //Грузим звани
            
            specialities+=
            `<option selected>...</option>`;
            if(obj['avaliable_specialities']!=null){
                for(i=0; i < obj['avaliable_specialities'].length; i++){
                    specialities+=
                    `<option value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;

                    
                }
            }
            // if(obj['avaliable_specialities']!=null){
            //     for(i=0; i < obj['avaliable_specialities'].length; i++){
            //         if(obj['avaliable_specialities'][i]['busy'] == 0 
            //                 || obj['avaliable_specialities'][i]['name'] 
            //                 == obj['employee'][0]['speciality']){
            //             if(obj['avaliable_specialities'][i]['name'] == obj['employee'][0]['speciality'])
            //             {
            //                 main_spec = obj['avaliable_specialities'][i]['name'];
            //                 specialities+=
            //                 `<option selected value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
            //             }
            //             else
            //             {
            //                 specialities+=
            //                 `<option value=${obj['avaliable_specialities'][i]['id']}>${obj['avaliable_specialities'][i]['name']}</option>`;
            //             }
            //         }
            //     }
            // }

            html +=
            `
            <div class="container">
                <div class="col-md-10 col-lg-10 mx-auto pb-3   border-bottom">
                    <label for="location_name" class="col-form-label ">Наименование отдела</label>
                    <textarea id="location_name" class="form-control  " 
                        value="" style="height: 70px;" placeholder="Введите наименование отдела..."
                        onchange="dep_changing()"></textarea>
                </div>
                <div id="add_specialities_in_location" class="col-md-10 col-lg-10 mx-auto pb-3 border">
                    <div class="col-12 row g-3 mx-auto">
                        <div class="col-md-12 col-lg-6 mx-auto">
                            <label for="speciality" class="form-label">Должность</label>
                            <select id="speciality" class="form-select select2" style= "cursor:pointer;"
                                onchange="speciality_changing()">
                                ${specialities}
                            </select>
                        </div>
                        <div class="col-md-6 col-lg-3 mx-auto">
                            <label for="amount_of_specialities" class="form-label">Количество</label>
                            <input id="amount_of_specialities"
                                type="number"  class="form-control" min="1" max="100" value="" placeholder="Кол-во"
                                onchange="num_changing()">
                        </div>
                        <div class="col-md-6 col-lg-3 text-center mx-auto">
                            <div class="col-md-0 col-lg-12" style="height: 32px; min-height: 0px;"></div>
                            <button id="add_button"  type="button" class="btn btn-primary  " onclick="add_speciality_set()" title="Добавить должность в отдел">Добавить</button>
                        </div>
                    </div>
                    <div class="text-center col-12 mx-auto mb-0 mt-3">
                        <table class="table col-12 justify-content-center table-sm table-bordered mb-0">
                            <thead style="background:#0d6efd; color: #ffffff;">
                                <tr>
                                    <th scope="col" class="col-md-4" style="border: 1px solid #0a53be;">Специальность</th>
                                    <th scope="col" class="col-md-2" style="border: 1px solid #0a53be;">Количество</th>
                                    <th scope="col" class="col-md-3" style="border: 1px solid #0a53be;">Удалить</th>
                                </tr>
                            </thead>
                        </table>
                        <div id="table_spec_add_id" class="text-center col-12 mx-auto overflow-y-auto mt-0 mb-0" style="height: 240px">
                            <table id="added_specialities"  class="table justify-content-center table-sm table-bordered mb-0">
                                <tbody id="table_spec_add_body">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            `

            modal_body.innerHTML = html;

            html = `
                    <button type="button" class="btn btn-secondary  " onclick="close_loc_add()" title="Закрыть модальное окно">Закрыть</button>
                    <button id="modal_button" type="button" class="btn btn-primary  " onclick="add_dep()" title="Добавить новый отдел">Добавить</button>
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

function close_loc_add()
{
    let mas = {};

    // let selectElement = document.getElementById("added_specialities");
    // let location_name = document.getElementById('location_name');
    // var selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;

    mas['location_name'] = document.getElementById('location_name').value;
    // mas['added_specialities'] = document.getElementById("table_spec_add_body").innerHTML;


    console.log(mas);
    console.log(added_spec);
        // const emp_info_parsed = JSON.parse(emp_info);
        // console.log(emp_info_parsed);
        
        if( mas.location_name!= "" ||
            added_spec.length!= 0 )
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

function add_speciality_set(){
    
    let mas = {};
    let html = "";
    // table_spec_add_body = document.getElementById('table_spec_add_body');
    let selectElement = document.getElementById("speciality");

    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['speciality_ID'] = document.getElementById('speciality').value;
    mas['amount'] = document.getElementById('amount_of_specialities').value;
    mas['id'] = localStorage.getItem('added_spec_ID');

    console.log(mas.id);

    if(mas.amount == '' ||
        mas.speciality == '...'){
            
        check_is_correct_loc();
    }
    else{
        // $("#childDiv2").remove(); //удалить
        html+=
        `<tr id="tr_${mas.id}" data-value=${mas.id} class="align-items-center">
            <td class="col-md-4" value=${mas.speciality_ID}>${mas.speciality}</td>
            <td class="col-md-2" value=${mas.amount}>${mas.amount}</td>
            <td class="col-md-3">
                <div class="col-md-12" title="Удалить должность из отдела">
                <svg id="tr_${mas.id}" class="delete_icon" width="20" 
                    height="20" viewBox="0 0 45 45" fill="none" 
                    data="icons/delete_icon.svg"
                    style="cursor:pointer"
                    onclick="delete_spec_tr(this)">
                    <path d="M11.25 35.625C11.25 37.6875 12.9375 39.375 15 39.375H30C32.0625 39.375 33.75 37.6875 33.75 35.625V13.125H11.25V35.625ZM15.8625 22.275L18.5062 19.6313L22.5 23.6063L26.475 19.6313L29.1187 22.275L25.1437 26.25L29.1187 30.225L26.475 32.8688L22.5 28.8937L18.525 32.8688L15.8813 30.225L19.8563 26.25L15.8625 22.275ZM29.0625 7.5L27.1875 5.625H17.8125L15.9375 7.5H9.375V11.25H35.625V7.5H29.0625Z" fill="#EC2D2D"/>
                </svg>  
                </div>
            </td>
        </tr>
        `
        let newSpec = {
            id: mas.id,
            spec_id: mas.speciality_ID,
            amount: mas.amount
          };

        mas.id = parseInt(mas.id) + parseInt(1);
        // console.log(mas.id);
        localStorage.setItem('added_spec_ID', mas.id) ;
        
        added_spec.push(newSpec);

        console.log(newSpec);

        $('#table_spec_add_body').append(html);
    }
}

function check_is_correct_loc(){
    let mas = {};
    let selectElement = document.getElementById("speciality");

    mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    mas['speciality_ID'] = document.getElementById('speciality').value;
    mas['amount'] = document.getElementById('amount_of_specialities').value;
    mas['id'] = localStorage.getItem('added_spec_ID');

    if(mas.speciality == "..."){
        $('#speciality').addClass('is-invalid');
    }
    if(mas.amount == ""){
        $('#amount_of_specialities').addClass('is-invalid');
    }
}

function num_changing(){
    if($('#amount_of_specialities').hasClass('is-invalid'))
    {
        $('#amount_of_specialities').removeClass('is-invalid');
    }
}

function speciality_changing(){
    if($('#speciality').hasClass('is-invalid'))
    {
        $('#speciality').removeClass('is-invalid');
    }
}

function dep_changing(){
    if($('#location_name').hasClass('is-invalid'))
    {
        $('#location_name').removeClass('is-invalid');
    }
}

function delete_spec_tr(element){
    tr_id = element.id;

    let tr = document.getElementById(tr_id);
    let val = tr.getAttribute('data-value');

    added_spec = added_spec.filter(added_spec => added_spec.id !== val);

    tr.remove();
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

function add_dep(){

    let mas = [];
    let selectElement = document.getElementById("speciality");

    // mas['speciality'] = document.getElementById("speciality").options[selectElement.selectedIndex].textContent;
    // mas['speciality_ID'] = document.getElementById('speciality').value;
    // mas['dep_name'] = document.getElementById('location_name').value;
    
    let newMas = {
        speciality: document.getElementById("speciality").options[selectElement.selectedIndex].textContent,
        spec_id: document.getElementById('speciality').value,
        dep_name: document.getElementById('location_name').value
      };

      mas.push(newMas);

    if(added_spec.length == 0)
    {
        show_notification("Необходимо добавить хотя бы одну должность!");
        
        
    }
    else if(mas.dep_name == "")
    {
        show_notification("Необходимо ввести название отдела!");
        $('#location_name').addClass('is-invalid');
    }
    else if(exist_dep.some((dep) => dep.name === mas.dep_name))
    {
        show_notification("Такой отдел уже существует!");
        $('#location_name').addClass('is-invalid');
    }
    else
    {
        $.ajax({
            url: 'php/add_location/add_department.php',
            method: 'post',
            data: {added_spec, mas},
            success: function(obj){
            
            
            }
        });

    }
}