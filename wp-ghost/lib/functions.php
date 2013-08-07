<?php
function ghost_directory() 
{ 
    //get public directory structure eg "/top/second/third" 
    $public_directory = dirname(__FILE__);
    $directory_array = explode('/wp-ghost', $public_directory); 
    return $directory_array[0]; 
}
require(ghost_directory() . '/wp-blog-header.php');
$redirect = $_SERVER['PHP_SELF'];
if(!$current_user->data) header('Location: ' . wp_login_url( $redirect ));

function the_posts($params = false) {
    
    $args = array(
        'post_type' => 'post',
        'post_status' => 'draft,publish'
    );
    if($params['status'] == 'all_posts') $params['status'] = 'publish,draft';
    if($params['status']) $args['post_status'] = $params['status'];
    if($params['total']) $args['posts_per_page'] = $params['total'];
    $wp_query = new WP_Query( $args );
    
    if ( $wp_query->have_posts() ) {
        $p = 0;
        $posts = array();
        while ( $wp_query->have_posts() ): $wp_query->the_post();
            $post_ID = get_the_ID();
            $markdown = get_post_meta($post_ID, 'markdown', true);
            $posts[$p]['ID'] = $post_ID;
            $posts[$p]['title'] = get_the_title();
            $posts[$p]['markdown'] = $markdown;
            $posts[$p]['content'] = get_the_content();
            $p++;
        endwhile;
        
        return $posts;   
    }
}

function single_post($post_id) {
    if(!$post_id) return false;
    $args = array(
        'post_type' => 'post',
        'post_status' => 'any'
    );
    if($_GET['edit']) {
        $args['post__in'] = array($post_id);
        $wp_query = new WP_Query( $args );
        $wp_post = $wp_query->post;
        return $wp_post;
    }
    return false;
}


function save($params) {
    
    global $current_user;
    
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
    
    add_post_meta($params['pid'], 'markdown', $params['markdown'], true) || update_post_meta($params['pid'], 'markdown', $params['markdown']);
}
