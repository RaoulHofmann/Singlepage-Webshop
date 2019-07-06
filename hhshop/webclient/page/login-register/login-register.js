function login(){
    var formData = new FormData();
    formData.append('username',document.getElementsByName("username")[0].value);
    formData.append('password',document.getElementsByName("password")[0].value);
    formData.append('login', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if(myObj.login == true){
                window.location = '../home/home.htm?login=true';
            } else {
                loginError();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function register() {

    if (document.getElementById("newusername") != null){
        var adminAdd = true;
        var username = document.getElementById("newusername").value;
        var isadmin = document.getElementById("newisadmin").value;
        var firstname = document.getElementById("newfirstname").value;
        var lastname = document.getElementById("newlastname").value;
        var email = document.getElementById("newemail").value;
        var street = document.getElementById("newstreet").value;
        var postcode = document.getElementById("newpostcode").value;
        var city = document.getElementById("newcity").value;
        var password = document.getElementById("newpassword").value;
        var password2 = document.getElementById("newpassword2").value;
        var country = document.getElementById("newcountry").value;

        if (password != password2 && password != null) {
            var errormsg = document.getElementById("errormsg");
            errormsg.innerHTML = "Passwords do not match";
            errormsg.style.color = "red";
        } else {
            var formData = new FormData();
            formData.append('username', username);
            formData.append('isadmin', isadmin);
            formData.append('password', password);
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('street', street);
            formData.append('postcode', postcode);
            formData.append('city', city);
            formData.append('country', country);

            formData.append('register', true);
        }
    } else {
        var adminAdd = false;
        var username = document.getElementsByName("registerusername")[0].value;
        var firstname = document.getElementsByName("firstname")[0].value;
        var lastname = document.getElementsByName("lastname")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var street = document.getElementsByName("street")[0].value;
        var postcode = document.getElementsByName("postcode")[0].value;
        var city = document.getElementsByName("city")[0].value;
        var password = document.getElementsByName("registerpassword")[0].value;
        var password2 = document.getElementsByName("registerpassword2")[0].value;
        var country = document.getElementById("country").options[document.getElementById("country").selectedIndex].value;

        if (password != password2 && password != null) {
            var errormsg = document.getElementById("errormsg");
            errormsg.innerHTML = "Passwords do not match";
            errormsg.style.color = "red";
        } else {
            var formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('email', email);
            formData.append('street', street);
            formData.append('postcode', postcode);
            formData.append('city', city);
            formData.append('country', country);

            formData.append('register', true);
        }
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if (myObj.login == true && adminAdd == false) {
                window.location = '../home/home.htm?login=true';
            } else if(myObj.login == false && adminAdd == false){
                loginError();
            } else if(myObj.register == true && adminAdd == true){
                userAdmin();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function loginError() {
    var errorBox = document.getElementsByClassName("alert");
    document.getElementsByName("username")[0].value = '';
    document.getElementsByName("password")[0].value = '';

    errorBox[0].style.display="block";
}

function checkLogin(){
    var loginSection = document.getElementById("section login");
    var registerSection = document.getElementById("section register");
    var loggedInSection = document.getElementById("section logged in");
    var productAdmin = document.getElementById("productAdmin");
    var productAdminSection = document.getElementById("section productAdmin").className = "hidden";
    var userAdmin = document.getElementById("userAdmin");
    var userAdminSection = document.getElementById("section userAdmin").className = "hidden";
    var addUserAdminSection = document.getElementById("section addUser").className = "hidden";
    var addUser = document.getElementById("addUser").className = "hidden";

    var formData = new FormData();
    formData.append('check', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if(myObj.login == true){
                registerSection.className = "hidden";
                loginSection.className = "hidden";
                loggedInSection.className = "section logged in";
                if(myObj.isadmin == true){
                    productAdmin.className = "productAdmin";
                    userAdmin.className = "userAdmin";
                }
                accountInfo();
            } else {
                fillCountry();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function logout(){
    var formData = new FormData();
    formData.append('logout', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if(myObj.logged == false){
               window.location = 'login-register.htm';
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function accountInfo() {
    var formData = new FormData();
    formData.append('account', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var form = document.getElementById("updateUser");
            document.getElementsByName("updateUsername")[0].value = myObj.username;
            document.getElementsByName("updateFirstname")[0].value = myObj.first_name;
            document.getElementsByName("updateLastname")[0].value = myObj.last_name;
            document.getElementsByName("updateEmail")[0].value = myObj.email;
            document.getElementsByName("updateStreet")[0].value = myObj.street;
            document.getElementsByName("updatePostcode")[0].value = myObj.postcode;
            document.getElementsByName("updateCity")[0].value = myObj.city;
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function productAdmin() {
    var loggedInSection = document.getElementById("section logged in");
    var productAdminSection = document.getElementById("section productAdmin");
    var productAdmin = document.getElementById("addProduct");
    var addProductAdminSection = document.getElementById("section addProduct");

    var backAccount = document.getElementById("backAccountProduct");

    loggedInSection.className = "hidden";
    addProductAdminSection.className = "hidden";
    productAdminSection.className = "section productAdmin";
    productAdmin.className = "productAdmin";
    backAccount.className = "backAccount";

    var table = document.getElementById("productTable");
    table.innerHTML="";

    var formData = new FormData();
    formData.append('getAllProducts', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (i = 0; i < myObj.length; i++) {
                tr = table.insertRow()
                td = tr.insertCell()
                td.innerHTML += '<label for="productName-'+myObj[i].productID+'">Product Name: </label>  ';
                td.innerHTML += '<input type="text" id="productName-'+myObj[i].productID+'" value="'+myObj[i].name+'"/> ';
                td.innerHTML += '<label for="productDesc-'+myObj[i].productID+'">Product Description: </label>  ';
                td.innerHTML += '<input type="text" id="productDesc-'+myObj[i].productID+'" value="'+myObj[i].description+'"/> ';
                td.innerHTML += '<label for="productQuant-'+myObj[i].productID+'">Product Quantity: </label>  ';
                td.innerHTML += '<input type="text" id="productQuant-'+myObj[i].productID+'" value="'+myObj[i].quantity+'"/> ';
                td.innerHTML += '<label for="productColor-'+myObj[i].productID+'">Product Color: </label>  ';
                td.innerHTML += '<input type="text" id="productColor-'+myObj[i].productID+'" value="'+myObj[i].color+'"/> ';
                td.innerHTML += '<label for="productPrice-'+myObj[i].productID+'">Product Price ($): </label>  ';
                td.innerHTML += '<input type="text" id="productPrice-'+myObj[i].productID+'" value="'+myObj[i].price+'"/> ';
                td.innerHTML += '<label for="productBrand-'+myObj[i].productID+'">Product Brand: </label>  ';
                td.innerHTML += '<input type="text" id="productBrand-'+myObj[i].productID+'" value="'+myObj[i].brandID+'"/> ';
                td.innerHTML += '<label for="productCat-'+myObj[i].productID+'">Product Category: </label>   ';
                td.innerHTML += '<input type="text" id="productCat-'+myObj[i].productID+'" value="'+myObj[i].catID+'"/> ';
                td.innerHTML += '<label for="productImg-'+myObj[i].productID+'">Product Image: </label>   ';
                td.innerHTML += '<input type="text" id="productImg-'+myObj[i].productID+'" value="'+myObj[i].image+'"/> ';
                tr = table.insertRow()
                td = tr.insertCell()
                td.innerHTML += '<div style="text-align:center;"><input type="button" id="updateProduct" value="Update Product ('+myObj[i].productID+')" onclick="javascript:updateProduct('+myObj[i].productID+')"/></div>';
                td.innerHTML += '<div style="text-align:center;"><input type="button" id="deleteProduct" value="Delete Product ('+myObj[i].productID+')" onclick="javascript:deleteProduct('+myObj[i].productID+')"/></div>';
                td.innerHTML += '<div style="text-align:center;"><p style="color: red; display: none" id="msg-'+myObj[i].productID+'"></p></div><hr/>'
                tr = table.insertRow()
            }

        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function updateProduct(productID) {
    var productName = document.getElementById("productName-"+productID).value;
    var productDesc = document.getElementById("productDesc-"+productID).value;
    var productQuant = document.getElementById("productQuant-"+productID).value;
    var productColor = document.getElementById("productColor-"+productID).value;
    var productPrice = document.getElementById("productPrice-"+productID).value;
    var productBrand = document.getElementById("productBrand-"+productID).value;
    var productCat = document.getElementById("productCat-"+productID).value;
    var productImg = document.getElementById("productImg-"+productID).value;

    var formData = new FormData();
    formData.append('productID', productID);
    formData.append('productName', productName);
    formData.append('productDesc', productDesc);
    formData.append('productQuant', productQuant);
    formData.append('productColor', productColor);
    formData.append('productPrice', productPrice);
    formData.append('productBrand', productBrand);
    formData.append('productCat', productCat);
    formData.append('productImg', productImg);

    formData.append('updateProduct', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if(myObj == true){
                document.getElementById("msg-"+productID).style.display="block";
                document.getElementById("msg-"+productID).innerHTML = "Updated";
            } else {
                document.getElementById("msg-"+productID).style.display="block";
                document.getElementById("msg-"+productID).innerHTML = "Update Error";
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function deleteProduct(productID) {
    var formData = new FormData()
    formData.append('productID', productID);

    formData.append('deleteProduct', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if(myObj == true){
                document.getElementById("msg-"+productID).style.display="block";
                document.getElementById("msg-"+productID).innerHTML = "Deleted";
            } else {
                document.getElementById("msg-"+productID).style.display="block";
                document.getElementById("msg-"+productID).innerHTML = "Delete Error";
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function addProductSection() {
    var loggedInSection = document.getElementById("section logged in");
    var productAdminSection = document.getElementById("section productAdmin");
    var addProductAdminSection = document.getElementById("section addProduct");
    var backProductAdmin = document.getElementById("backProductAdmin");

    loggedInSection.className = "hidden";
    productAdminSection.className = "hidden";
    addProductAdminSection.className = "section addProductAdmin";
    backProductAdmin.className = "backProductAdmin";

    var table = document.getElementById("addProductTable");
    table.innerHTML="";

    tr = table.insertRow()
    td = tr.insertCell()
    td.innerHTML += '<label for="productName">Product Name: </label><input type="text" id="productName" placeholder="Name"/><br/>';
    td.innerHTML += '<label for="productDesc">Product Description: </label><input type="text" id="productDesc" placeholder="Description"/><br/>';
    td.innerHTML += '<label for="productQuant">Product Quantity: </label><input type="text" id="productQuant" placeholder="Quantity"/><br/>';
    td.innerHTML += '<label for="productColor">Product Color: </label><input type="text" id="productColor" placeholder="Color"/><br/>';
    td.innerHTML += '<label for="productPrice">Product Price: </label><input type="text" id="productPrice" placeholder="Price"/><br/>';
    td.innerHTML += '<label for="productBrand">Product Brand: </label><input type="text" id="productBrand" placeholder="Brand"/><br/>';
    td.innerHTML += '<label for="productCat">Product Category: </label><input type="text" id="productCat" placeholder="Category"/><br/>';
    td.innerHTML += '<label for="productImg">Product Image: </label><input type="text" id="productImg" placeholder="Image"/><br/>';
    tr = table.insertRow()
    td = tr.insertCell()
    td.innerHTML += '<div style="text-align:center;"><input type="button" id="addProduct" value="ADD PRODUCT" onclick="javascript:addProduct()"/></div>';
    tr = table.insertRow()
}

function addProduct() {
    var productName = document.getElementById("productName").value;
    var productDesc = document.getElementById("productDesc").value;
    var productQuant = document.getElementById("productQuant").value;
    var productColor = document.getElementById("productColor").value;
    var productPrice = document.getElementById("productPrice").value;
    var productBrand = document.getElementById("productBrand").value;
    var productCat = document.getElementById("productCat").value;
    var productImg = document.getElementById("productImg").value;

    var formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDesc', productDesc);
    formData.append('productQuant', productQuant);
    formData.append('productColor', productColor);
    formData.append('productPrice', productPrice);
    formData.append('productBrand', productBrand);
    formData.append('productCat', productCat);
    formData.append('productImg', productImg);

    formData.append('addProduct', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)
            var myObj = JSON.parse(this.responseText);
            if(myObj == true){
                productAdmin();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function userAdmin() {
    var loggedInSection = document.getElementById("section logged in");
    var userAdminSection = document.getElementById("section userAdmin");
    var addUserAdminSection = document.getElementById("section addUser");
    var addUser = document.getElementById("addUser");
    var backAccount = document.getElementById("backAccountUser");

    loggedInSection.className = "hidden";
    addUserAdminSection.className = "hidden";
    userAdminSection.className = "section userAdmin";
    backAccount.className = "backAccount";
    addUser.className = "addUser";

    var table = document.getElementById("userTable");
    table.innerHTML="";

    var formData = new FormData();
    formData.append('getAllUsers', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (i = 0; i < myObj.length; i++) {
                tr = table.insertRow()
                td = tr.insertCell()
                td.innerHTML += '<label for="username-'+myObj[i].userID+'">Username</label>  ';
                td.innerHTML += '<input type="text" id="username-'+myObj[i].userID+'" value="'+myObj[i].username+'"/> ';
                td.innerHTML += '<label for="Password-'+myObj[i].userID+'">Password</label>  ';
                td.innerHTML += '<input type="text" id="password-'+myObj[i].userID+'" placeholder="Password"/> ';
                td.innerHTML += '<label for="firstname-'+myObj[i].userID+'">Firstname</label>  ';
                td.innerHTML += '<input type="text" id="firstname-'+myObj[i].userID+'" value="'+myObj[i].first_name+'"/> ';
                td.innerHTML += '<label for="isadmin-'+myObj[i].userID+'">isAdmin</label>  ';
                td.innerHTML += '<input type="text" id="isadmin-'+myObj[i].userID+'" value="'+myObj[i].isAdmin+'"/> ';
                td.innerHTML += '<label for="lastname-'+myObj[i].userID+'">Lastname</label>  ';
                td.innerHTML += '<input type="text" id="lastname-'+myObj[i].userID+'" value="'+myObj[i].last_name+'"/> ';
                td.innerHTML += '<label for="email-'+myObj[i].userID+'">Email</label>  ';
                td.innerHTML += '<input type="text" id="email-'+myObj[i].userID+'" value="'+myObj[i].email+'"/> ';
                td.innerHTML += '<label for="street-'+myObj[i].userID+'">Street</label>   ';
                td.innerHTML += '<input type="text" id="street-'+myObj[i].userID+'" value="'+myObj[i].street+'"/> ';
                td.innerHTML += '<label for="postcode-'+myObj[i].userID+'">Postcode</label>   ';
                td.innerHTML += '<input type="text" id="postcode-'+myObj[i].userID+'" value="'+myObj[i].postcode+'"/> ';
                td.innerHTML += '<label for="city-'+myObj[i].userID+'">City</label>   ';
                td.innerHTML += '<input type="text" id="city-'+myObj[i].userID+'" value="'+myObj[i].city+'"/> ';
                td.innerHTML += '<label for="country-'+myObj[i].userID+'">Country</label>   ';
                td.innerHTML += '<input type="text" id="country-'+myObj[i].userID+'" value="'+myObj[i].country+'"/> ';
                tr = table.insertRow()
                td = tr.insertCell()
                td.innerHTML += '<div style="text-align:center;"><input type="button" id="updateUser" value="Update User ('+myObj[i].userID+')" onclick="javascript:updateUser('+myObj[i].userID+')"/></div>';
                td.innerHTML += '<div style="text-align:center;"><input type="button" id="deleteUser" value="Delete User ('+myObj[i].userID+')" onclick="javascript:deleteUser('+myObj[i].userID+')"/></div>';
                td.innerHTML += '<div style="text-align:center;"><p style="color: red; display: none" id="usermsg-'+myObj[i].userID+'"></p></div><hr/>'
                tr = table.insertRow()
            }

        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function addUserSection(){
    var loggedInSection = document.getElementById("section logged in");
    var userAdminSection = document.getElementById("section userAdmin");
    var addUserSection = document.getElementById("section addUser");
    var backUserAdmin = document.getElementById("backUserAdmin");

    loggedInSection.className = "hidden";
    userAdminSection.className = "hidden";
    addUserSection.className = "section addUser";
    backUserAdmin.className = "backUserAdmin";

    var table = document.getElementById("addUserTable");
    table.innerHTML="";

    tr = table.insertRow()
    td = tr.insertCell()
    td.innerHTML += '<label for="newusername">Username: </label><input type="text" id="newusername" placeholder="Username"/><br/>';
    td.innerHTML += '<label for="newisadmin">isAdmin: </label><input type="text" id="newisadmin" placeholder="isAdmin"/><br/>';
    td.innerHTML += '<label for="newpassword">Password: </label><input type="text" id="newpassword" placeholder="Password"/><br/>';
    td.innerHTML += '<label for="newpassword2">Confirm Password: </label><input type="text" id="newpassword2" placeholder="Confirm Password"/><br/>';
    td.innerHTML += '<label for="newfirstname">First Name: </label><input type="text" id="newfirstname" placeholder="First Name"/><br/>';
    td.innerHTML += '<label for="newlastname">Last Name: </label><input type="text" id="newlastname" placeholder="Last Name"/><br/>';
    td.innerHTML += '<label for="newemail">Email: </label><input type="text" id="newemail" placeholder="Email"/><br/>';
    td.innerHTML += '<label for="newstreet">Street: </label><input type="text" id="newstreet" placeholder="Street"/><br/>';
    td.innerHTML += '<label for="newpostcode">Postcode: </label><input type="text" id="newpostcode" placeholder="Postcode"/><br/>';
    td.innerHTML += '<label for="newcity">City: </label><input type="text" id="newcity" placeholder="City"/><br/>';
    td.innerHTML += '<label for="newcountry">Country: </label><input type="text" id="newcountry" placeholder="Country"/><br/>';
    tr = table.insertRow()
    td = tr.insertCell()
    td.innerHTML += '<div style="text-align:center;"><input type="button" id="addUser" value="ADD USER" onclick="javascript:register()"/></div>';
    tr = table.insertRow()
}

function updateError(errorMsg) {
    var updateAlert = document.getElementsByClassName("updateAlert");
    updateAlert[0].innerHTML = errorMsg;
    document.getElementsByName("updatePassword")[0].value = '';
    document.getElementsByName("updatePassword2")[0].value = '';

    updateAlert[0].style.display="block";
}

function updateSuccess() {
    var updateSuccess = document.getElementsByClassName("success");

    updateSuccess[0].style.display="block";
}

function updateUser(userID) {
    if(userID == null) {
        var adminChange = false;
        if (document.getElementsByName("updatePassword")[0].value == document.getElementsByName("updatePassword2")[0].value) {
            var formData = new FormData();
            formData.append('username', document.getElementsByName("updateUsername")[0].value);
            formData.append('password', document.getElementsByName("updatePassword")[0].value);
            formData.append('firstname', document.getElementsByName("updateFirstname")[0].value);
            formData.append('lastname', document.getElementsByName("updateLastname")[0].value);
            formData.append('email', document.getElementsByName("updateEmail")[0].value);
            formData.append('street', document.getElementsByName("updateStreet")[0].value);
            formData.append('postcode', document.getElementsByName("updatePostcode")[0].value);
            formData.append('city', document.getElementsByName("updateCity")[0].value);

            formData.append('updateAccount', true);
            adminChange
        } else {
            updateError("Entered Passwords do not match");
        }
    } else {
        adminChange = true;

        var formData = new FormData();
        formData.append('userid', userID);
        formData.append('username', document.getElementById("username-"+userID).value);
        formData.append('isadmin', document.getElementById("isadmin-"+userID).value);
        formData.append('password', document.getElementById("password-"+userID).value);
        formData.append('firstname', document.getElementById("firstname-"+userID).value);
        formData.append('lastname', document.getElementById("lastname-"+userID).value);
        formData.append('email', document.getElementById("email-"+userID).value);
        formData.append('street', document.getElementById("street-"+userID).value);
        formData.append('postcode', document.getElementById("postcode-"+userID).value);
        formData.append('city', document.getElementById("city-"+userID).value);

        formData.append('updateAccount', true);
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if (myObj == true && adminChange == false) {
                updateSuccess();
            } else if(myObj == false && adminChange == false){
                updateError("Update error");
            } else if (myObj == true && adminChange == true) {
                document.getElementById("usermsg-"+userID).style.display="block";
                document.getElementById("usermsg-"+userID).innerHTML = "Updated";
            } else if(myObj == false && adminChange == true){
                document.getElementById("usermsg-"+userID).style.display="block";
                document.getElementById("usermsg-"+userID).innerHTML = "update Error";
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function deleteUser(userID) {
    var formData = new FormData()
    formData.append('userID', userID);

    formData.append('deleteUser', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if(myObj == true){
                document.getElementById("usermsg-"+userID).style.display="block";
                document.getElementById("usermsg-"+userID).innerHTML = "Deleted";
            } else {
                document.getElementById("usermsg-"+userID).style.display="block";
                document.getElementById("usermsg-"+userID).innerHTML = "Delete Error";
            }
        }
    };
    xmlhttp.open("POST", "../../../server/login-register.php", true);
    xmlhttp.send(formData);
}

function fillCountry(){
    var formData = new FormData();
    formData.append('getList', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var country = document.getElementById("country");
            for (i = 0; i < myObj.length; i++) {
                if(myObj[i] == "Australia"){
                    country.innerHTML += '<option selected value='+myObj[i]+'>'+myObj[i]+'</option>';
                } else {
                    country.innerHTML += '<option value='+myObj[i]+'>'+myObj[i]+'</option>';
                }
            }
        }
    };
    xmlhttp.open("POST", "../../../server/geo.php", true);
    xmlhttp.send(formData);
}

function search(){
    var searchdata = document.getElementsByName("search")[0].value;
    window.location = '../shop/shop.htm?search='+searchdata;
}