let not_init = true;

function account_init(){
    var perem = localStorage.getItem('AccessLevel');
    
    console.log(perem);
}

function search_init(){
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');

    const params = "AL=" + Access_Level 
        + "&DID=" + Dep_ID;

    $.ajax({
        url: 'php/load_employee_search.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            let department_search = 
                document.getElementById('department_search');
            let rank_search = 
                document.getElementById('rank_search');
            let speciality_search = 
                document.getElementById('speciality_search');
            let html = "";
            html+=`<option selected disable>...</option>`;

            if(obj['departments']!=null){
                for(i=0; i < obj['departments'].length; i++){
                    html+=
                    `<option>${obj['departments'][i]['name']}</option>`;
                }
            }
            department_search.innerHTML = html;

            html = "";
            html+=`<option selected disable>...</option>`;
            if(obj['ranks']!=null){
                for(i=0; i < obj['ranks'].length; i++){
                    html+=
                    `<option>${obj['ranks'][i]['name']}</option>`;
                }
            }
            rank_search.innerHTML = html;

            html = "";
            html+=`<option selected disable>...</option>`;
            if(obj['specialities']!=null){
                for(i=0; i < obj['specialities'].length; i++){
                    html+=
                    `<option>${obj['specialities'][i]['name']}</option>`;
                }
            }
            speciality_search.innerHTML = html;
        } 

    });
    
}

