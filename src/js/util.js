// var table = document.getElementById('table_body_id');

// Сохраняем значение скролла в Local Storage при прокрутке
document.getElementById('table_body_id').addEventListener('scroll', function() {
  localStorage.setItem('tableEmpScrollPosition', document.getElementById('table_body_id'));
//   console.log("Вниз");
});


function getStringBeforeSpace(str) 
{
    const spaceIndex = str.indexOf(' ');
    if (spaceIndex === -1) {
        return str;
    }
    return str.substr(0, spaceIndex);
}

function getSecondName(str)
{
    const firstspaceIndex = str.indexOf(' ');
    if (firstspaceIndex === -1) {
        return "";
    }
    return str.substr(0, firstspaceIndex);

}

function getFirstName(str){
    const firstSpaceIndex = str.indexOf(' ');
    let sub = str.substr(firstSpaceIndex, str.length);
    if (firstSpaceIndex === -1) {
        return "";
    }

    const secondSpaceIndex = sub.indexOf(' ')
    if (secondSpaceIndex === -1) {
        return "";
    }
    return sub.substr(0, secondSpaceIndex);

}

function getThirdName(str){
    const firstSpaceIndex = str.indexOf(' ');
    let sub = str.substr(firstSpaceIndex, str.length);
    if (firstSpaceIndex === -1) {
        return "";
    }

    const secondSpaceIndex = sub.indexOf(' ')
    if (secondSpaceIndex === -1) {
        return "";
    }
    return sub.substr(secondSpaceIndex, sub.length);
}