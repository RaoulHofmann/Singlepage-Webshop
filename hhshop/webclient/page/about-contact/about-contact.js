function getPage(){
    var urlParams = location.hash;
    urlParams = location.hash.substr(1);
    //console.log(urlParams);
    var aboutComp = document.getElementById("about_company");
    var aboutTeam = document.getElementById("about_team");
    var contact = document.getElementById("contact");
    var aboutLink = document.getElementById("aboutLink");
    var contactLink = document.getElementById("contactLink");

    aboutComp.className = "hidden";
    aboutTeam.className = "hidden";
    contact.className = "hidden";
    contactLink.className = "";
    aboutLink.className = "";

    document.title = urlParams;

    if(urlParams == 'about'){
        document.title = "About";
        aboutComp.className = "about_company";
        aboutTeam.className = "about_team";
        aboutLink.className = "active";
    } else if(urlParams == 'contact') {
        document.title = "Contact";
        contact.className = "contact";
        contactLink.className = "active";
    }

}

function search(){
    var searchdata = document.getElementsByName("search")[0].value;
    window.location = '../shop/shop.htm?search='+searchdata;
}