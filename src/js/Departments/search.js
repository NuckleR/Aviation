function clear_search_function(){

    $("#department_search").val("...").trigger("change");

    search_function();

}

function search_function(){
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');

    let department_search = 
        document.getElementById('department_search');
    
    const params = "AL=" + Access_Level 
        + "&DID=" + Dep_ID
        + "&DName=" + department_search.value

    console.log(params);

    $.ajax({
        url: 'php/search_dep.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);
            if(obj['success'] == true){

                let table = document.getElementById('table_body');
                let html = "";

                if(obj['locations']){
                    for(i = 0; i < obj['locations'].length; i++){
                        if(obj['locations'][i]['deleted'] == 0){
                            html += 
                            `<tr>
                                <td colspan="4" style="background: #F37777; border: 1px solid #EC2D2D; color: #EBEBEB;">
                                    <a class="btn col-10 p-0" data-bs-toggle="collapse" 
                                        data-bs-target="#row_loc_${i}"
                                        aria-expanded="false" aria-controls="row_loc_${i}">${obj['locations'][i]['name']}</a>
                                    <svg id="${obj['locations'][i]['id']}" value=${obj['locations'][i]['name']} class="add_emp_but float-end m-2" width="15" 
                                        height="15" viewBox="0 0 27 27" fill="none" 
                                        data="icons/plus_department.svg"
                                        style="cursor:pointer"
                                        onclick="add_location(this)">
                                        <path d="M11.625 26.625V15.375H0.375V11.625H11.625V0.375H15.375V11.625H26.625V15.375H15.375V26.625H11.625Z" fill="#EC2D2D"/>
                                    </svg>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="4" class="p-0 m-0" height="0">
                                    <div class="collapse show m-0 p-0" height="0" id="row_loc_${i}">
                                        <table class=" collapse show table justify-content-center table-sm table-bordered p-0 m-0">
                            `
                        }
                        if(obj['departments']){

                        for(j = 0; j< obj['departments'].length; j++){

                            if(obj['departments'][j]['location_id'] === 
                                obj['locations'][i]['id'] && 
                                obj['departments'][j]['deleted'] == 0)
                            {
                                html +=
                                `<tr>
                                    <td class="col-md-9" style="background: #EEE2A3; border: 1px solid #978D5C; color: #212529;">${obj['departments'][j]['name']}</td>
                                    <td colspan="col-md-3" class="p-0 m-0">
                                        <div class="row g-3 mx-auto pt-2 pb-2">
                                            <svg id="${obj['departments'][j]['id']}" class="edit_icon col-md-6" width="20" 
                                                height="20" viewBox="0 0 45 45" fill="none" 
                                                data="icons/edit_icon.svg"
                                                style="cursor:pointer"
                                                onclick="location_info(this)">
                                                <path d="M31.575 5.11875C30.8438 5.11875 30.1313 5.4 29.5688 5.94375L25.5938 9.91875L35.5313 19.875L39.5063 15.9375C40.6313 14.7938 40.6313 13.0125 39.5063 11.925L33.5625 5.94375C33 5.4 32.2875 5.11875 31.575 5.11875ZM24.2625 11.25L9.075 26.4562L13.875 26.9813L14.2125 31.275L18.4875 31.5938L19.0312 36.3938L34.2188 21.1875M7.96875 28.2L4.6875 40.7438L17.25 37.3875L16.8 33.3375L12.4688 33.0188L12.1312 28.6688" fill="#5B5B5B"/>
                                            </svg>
                                            <svg id="${obj['departments'][j]['id']}" class="delete_icon col-md-6" width="20" 
                                                height="20" viewBox="0 0 45 45" fill="none" 
                                                data="icons/delete_icon.svg"
                                                style="cursor:pointer"
                                                onclick="delete_location(this)">
                                                <path d="M11.25 35.625C11.25 37.6875 12.9375 39.375 15 39.375H30C32.0625 39.375 33.75 37.6875 33.75 35.625V13.125H11.25V35.625ZM15.8625 22.275L18.5062 19.6313L22.5 23.6063L26.475 19.6313L29.1187 22.275L25.1437 26.25L29.1187 30.225L26.475 32.8688L22.5 28.8937L18.525 32.8688L15.8813 30.225L19.8563 26.25L15.8625 22.275ZM29.0625 7.5L27.1875 5.625H17.8125L15.9375 7.5H9.375V11.25H35.625V7.5H29.0625Z" fill="#EC2D2D"/>
                                            </svg>  
                                        </div>
                                    </td>
                                </tr>
                                            `
                            }
                            
                        
                    }
                    html+= `
                                    </table>
                                    </div>
                                </td>
                            </tr>`
                    }
                        }
                    }
                    table.innerHTML = html;
                
            }
            else
            {
                table_init();
            }
        }
    });
}