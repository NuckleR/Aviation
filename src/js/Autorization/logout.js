function logout(){

    $.ajax({
        url: 'php/logout.php',
        method: 'post',
        dataType: 'json',
        data: 0,
        success: function(obj){
            console.log(obj);
            if(obj['logout_success']=== true){
               
                document.location.href = 'index.php';
            }
        }
    });
}