<?php 
session_start();
include "config.php";
include "utils.php";
/* $http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "https://seminarioevaluacion.com" || $http_origin == "https://www.seminarioevaluacion.com")
{  
    header("Access-Control-Allow-Origin: $http_origin");
} */
header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: "POST, GET, OPTIONS, DELETE, PUT"');
header('Access-Control-Allow-Headers: "append,delete,entries,foreach,get,has,keys,set,values,Authorization"');
$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if(isset($_SESSION['loggedin'])){
        $userSession = array(
        'loggedin' => $_SESSION['loggedin'],
        'email' => $_SESSION['email'],
        'type' => $_SESSION['type']);
    }else{
        $userSession = array('loggedin' => 0);
    }
    echo json_encode($userSession);
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if($_POST['mode'] == "LOGIN"){
        $input = $_POST;
        $fields = getParams($input);
        $sql = "SELECT email,nivel,password FROM usuario WHERE email='".$_POST['email']."'";
        $statement = $dbConn->prepare($sql);
        $statement->execute();
        while ($row = $statement->fetch(PDO::FETCH_NUM)) {
            if ($row[2] == $_POST['password']){
                $_SESSION['loggedin'] =  1;
                $_SESSION['email'] = $row[0];
                $_SESSION['type'] = $row[1];
                echo "CORRECT";
            }
            else{
                echo "NOTLOGGED";
            }
        }
    }else if($_POST['mode'] == "LOGOUT"){
        session_destroy();
        echo "LOGGED OUT";
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
    session_destroy();
    echo "LOGGED OUT";
	header("HTTP/1.1 200 OK");
	exit();
}

header("HTTP/1.1 400 Bad Request");

?>