function printProducts(category) {
    var table = document.getElementById("productTable");
    table.innerHTML="";

    var xmlhttp = new XMLHttpRequest();
    count = 0;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            for (i = 0; i < myObj.length; i++) {
                if(count == 0){
                    tr = table.insertRow()
                }
                td = tr.insertCell()
                    td.innerHTML += '<img src="../../img/'+myObj[i].image+'.jpg"/><br/>';
                    td.innerHTML += myObj[i].name+'<br/>';
                    td.innerHTML += '<b>$'+myObj[i].price+'.00</b><br/>';
                    td.innerHTML += '<button class="addProductToCart"  onclick="javascript:addProductToCart('+myObj[i].productID+')"> <i class="fa fa-cart-plus" style="font-size:24px;color: #c39d6d;" ></i> </input>';
                count++;
                if(count == 3){
                    count = 0;
                }
            }

        }
    };
    xmlhttp.open("GET", "../../../server/product.php?category="+category+"&displayCat=1", true);
    xmlhttp.setRequestHeader("Content-type", "application/json")
    xmlhttp.send();
}

function getProducts() {
    var urlParams = location.hash;
    urlParams = location.hash.substr(1);

    var keyboardLink = document.getElementById("keyboardLink");
    var mouseLink = document.getElementById("mouseLink");
    var comboLink = document.getElementById("comboLink");

    keyboardLink.className = "";
    mouseLink.className = "";
    comboLink.className = "";
    if (window.location.search.substr(1,6) == 'search'){
        document.title = "Search";
        if(window.location.search.split('=')[1] == null){
            var searchdata = document.getElementsByName("search")[0].value;
        } else {
            var searchdata = window.location.search.split('=')[1]
        }
        document.getElementById("shop-list").className = "shop-list";
        searchProduct(searchdata);
    } else {
        printProducts(urlParams);

        if (urlParams == 1) {
            comboLink.className = "active";
            document.title = "Combo";
            document.getElementById("shop-list").className = "shop-list";
            document.getElementById("checkout").className = "hidden";
        } else if (urlParams == 2) {
            keyboardLink.className = "active";
            document.title = "Keyboard";
            document.getElementById("shop-list").className = "shop-list";
            document.getElementById("checkout").className = "hidden";
        } else if (urlParams == 3) {
            mouseLink.className = "active";
            document.title = "Mouse";
            document.getElementById("shop-list").className = "shop-list";
            document.getElementById("checkout").className = "hidden";
        } else if(urlParams == "cart") {
            document.title = "Cart";
            document.getElementById("checkout").className = "checkout";
            getCart();
            //document.getElementById("shop-list").className = "hidden";
        }
    }
}

