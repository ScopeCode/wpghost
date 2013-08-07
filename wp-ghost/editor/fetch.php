<?php
include "../lib/functions.php";

if(!$_POST['status']) return false;

$posts = the_posts($_POST);
$results['status'] = $_POST['status'];
$results['total'] = count($posts);
$results['posts'] = $posts;

echo json_encode($results);