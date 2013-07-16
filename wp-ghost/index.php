<?php
require('../wp-blog-header.php');
require "lib/functions.php";
$redirect = $_SERVER['PHP_SELF'];
if(!$current_user->data) header('Location: ' . wp_login_url( $redirect ));

if($_POST) {
  
  $results = array();
  
  if($_POST['fetchposts']) {
    $posts = the_posts($_POST);
    $results['status'] = $_POST['status'];
    $results['total'] = count($posts);
    $results['posts'] = $posts;
  }
  
  if($_POST['save']) {
    $params['status'] = $_POST['status'];
    if(!$params['status']) $params['status'] = "draft";
    $params['pid'] = $_POST['pid'];
    $params['title'] = $_POST['title'];
    $params['markdown'] = $_POST['markdown'];
    $params['html'] = $_POST['html'];
    save($params);
    $results['pattern_id'] = $_POST['pid'];
    $results['updated'] = true;
  }
  
  echo json_encode($results);
  return;

}

?><!DOCTYPE html>
<html>
  <head>
    <title>WPGhost</title>
    <meta charset="utf-8">
    <link href="css/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <link href="css/print.css" media="print" rel="stylesheet" type="text/css" />
    <!--[if IE]>
        <link href="css/ie.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <![endif]-->
    <script src="js/jquery-1.8.2.min.js"></script>
    <script src="js/jquery.minimalect.min.js"></script>
    <script src="js/script.js"></script>
  </head>
  <body>
    <header>
      <h1><a href="./">WPGhost</a></h1>
    </header>
    <main>
      <div id="container">
    <?php
    if($_GET['edit'] || $_GET['new']):
      include "editor/edit.php";
    else:
      include "editor/posts.php";
    endif;
      ?>
      </div>
    </main>
  </body>
</html>