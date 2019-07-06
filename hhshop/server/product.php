<?php

include "db_request.php";


if(isset($_GET['displayCat'])){
    getCatProduct($_GET['category']);
}

if(isset($_GET['search'])){
    search($_GET['search']);
}

if(isset($_POST['add'])){
    addProductToCart();
}

if(isset($_POST['getAllProducts'])){
    getAll();
}

if(isset($_POST['updateProduct'])){
    updateProduct();
}

if(isset($_POST['addProduct'])){
    addProduct();
}

if(isset($_POST['deleteProduct'])){
    deleteProduct();
}

if(isset($_POST['getCart'])){
    getCart();
}

if(isset($_POST['deleteItem'])){
    deleteItem();
}

if(isset($_POST['updateItem'])){
    updateItem();
}

if(isset($_POST['fillAddress'])){
    fillAddress();
}

if(isset($_POST['checkOut'])){
    checkOut();
}

function getAll(){
    $dbconnection = new db_request();

    $products = $dbconnection->getAllProducts();

    $json = json_encode($products);

    print $json;
}

function getCatProduct($cat){

    $dbconnection = new db_request();

    $catProductArr = $dbconnection->getCategoryProducts($cat);

    $json = json_encode($catProductArr);

    print $json;
}

function searchProducts($product){
    $dbconnection = new db_request();
    foreach ($product as $productID){
            if(!empty($productID['productID'])){
                $productArr[] = $dbconnection->getProducts($productID['productID']);
            } else if(!empty($productID['catID'])){
                $productArr = $dbconnection->getCategoryProducts($productID['catID']);
            }
    }

    $json = json_encode($productArr);

    print $json;
}

function updateProduct(){
    $product = new stdClass();
    $product->productID = trim($_POST['productID']);
    $product->productName = trim($_POST['productName']);
    $product->productDesc = trim($_POST['productDesc']);
    $product->productQuant = trim($_POST['productQuant']);
    $product->productColor = trim($_POST['productColor']);
    $product->productPrice = trim($_POST['productPrice']);
    $product->productBrand = trim($_POST['productBrand']);
    $product->productCat = trim($_POST['productCat']);
    $product->productImg = trim($_POST['productImg']);

    $dbconnection = new db_request();

    $productUpdate = $dbconnection->updateProduct($product);

    $json = json_encode($productUpdate);

    print $json;
}

function addProduct(){
    $product = new stdClass();
    $product->productName = trim($_POST['productName']);
    $product->productDesc = trim($_POST['productDesc']);
    $product->productQuant = trim($_POST['productQuant']);
    $product->productColor = trim($_POST['productColor']);
    $product->productPrice = trim($_POST['productPrice']);
    $product->productBrand = trim($_POST['productBrand']);
    $product->productCat = trim($_POST['productCat']);
    $product->productImg = trim($_POST['productImg']);

    $dbconnection = new db_request();

    $addProduct = $dbconnection->addProduct($product);

    $json = json_encode($addProduct);

    print $json;
}

function deleteProduct(){
    $productID = trim($_POST['productID']);

    $dbconnection = new db_request();

    $delProduct = $dbconnection->deleteProduct($productID);

    $json = json_encode($delProduct);

    print $json;
}

function search($searchInput){
    $dbconnection = new db_request();

    $search = $dbconnection->categorySearch($searchInput);

    if(empty($search)){
        $search = $dbconnection->productSearch($searchInput);
        if(empty($search)){
            $search=null;
        }
    }

    searchProducts($search);
}

function addProductToCart(){

    $productID = trim($_POST['add']);

    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $orderInfo = $dbconnection->createOrder($_SESSION['userid'], $productID);

        if(!empty($orderInfo)) {
            $dbconnection->addTotal($orderInfo['orderID']);

            $json = json_encode($orderInfo);

            print $json;
        } else {
            return false;
        }

    } else {
        return false;
    }

}

function getCart(){
    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $orderInfo = $dbconnection->getCart($_SESSION['userid']);
        $dbconnection->addTotal($orderInfo[0]['orderID']);

        $json = json_encode($orderInfo);

        print $json;

    } else {
        return false;
    }
}

function deleteItem(){
    $orderID = trim($_POST['orderID']);
    $productID = trim($_POST['productID']);

    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $deletedOrder = $dbconnection->deleteItem($orderID, $productID);

        $json = json_encode($deletedOrder);

        print $json;

    } else {
        return false;
    }
}

function updateItem(){
    $orderID = trim($_POST['orderID']);
    $productID = trim($_POST['productID']);
    $quantity = trim($_POST['quantity']);

    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $updatedOrder = $dbconnection->updateItem($orderID, $productID, $quantity);
        $dbconnection->addTotal($orderID);

        $json = json_encode($updatedOrder);

        print $json;

    } else {
        return false;
    }
}

function fillAddress(){
    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $user = $dbconnection->getUser($_SESSION['userid']);

        if(!empty($user)){
            $json = json_encode($user);

            print $json;
        } else {
            return false;
        }
    }
}

function checkOut(){
    $user = new stdClass();
    $user->firstname = trim($_POST['firstname']);
    $user->lastname = trim($_POST['lastname']);
    $user->street = trim($_POST['street']);
    $user->email = trim($_POST['email']);
    $user->postcode = trim($_POST['postcode']);
    $user->phone = trim($_POST['phone']);
    $user->city = trim($_POST['city']);

    $dbconnection = new db_request();

    session_start();

    if(isset($_SESSION['userid'])) {
        $orderInfo = $dbconnection->getCart($_SESSION['userid']);
        $checkOut = $dbconnection->checkOut($orderInfo, $user);

        $json = json_encode($checkOut);

        print $json;
    }
}