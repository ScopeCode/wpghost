<main>
<?php
$args = array(
    'post_type' => 'post',
    'post_status' => 'any'
);
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

    ?>
<section id="post-list">
    
    <hgroup>
        <select>
            <option>All Posts</option>
            <option value="published">Published</option>
            <option value="drafts">Drafts</option>
            <option value="scheduled">Scheduled</option>
            <option value="starred">Starred</option>
        </select>
        <div class="actions">
            <a href="./?new=yes" id="add"><i class="icon-plus"></i></a>
            <!--<a href="#" id="search-post">Search</a>-->
        </div>
    </hgroup>
    
    <div id="posts">
        <ul>
        <?php
        foreach($posts as $post):
            echo '<li><a href="#' . $post['ID'] . '"><span class="title">' . $post['title'] . '</span></a></li>';
        endforeach;
        ?>
        </ul>
    </div>
    
</section>
<section id="post-preview">
    <header>
        <div class="actions">
            <a href="#" id="edit" rel="<?php echo $posts[0]['ID']?>"><i class="icon-edit"></i></a>
        </div>
    </header>
    <div id="post-preview-content">
        <div id="post-content">
            <div id="post-content-render">
                <?php echo $posts[0]['content']?>
            </div>
        </div>
    </div>
</section>

<?php
} else {
	// no posts found
}
?>
</main>

<script>
function postHeight() {
    $('#posts ul, #post-content').height($('section').height() - $('header').height());
}
$(function() {
    postHeight();
    $('#posts ul li:first a').addClass('selected');
    $('#edit').click(function() {
       window.location = '?edit=' + $(this).attr('rel');
       return false; 
    });
});
$(window).resize(postHeight);
</script>