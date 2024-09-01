<?php

require_once '../model/logs.php';
require_once '../model/qwitter.php';
ini_set('display_errors', 1);
error_reporting(E_ALL);
$db = new QwitterDb($dbname, $host, $username, $port, $password);
$db->inscription();