function table_init(){
    let Access_Level = localStorage.getItem('AccessLevel');
    let Dep_ID = localStorage.getItem('DepartmentID');

    const params = "AL=" + Access_Level 
        + "&DID=" + Dep_ID;

    // console.log(params);
    
    $.ajax({
        url: 'php/load_combatant_table.php',
        method: 'post',
        dataType: 'json',
        data: params,
        success: function(obj){
            console.log(obj);

            let table = document.getElementById('table_body');
            let html = "";

            let table_date = document.getElementById('table_date');
            
            table_date.textContent = obj['datetime'];

            // for(i=0; i <obj['locations'].length; i++){
            //     html += 
            //     `<tr>
            //         <th colspan="4" style="background: #F37777; border: 1px solid #EC2D2D; color: #EBEBEB;">
            //             ${obj['locations'][i]['name']}
            //         </th>
            //     </tr>`
            //     for(j=0; j<obj['departments'].length; j++){
            //         if(obj['departments'][j]['location_id'] === 
            //             obj['locations'][i]['id'])
            //         {
            //             html +=
            //             `<tr>
            //                 <th colspan="4" style="background: #EEE2A3; border: 1px solid #978D5C;">
            //                     ${obj['departments'][j]['name']}
            //                 </th>
            //             </tr>`
            //         }
            //         if(obj['employees'] != null){
            //             for(k=0; k < obj['employees'].length; k++){
            //                 if(obj['employees'][k]['department_id'] === 
            //                     obj['departments'][j]['id'] &&
            //                     obj['departments'][j]['location_id'] === 
            //                     obj['locations'][i]['id'])
            //                 {
            //                     html += 
            //                     `<tr>
            //                         <td class="col-md-4">${(obj['employees'][k]['surname'] != 0) ? obj['employees'][k]['surname'] : ''} ${(obj['employees'][k]['name'] != 0) ? obj['employees'][k]['name']: ''} ${(obj['employees'][k]['patronymic'] != 0) ? obj['employees'][k]['patronymic'] : ''}</td>
            //                         <td class="col-md-4">${obj['employees'][k]['rank']}</td>
            //                         <td class="col-md-4">
            //                             <div class="row g-3 mx-auto pt-2 pb-2">
            //                                 <svg id="${obj['employees'][k]['id']}" class="info_icon col-md-4" width="30" 
            //                                     height="30" viewBox="0 0 45 45" fill="none" 
            //                                     data="icons/emp_info_icon.svg"
            //                                     style="cursor:pointer"
            //                                     onclick="employee_info(this)"
            //                                 >
            //                                     <path d="M16.875 22.5C19.1128 22.5 21.2589 21.6111 22.8412 20.0287C24.4236 18.4464 25.3125 16.3003 25.3125 14.0625C25.3125 11.8247 24.4236 9.67863 22.8412 8.09629C21.2589 6.51395 19.1128 5.625 16.875 5.625C14.6372 5.625 12.4911 6.51395 10.9088 8.09629C9.32645 9.67863 8.4375 11.8247 8.4375 14.0625C8.4375 16.3003 9.32645 18.4464 10.9088 20.0287C12.4911 21.6111 14.6372 22.5 16.875 22.5ZM2.8125 39.375C2.8125 39.375 0 39.375 0 36.5625C0 33.75 2.8125 25.3125 16.875 25.3125C30.9375 25.3125 33.75 33.75 33.75 36.5625C33.75 39.375 30.9375 39.375 30.9375 39.375H2.8125ZM30.9375 9.84375C30.9375 9.47079 31.0857 9.1131 31.3494 8.84938C31.6131 8.58566 31.9708 8.4375 32.3438 8.4375H43.5938C43.9667 8.4375 44.3244 8.58566 44.5881 8.84938C44.8518 9.1131 45 9.47079 45 9.84375C45 10.2167 44.8518 10.5744 44.5881 10.8381C44.3244 11.1018 43.9667 11.25 43.5938 11.25H32.3438C31.9708 11.25 31.6131 11.1018 31.3494 10.8381C31.0857 10.5744 30.9375 10.2167 30.9375 9.84375ZM32.3438 16.875C31.9708 16.875 31.6131 17.0232 31.3494 17.2869C31.0857 17.5506 30.9375 17.9083 30.9375 18.2812C30.9375 18.6542 31.0857 19.0119 31.3494 19.2756C31.6131 19.5393 31.9708 19.6875 32.3438 19.6875H43.5938C43.9667 19.6875 44.3244 19.5393 44.5881 19.2756C44.8518 19.0119 45 18.6542 45 18.2812C45 17.9083 44.8518 17.5506 44.5881 17.2869C44.3244 17.0232 43.9667 16.875 43.5938 16.875H32.3438ZM37.9688 25.3125C37.5958 25.3125 37.2381 25.4607 36.9744 25.7244C36.7107 25.9881 36.5625 26.3458 36.5625 26.7188C36.5625 27.0917 36.7107 27.4494 36.9744 27.7131C37.2381 27.9768 37.5958 28.125 37.9688 28.125H43.5938C43.9667 28.125 44.3244 27.9768 44.5881 27.7131C44.8518 27.4494 45 27.0917 45 26.7188C45 26.3458 44.8518 25.9881 44.5881 25.7244C44.3244 25.4607 43.9667 25.3125 43.5938 25.3125H37.9688ZM37.9688 33.75C37.5958 33.75 37.2381 33.8982 36.9744 34.1619C36.7107 34.4256 36.5625 34.7833 36.5625 35.1562C36.5625 35.5292 36.7107 35.8869 36.9744 36.1506C37.2381 36.4143 37.5958 36.5625 37.9688 36.5625H43.5938C43.9667 36.5625 44.3244 36.4143 44.5881 36.1506C44.8518 35.8869 45 35.5292 45 35.1562C45 34.7833 44.8518 34.4256 44.5881 34.1619C44.3244 33.8982 43.9667 33.75 43.5938 33.75H37.9688Z" fill="#5B5B5B"/>
            //                                 </svg>
            //                                 <svg id="${obj['employees'][k]['id']}" class="edit_icon col-md-4" width="30" 
            //                                     height="30" viewBox="0 0 45 45" fill="none" 
            //                                     data="icons/edit_icon.svg"
            //                                     style="cursor:pointer">
            //                                     <path d="M31.575 5.11875C30.8438 5.11875 30.1313 5.4 29.5688 5.94375L25.5938 9.91875L35.5313 19.875L39.5063 15.9375C40.6313 14.7938 40.6313 13.0125 39.5063 11.925L33.5625 5.94375C33 5.4 32.2875 5.11875 31.575 5.11875ZM24.2625 11.25L9.075 26.4562L13.875 26.9813L14.2125 31.275L18.4875 31.5938L19.0312 36.3938L34.2188 21.1875M7.96875 28.2L4.6875 40.7438L17.25 37.3875L16.8 33.3375L12.4688 33.0188L12.1312 28.6688" fill="#5B5B5B"/>
            //                                 </svg>
            //                                 <svg id="${obj['employees'][k]['id']}" class="delete_icon col-md-4" width="30" 
            //                                     height="30" viewBox="0 0 45 45" fill="none" 
            //                                     data="icons/delete_icon.svg"
            //                                     style="cursor:pointer">
            //                                     <path d="M11.25 35.625C11.25 37.6875 12.9375 39.375 15 39.375H30C32.0625 39.375 33.75 37.6875 33.75 35.625V13.125H11.25V35.625ZM15.8625 22.275L18.5062 19.6313L22.5 23.6063L26.475 19.6313L29.1187 22.275L25.1437 26.25L29.1187 30.225L26.475 32.8688L22.5 28.8937L18.525 32.8688L15.8813 30.225L19.8563 26.25L15.8625 22.275ZM29.0625 7.5L27.1875 5.625H17.8125L15.9375 7.5H9.375V11.25H35.625V7.5H29.0625Z" fill="#EC2D2D"/>
            //                                 </svg>  
            //                             </div>
            //                         </td>
            //                     </tr>`
            //                 }
            //             }
            //         }
            //     }
            // }
        
            // Со специальностью
            if(obj['locations']){
            for(i=0; i <obj['locations'].length; i++){
                if(obj['locations'][i]['deleted'] == 0){
                    html += 
                    `<tr>
                        <td colspan="4" style="background: #F37777; border: 1px solid #EC2D2D; color: #EBEBEB;">
                            <a style="cursor: default;">${obj['locations'][i]['name']}</a>
                            
                            
                        </td>
                    </tr>`
                }
                // + для красных
                // <svg id="${obj['locations'][i]['id']}" value="${obj['locations'][i]['name']}" class="add_emp_but float-end m-2" width="15" 
                //                 height="15" viewBox="0 0 27 27" fill="none" 
                //                 data="icons/plus_department.svg"
                //                 style="cursor:pointer"
                //                 onclick="add_location(this)">
                //                 <path d="M11.625 26.625V15.375H0.375V11.625H11.625V0.375H15.375V11.625H26.625V15.375H15.375V26.625H11.625Z" fill="#EC2D2D"/>
                //             </svg>
                if(obj['departments']){
                for(j=0; j<obj['departments'].length; j++){
                    if(obj['departments'][j]['location_id'] === 
                        obj['locations'][i]['id'] && 
                        obj['departments'][j]['deleted'] == 0)
                    {
                        html +=
                        `<tr>
                            <td colspan="4" style="background: #EEE2A3; border: 1px solid #978D5C; color: #212529;">
                                <a class="btn col-10 p-0" data-bs-toggle="collapse" 
                                data-bs-target="#row_dep_${j}"
                                aria-expanded="false" aria-controls="row_dep_${j}">${obj['departments'][j]['name']}</a>
                                
                            </td>
                        </tr>
                        <tr>
                        <td colspan="4" class="p-0 m-0" height="0">
                        <div class="collapse show m-0 p-0" height="0" id="row_dep_${j}">
                            <table class=" collapse show table justify-content-center table-sm table-bordered p-0 m-0">
                                    `
                    }
                    if(obj['employees']){
                    for(k=0; k < obj['employees'].length; k++){
                        if(obj['employees'][k]['department_id'] === 
                            obj['departments'][j]['id'] &&
                            obj['departments'][j]['location_id'] === 
                            obj['locations'][i]['id'] && 
                            obj['employees'][k]['deleted'] == 0)
                        {
                            html += 
                            `<tr>
                                <td class="col-md-3">${(obj['employees'][k]['name'] != 0) ? obj['employees'][k]['name']: ''}</td>
                                <td class="col-md-2">${(obj['employees'][k]['rank'] != 0) ? obj['employees'][k]['rank']: ''}</td>
                                <td class="col-md-3">${(obj['employees'][k]['speciality'] != null) ? obj['employees'][k]['speciality']: ''}</td>
                                <td class="col-md-2">${(obj['employees'][k]['status_name'] != null) ? obj['employees'][k]['status_name']: ''}</td>
                                <td class="col-md-2">
                                    <div class="row g-3 mx-auto pt-2 pb-2">
                                    <div class="col-12" title="Информация о сотруднике">
                                        <svg id="${obj['employees'][k]['id']}" class="info_icon" width="20" 
                                            height="20" viewBox="0 0 45 45" fill="none" 
                                            data="icons/emp_info_icon.svg"
                                            style="cursor:pointer"
                                            onclick="employee_info(this)"
                                          >
                                            <path d="M16.875 22.5C19.1128 22.5 21.2589 21.6111 22.8412 20.0287C24.4236 18.4464 25.3125 16.3003 25.3125 14.0625C25.3125 11.8247 24.4236 9.67863 22.8412 8.09629C21.2589 6.51395 19.1128 5.625 16.875 5.625C14.6372 5.625 12.4911 6.51395 10.9088 8.09629C9.32645 9.67863 8.4375 11.8247 8.4375 14.0625C8.4375 16.3003 9.32645 18.4464 10.9088 20.0287C12.4911 21.6111 14.6372 22.5 16.875 22.5ZM2.8125 39.375C2.8125 39.375 0 39.375 0 36.5625C0 33.75 2.8125 25.3125 16.875 25.3125C30.9375 25.3125 33.75 33.75 33.75 36.5625C33.75 39.375 30.9375 39.375 30.9375 39.375H2.8125ZM30.9375 9.84375C30.9375 9.47079 31.0857 9.1131 31.3494 8.84938C31.6131 8.58566 31.9708 8.4375 32.3438 8.4375H43.5938C43.9667 8.4375 44.3244 8.58566 44.5881 8.84938C44.8518 9.1131 45 9.47079 45 9.84375C45 10.2167 44.8518 10.5744 44.5881 10.8381C44.3244 11.1018 43.9667 11.25 43.5938 11.25H32.3438C31.9708 11.25 31.6131 11.1018 31.3494 10.8381C31.0857 10.5744 30.9375 10.2167 30.9375 9.84375ZM32.3438 16.875C31.9708 16.875 31.6131 17.0232 31.3494 17.2869C31.0857 17.5506 30.9375 17.9083 30.9375 18.2812C30.9375 18.6542 31.0857 19.0119 31.3494 19.2756C31.6131 19.5393 31.9708 19.6875 32.3438 19.6875H43.5938C43.9667 19.6875 44.3244 19.5393 44.5881 19.2756C44.8518 19.0119 45 18.6542 45 18.2812C45 17.9083 44.8518 17.5506 44.5881 17.2869C44.3244 17.0232 43.9667 16.875 43.5938 16.875H32.3438ZM37.9688 25.3125C37.5958 25.3125 37.2381 25.4607 36.9744 25.7244C36.7107 25.9881 36.5625 26.3458 36.5625 26.7188C36.5625 27.0917 36.7107 27.4494 36.9744 27.7131C37.2381 27.9768 37.5958 28.125 37.9688 28.125H43.5938C43.9667 28.125 44.3244 27.9768 44.5881 27.7131C44.8518 27.4494 45 27.0917 45 26.7188C45 26.3458 44.8518 25.9881 44.5881 25.7244C44.3244 25.4607 43.9667 25.3125 43.5938 25.3125H37.9688ZM37.9688 33.75C37.5958 33.75 37.2381 33.8982 36.9744 34.1619C36.7107 34.4256 36.5625 34.7833 36.5625 35.1562C36.5625 35.5292 36.7107 35.8869 36.9744 36.1506C37.2381 36.4143 37.5958 36.5625 37.9688 36.5625H43.5938C43.9667 36.5625 44.3244 36.4143 44.5881 36.1506C44.8518 35.8869 45 35.5292 45 35.1562C45 34.7833 44.8518 34.4256 44.5881 34.1619C44.3244 33.8982 43.9667 33.75 43.5938 33.75H37.9688Z" fill="#5B5B5B"/>
                                        </svg> 
                                        </div>
                                    </div>
                                </td>
                            </tr>`
                        }
                    }
                    
                }
                html+= `
                        </table>
                        </div>
                    </td>
                </tr>`
            }}
                }
            }
            table.innerHTML = html;
        }
    });
}

function init(){

    if(not_init){
        account_init();
        table_init();
        search_init();
        not_init = false;
    }
};