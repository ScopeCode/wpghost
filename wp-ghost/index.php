<?php
require('../wp-blog-header.php');
require "lib/functions.php";
$redirect = $_SERVER['PHP_SELF'];
if(!$current_user->data) header('Location: ' . wp_login_url( $redirect ));

if($_POST) {
  
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
  </head>
  <body>
    <?php
    if($_GET['edit'] || $_GET['new']):
      include "editor/edit.php";
    else:
      include "editor/posts.php";
    endif;
      ?>
  </body>
</html>