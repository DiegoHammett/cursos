<?php
include "config.php";
include "utils.php";

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");

$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $query = "SELECT ";
    if (isset($_GET['column'])) $query = $query.$_GET['column']; else $query = $query."*";
    $query = $query." FROM ".$_GET['table'];
    if (isset($_GET['where'])) $query = $query." WHERE ".$_GET['where'];
    if (isset($_GET['extra'])) $query = $query." ".$_GET['extra'];
    $sql = $dbConn->prepare($query);
    try{
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
	}catch (Exception $e){
        $arr = array('error' => $e);
        echo json_encode($arr);
    }
    exit();
}

elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $input = $_POST;
    $fields = getParams($input);
    
    if($_GET['mode'] == "insert"){
        $sql = "INSERT INTO ".$_GET['table']." SET $fields";
        $statement = $dbConn->prepare($sql);
    }else if($_GET['mode'] == "update"){
        $sql = "UPDATE ".$_GET['table']." SET $fields WHERE ".$_GET['id']."=".$_GET['condition'];
        $statement = $dbConn->prepare($sql);
    }else echo "NO MODE";
    bindAllValues($statement, $input);
    try{
        $statement->execute();
        $sql = $dbConn->prepare("SELECT @@IDENTITY as ID");
        $sql->execute();
        $row = $sql->fetch(PDO::FETCH_NUM);
        $IDINSERTED = json_encode($row[0]);
    }catch (Exception $e){
        $arr = array('error' => $e);
        echo json_encode($arr);
    }
    foreach($_FILES as $param => $value)
    {
        move_uploaded_file($_FILES[$param]['tmp_name'], "./docs/".$_FILES[$param]['name']);
    }
    $arr = array('status' => 'OK','id' => $IDINSERTED);
    echo json_encode($arr);
    header("HTTP/1.1 200 OK");
    exit();
}

elseif ($_SERVER['REQUEST_METHOD'] == "DELETE")
{
    $query = "DELETE FROM ".$_GET['table']." WHERE id=".$_GET['id'];
    $sql = $dbConn->prepare($query);
    try{
        $sql->execute();
        $arr = array('status' => 'OK');
        echo json_encode($arr);
    }catch (Exception $e){
        $arr = array('error' => $e);
        echo json_encode($arr);
    }
    header("HTTP/1.1 200 OK");
    exit();
}

elseif ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    echo "PUT";
    header("HTTP/1.1 200 OK");
    exit();
    /*$input = $_PUT;
    $datosPUT = fopen("php://input", "r");
    echo $datosPUT;
    $fields = getParams($input);
    $sql = "UPDATE ".$_GET['table']."
          SET $fields
          WHERE ".$_GET['column']."=".$_GET['id'];
    $statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();
    echo $sql;
    header("HTTP/1.1 200 OK");
    exit();*/
}

?>