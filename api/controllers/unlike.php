<?php
require '../model/logs.php';
require '../model/qwitter.php';
$db = new QwitterDb($dbname, $host, $username, $port, $password); 
$db->unlike();