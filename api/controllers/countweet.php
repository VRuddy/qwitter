<?php

require_once '../model/logs.php';
require_once '../model/qwitter.php';

$db = new QwitterDb($dbname, $host, $username, $port, $password);
$db->countweet();