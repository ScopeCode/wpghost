<?php
require "lib/functions.php";
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
  </head>
  <body>
    <header>
      <h1><a href="./">WPGhost</a></h1>
    </header>
    <main>
      <div id="container">
    <?php
    if($_GET['edit'] || $_GET['new']):
      $wp_post = single_post($_GET['edit']);
      include "editor/edit.php";
    else:
      include "editor/posts.php";
    endif;
      ?>
      </div>
    </main>
    <script data-main="js/Ghost.class.js" src="js/require.js"></script>
  </body>
</html>
