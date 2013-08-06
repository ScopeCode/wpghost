<?php
function public_base_directory() 
{ 
    //get public directory structure eg "/top/second/third" 
    $public_directory = dirname($_SERVER['PHP_SELF']); 
    //place each directory into array 
    $directory_array = explode('/', $public_directory); 
    //get highest or top level in array of directory strings 
    $public_base = max($directory_array); 
    
    return $public_base; 
}
require(public_base_directory() . '/../../wp-blog-header.php');
$redirect = $_SERVER['PHP_SELF'];
if(!$current_user->data) header('Location: ' . wp_login_url( $redirect ));

$args = array(
    'post_type' => 'post',
    'post_status' => 'any'
);
if($_GET['edit']) {
    $args['post__in'] = array($_GET['edit']);
    $wp_query = new WP_Query( $args );
    $wp_post = $wp_query->post;
}