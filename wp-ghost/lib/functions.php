<?php

function save() {
    add_post_meta($pid, 'markdown', $markdown, true) || update_post_meta($pid, 'markdown', $markdown);
}