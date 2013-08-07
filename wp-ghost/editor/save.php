<?php
include "../lib/functions.php";
$results = array();

$params['status'] = $_POST['status'];
if(!$params['status']) $params['status'] = "draft";
$params['pid'] = $_POST['pid'];
$params['title'] = $_POST['title'];
$params['markdown'] = $_POST['markdown'];
$params['html'] = $_POST['html'];

// global $current_user;

$post = array(
     'post_type' => 'post',
     'post_author' => $current_user->data->ID,
     'post_title' => $params['title'],
     'post_content' => $params['html'],
     'post_status' => $params['status']
 );

if($params['pid'] > 0) {
    $post['ID'] = $params['pid'];
    wp_update_post( $post );
} else {
    $params['pid'] = wp_insert_post( $post, $wp_error );
}

$results['pattern_id'] = $_POST['pid'];
$results['saved'] = true;

add_post_meta($params['pid'], 'markdown', $params['markdown'], true) || update_post_meta($params['pid'], 'markdown', $params['markdown']);

echo json_encode($results);