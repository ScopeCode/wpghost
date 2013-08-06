<?php
include "../lib/functions.php";
$results = array();
$results['saved'] = true;
add_post_meta($pid, 'markdown', $markdown, true) || update_post_meta($pid, 'markdown', $markdown);
echo json_encode($results);