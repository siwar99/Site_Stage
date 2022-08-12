let choix = true;

function change() {
    let radio = document.getElementById("container ");
    if (choix == true) {
        config.style.backgroundColor = "grey";
        choix = false;


    } else {
        printer.style.backgroundColor = "grey";
    }
}
"use strict"
let myRequest = new Request("./did_database_v3.3.3.json");
fetch(myRequest)
    .then(function (resp) {
        return resp.json();

    })
    .then(function (data) {
        console.log(data);
    });
//function output(){
//let radio = document.getElementById ("MyF1");
//if 
//}
//$('#searchValue').on('click',function(){
// $.ajax({
//type : "POST",
//URL : 'did_database_v3.3.3.json',
// succes : function(data)
//  {
//    $('#MyF1').val(data);
//  },
//   });
//});


function click() {
    const target = document.getElementById("MyF1");
    if (target.style.display == true) {
        console.log(Request);
    }
};