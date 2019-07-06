<?php

include "db_request.php";

if($_SERVER['REQUEST_METHOD']=='POST'){
    if(register()){
        header('location: ../webclient/page/registration/register.php');
    } else {
        header('location: ../webclient/page/register/error.php');
    }
}

function register(){
    $dbconnection = new db_request();

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $firstname = trim($_POST['firstname']);
    $lastname = trim($_POST['lastname']);
    $email = trim($_POST['email']);
    $street = trim($_POST['street']);
    $postcode = trim($_POST['postcode']);
    $city = trim($_POST['city']);
    $country = trim($_POST['country']);

    print_r($_POST);

}