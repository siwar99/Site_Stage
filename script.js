"use strict"
let myRequest = new Request("./did_database_v3.3.3.json");
fetch(myRequest)
    .then(
        function (resp) {
            return resp.json();

        })
    .then(
        function (data) {
            console.log(data);
        });
       
        

function openPage(evt, pageName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent_up");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // remove the active style
    tablinks = document.getElementsByClassName("tablink_up");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}