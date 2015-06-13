<?php

if($_GET['_id'] == '1') {
	$user = [
		"firstname" => "Marcelo"
		, "lastname" => "Naegeler"
		, "age" => "20"
		, "_id" => "1"
	];
} else if($_GET['_id'] == '2') {
	$user = [
		"firstname" => "Cleito"
		, "lastname" => "Karloh"
		, "age" => "21"
		, "_id" => "2"
	];
} else if($_GET['_id'] == '3') {
	$user = [
		"firstname" => "Marcio"
		, "lastname" => "Gonzaga"
		, "age" => "24"
		, "_id" => "3"
	];
}

echo json_encode($user);