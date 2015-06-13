<?php

$users = [
	[
		"firstname" => "Marcelo"
		, "lastname" => "Naegeler"
		, "age" => "20"
		, "_id" => "1"
	]
	, [
		"firstname" => "Cleito"
		, "lastname" => "Karloh"
		, "age" => "21"
		, "_id" => "2"
	]
	, [
		"firstname" => "Marcio"
		, "lastname" => "Gonzaga"
		, "age" => "24"
		, "_id" => "3"
	]
];

echo json_encode($users);