function getCart() {
    formData = new FormData();
    formData.append('getCart', true);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            var table = document.getElementById("checkoutTable");
            table.innerHTML="";
            header = table.createTHead();
            row = header.insertRow();
            cell = row.insertCell();
            cell.innerHTML = "Name"
            cell = row.insertCell();
            cell.innerHTML = "Quantity";
            cell = row.insertCell();
            cell.innerHTML = "Price"
            document.getElementById("carttotal").innerHTML = "$ "+myObj[0].total+".00";
            for (i = 1; i < myObj.length; i++) {
                tr = table.insertRow()
                td = tr.insertCell()
                td.innerHTML = myObj[i].name;
                td = tr.insertCell()
                td.innerHTML = '<input type="text" class="checkoutQuantity" id="checkoutQuant-'+myObj[i].productID+'" value="'+myObj[i].quantity+'"/>';
                td = tr.insertCell()
                td.innerHTML = '$'+myObj[i].price+'.00';
                td = tr.insertCell()
                td.innerHTML = '<input type="button" class="deleteItem" id="deleteItem-'+myObj[i].productID+'" value="Delete Item" onclick="javascript:deleteItem('+myObj[0].orderID+','+myObj[i].productID+')"/>';
                td.innerHTML += '<input type="button" class="updateItem" id="updateItem-'+myObj[i].productID+'" value="Update Item" onclick="javascript:updateItem('+myObj[0].orderID+','+myObj[i].productID+')"/>';
                tr = table.insertRow()
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function addProductToCart(productID) {
    formData = new FormData();
    formData.append('add', productID);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var myObj = JSON.parse(this.responseText);
            if (myObj != null) {
                alert("Product "+productID+" added to Cart");
                getCart(myObj.orderID);
            } else {
                alert("You need to be logged in to use Cart");
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function deleteItem(orderID, productID) {
    formData = new FormData();
    formData.append('deleteItem', true);
    formData.append('orderID', orderID);
    formData.append('productID', productID);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if(myObj == true){
                getCart();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function updateItem(orderID, productID) {
    formData = new FormData();
    formData.append('updateItem', true);
    formData.append('orderID', orderID);
    formData.append('productID', productID);
    formData.append('quantity', document.getElementById("checkoutQuant-"+productID).value);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if(myObj != null){
                getCart();
            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}

function search(){
    var searchdata = document.getElementsByName("search")[0].value;
    window.location = '../shop/shop.htm?search='+searchdata;
}

function searchProduct(searchdata) {
    var xmlhttp = new XMLHttpRequest();
    count = 0;
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            var table = document.getElementById("productTable");
            table.innerHTML="";

            for (i = 0; i < myObj.length; i++) {
                if(count == 0){
                    tr = table.insertRow()
                }
                td = tr.insertCell()
                td.innerHTML += '<img src="../../img/'+myObj[i].image+'.jpg"/><br/>';
                td.innerHTML += myObj[i].name+'<br/>';
                td.innerHTML += '<b>$'+myObj[i].price+'.00</b><br/>';
                td.innerHTML += '<a href="#add-'+myObj[i].productID+'"><i class="fa fa-cart-plus" style="font-size:24px;color: #c39d6d;"></i></a>';
                count++;
                if(count == 3){
                    count = 0;
                }
            }
        }
    };
    xmlhttp.open("GET", "../../../server/product.php?search="+searchdata, true);
    xmlhttp.send();
}

function fillAddress() {
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var street = document.getElementById("street");
    var postcode = document.getElementById("postcode");
    var city = document.getElementById("city");

    if(document.getElementById("sameAddress").checked == true){
        formData = new FormData();
        formData.append('fillAddress', true);

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myObj = JSON.parse(this.responseText);
                if(myObj != null){
                    firstname.value = myObj.first_name;
                    lastname.value =  myObj.last_name;
                    email.value =  myObj.email;
                    street.value =  myObj.street;
                    postcode.value =  myObj.postcode;
                    city.value =  myObj.city;
                }
            }
        };
        xmlhttp.open("POST", "../../../server/product.php", true);
        xmlhttp.send(formData);
    } else {
        firstname.value = '';
        lastname.value = '';
        email.value = '';
        street.value = '';
        postcode.value = '';
        city.value = '';
    }
}

function checkOut() {
    var firstname = document.getElementById("firstname");
    var lastname = document.getElementById("lastname");
    var email = document.getElementById("email");
    var phone = document.getElementById("phone");
    var street = document.getElementById("street");
    var postcode = document.getElementById("postcode");
    var city = document.getElementById("city");

    formData = new FormData();
    formData.append('checkOut', true);
    formData.append('firstname', firstname.value);
    formData.append('lastname', lastname.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('street', street.value);
    formData.append('postcode', postcode.value);
    formData.append('city', city.value);


    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            if (myObj == true) {
                document.getElementById("checkOutMsg").innerHTML = "Order Sent";
                document.getElementById("checkOutMsg").style.display = "block";
                document.getElementById("checkOutMsg").style.color = "green";

                firstname.disabled = true;
                lastname.disabled = true;
                email.disabled = true;
                phone.disabled = true;
                street.disabled = true;
                postcode.disabled = true;
                city.disabled = true;

                var deleteButton = document.getElementsByClassName("deleteItem");
                for (i = 0; i < deleteButton.length; i++) {
                    if(deleteButton[i].type = "button") {
                        deleteButton[i].style.display = "none";
                    }
                }
                var updateButton = document.getElementsByClassName("updateItem");
                for (i = 0; i < updateButton.length; i++) {
                    if(updateButton[i].type = "button") {
                        updateButton[i].style.display = "none";
                    }
                }
                var checkoutQuantity = document.getElementsByClassName("checkoutQuantity");
                for (i = 0; i < checkoutQuantity.length; i++) {
                    checkoutQuantity[i].disabled = true;
                }

                document.getElementsByName("checkout")[0].style.display = "none";
                document.getElementById("sameAddress").style.display = "none";
                document.getElementById("sameAddress").innerHTML = '';
            } else if (myObj.split(' ')[0] == "lowQuantity") {
                document.getElementById("checkOutMsg").innerHTML = myObj;
                document.getElementById("checkOutMsg").style.display = "block";
                document.getElementById("checkOutMsg").style.color = "red";
                document.getElementsByClassName("deleteItem").value = "hidden";

            }
        }
    };
    xmlhttp.open("POST", "../../../server/product.php", true);
    xmlhttp.send(formData);
}
