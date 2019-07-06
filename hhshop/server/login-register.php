<?php

include "db_request.php";

if(isset($_POST['login'])){
    login();
}

if(isset($_POST['register'])){
    register();
}

if(isset($_POST['check'])){
    checkLogin();
}

if(isset($_POST['logout'])){
    logout();
}

if(isset($_POST['account'])){
    getUser();
}

if(isset($_POST['updateAccount'])){
    updateAccount();
}

if(isset($_POST['getAllUsers'])){
    getAllUsers();
}

if(isset($_POST['deleteUser'])){
    deleteUser();
}

function getAllUsers(){
    $dbconnection = new db_request();

    $users = $dbconnection->getAllUsers();

    $jsonUser = json_encode($users);

    print $jsonUser;
}

function login(){
    $dbconnection = new db_request();

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);

    session_start();

    if(!$dbconnection->login($username, $password)){
        $session = array('login' => false);
        $_SESSION['login'] = false;
    } else {
        $userID = $dbconnection->getUserId($username)['userID'];
        $isAdmin = $dbconnection->isAdmin($userID);

        $session = array('login' => true, 'userid' => $userID, 'isadmin' =>$isAdmin);
        $_SESSION['login'] = true;
        $_SESSION['userid'] = $userID;
        $_SESSION['isadmin'] = $isAdmin;
    }

    $jsonSession = json_encode($session);

    print $jsonSession;
}

function register(){
    $dbconnection = new db_request();

    $userData = new stdClass();
    $userData->username = trim($_POST['username']);
    $userData->password = trim($_POST['password']);
    $userData->firstname = trim($_POST['firstname']);
    $userData->lastname = trim($_POST['lastname']);
    $userData->email = trim($_POST['email']);
    $userData->street = trim($_POST['street']);
    $userData->postcode = trim($_POST['postcode']);
    $userData->city = trim($_POST['city']);
    $userData->country = trim($_POST['country']);
    if(isset($_POST['isadmin'])){
        $userData->isadmin = trim($_POST['isadmin']);

        session_start();

        if(!$dbconnection->register($userData)){
            $session = array('register' => false);
        } else {
            $session = array('register' => true);
        }

    } else {

        session_start();

        if (!$dbconnection->register($userData)) {
            $session = array('login' => false);
            $_SESSION['login'] = false;
        } else {
            $session = array('login' => true, 'userid' => $dbconnection->getUserId($userData->username)['userID']);
            $_SESSION['login'] = true;
            $_SESSION['userid'] = $dbconnection->getUserId($userData->username)['userID'];
        }
    }

    $jsonSession = json_encode($session);

    print $jsonSession;
}

function checkLogin(){
    session_start();

    if($_SESSION['login'] == 1){
        $session = array('login' => $_SESSION['login'], 'userid' => $_SESSION['userid'], 'isadmin' => $_SESSION['isadmin']);
    } else {
        $_SESSION['login'] = false;
        $session = array('login' => $_SESSION['login']);
    }

    $jsonSession = json_encode($session);

    print $jsonSession;
}

function logout(){
    session_start();

    if($_SESSION['login'] == 1){
        $_SESSION['login'] = false;
        $_SESSION['userid'] = null;
        $session = array('logged' => false);

        $jsonSession = json_encode($session);

        print $jsonSession;

    }
}

function getUser(){
    session_start();

    if($_SESSION['login'] == 1) {
        $dbconnection = new db_request();

        $user = $dbconnection->getUser($_SESSION['userid']);

        $jsonUser = json_encode($user);
        print $jsonUser;
    }
}

function updateAccount(){
    session_start();

    if($_SESSION['login'] == 1) {
        $dbconnection = new db_request();

        $userData = new stdClass();
        $userData->username = trim($_POST['username']);
        $userData->password = trim($_POST['password']);
        $userData->firstname = trim($_POST['firstname']);
        $userData->lastname = trim($_POST['lastname']);
        $userData->email = trim($_POST['email']);
        $userData->street = trim($_POST['street']);
        $userData->postcode = trim($_POST['postcode']);
        $userData->city = trim($_POST['city']);

        if(isset($_POST['userid'])){
            $userData->userid = trim($_POST['userid']);
            $userData->isadmin = trim($_POST['isadmin']);
            $update = $dbconnection->updateAccount($userData);
        } else {
            $userData->userid = trim($_SESSION['userid']);
            $update = $dbconnection->updateAccount($userData);
        }

        $jsonUpdate = json_encode($update);
        print $jsonUpdate;
    }
}

function deleteUser(){
    $userID= trim($_POST['userID']);

    $dbconnection = new db_request();

    $delUser = $dbconnection->deleteUser($userID);

    $json = json_encode($delUser);

    print $json;
}