<?php
include "config.php";
include "utils.php";

header('Access-Control-Allow-Origin: *');

$dbConn =  connect($db);

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    $query = "SELECT ";
    if (isset($_GET['column'])) $query = $query.$_GET['column']; else $query = $query."*";
    $query = $query." FROM ".$_GET['table'];
    if (isset($_GET['where'])) $query = $query." WHERE ".$_GET['where'];
    $sql = $dbConn->prepare($query);
    try{
      $sql->execute();
      $sql->setFetchMode(PDO::FETCH_ASSOC);
      header("HTTP/1.1 200 OK");
      echo json_encode($sql->fetchAll());
	}catch (Exception $e){
        echo $e;
    }
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST')
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
        echo $e;
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

if ($_SERVER['REQUEST_METHOD'] == 'DELETE')
{
    echo "METODO DELETE";
/*    
	$id = $_GET['id'];
  $statement = $dbConn->prepare("DELETE FROM posts where id=:id");
  $statement->bindValue(':id', $id);
  $statement->execute();
	header("HTTP/1.1 200 OK");
	exit();
	*/
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT')
{
    $input = $_PUT;
    $datosPUT = fopen("php://input", "r");
    echo $datosPUT;
    $fields = getParams($input);
    $sql = "UPDATE ".$_GET['table']."
          SET $fields
          WHERE ".$_GET['column']."=".$_GET['id'];
    /*$statement = $dbConn->prepare($sql);
    bindAllValues($statement, $input);
    $statement->execute();*/
    echo $sql;
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");

?>