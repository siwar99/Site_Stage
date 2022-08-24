var drf = {}
drf['PI5'] = '1.7'
drf['PI6'] = '2.1.1'
drf['PI7'] = '2.4.2'
drf['PI8'] = '2.5.2'
drf['PI11'] = '2.9.2'
drf['PI15'] = '3.3.2'

var dids = {}

// var container = document.getElementById("container");
// var data;
// var data=dids;
// var jsonGrid = new JSONGrid(data, container);
// jsonGrid.render();

function openPI(evt, pi) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

  var jsonGrid = new JSONGrid(dids[pi], document.getElementById(pi));
  

   document.getElementById(pi).style.display = "block";
     evt.currentTarget.className += " active";
}





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