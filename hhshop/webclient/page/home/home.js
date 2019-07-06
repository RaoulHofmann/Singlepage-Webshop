function checkLogin(){
    var urlParams = new URLSearchParams(window.location.search);
    var logged = urlParams.get('login');
    var success = document.getElementsByClassName("success");

    if(logged == "true"){
        loginSuccess();
    }
}

function loginSuccess(){
    var success = document.getElementsByClassName("success");

    var formData = new FormData();
    formData.append('check', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            console.log(myObj);
            if(myObj.login == true){
                success[0].style.display="block";
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function search(){
    var searchdata = document.getElementsByName("search")[0].value;
    window.location = '../shop/shop.htm?search='+searchdata;
}