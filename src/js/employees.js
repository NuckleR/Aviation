function search_fun(){

}

function employee_info(element){
    console.log(element.id);

    // let modal_body = document.getElementById('modal_body');
    let params = 'id='+element.id;

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
            

            let modal_body = 
                document.getElementById('modal_body');
            let html = "";

            let info_modalLable = 
                document.getElementById('info_modalLabel');

            info_modalLable.textContent = 'Информация о сотруднике';
            
            html +=
            `
            <div class="container">
                <div class="row g-3 mx-auto col-10 fs-5 pb-3">
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
                        <button type="button" class="btn btn-primary col-md-12">Сменить картинку</button>
                    </div>
                </div>
            </div>
            `

            modal_body.innerHTML = html;

            const modal = 
            new bootstrap.Modal(document.getElementById('modal_form'));

            modal.show();
        }
    });
}