<?php
require_once "../model/logs.php";
require_once "../model/qwitter.php";
$dbsql = new QwitterDb($dbname, $host, $username, $port, $password);
$dbsql->searchAt();