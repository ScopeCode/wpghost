<?php $posts = the_posts(); ?>
<section id="post-list">
    
    <hgroup>
        <select name="post-type">
            <option value="all_posts">All Posts</option>
            <option value="publish">Published</option>
            <option value="draft">Drafts</option>
            <option value="scheduled">Scheduled</option>
            <option value="starred">Starred</option>
        </select>
        <div class="actions">
            <a href="./?new=yes" id="add"><i class="icon-plus"></i></a>
        </div>
    </hgroup>
    
    <div id="posts">
        <ul>
        <?php
        if($posts):
            foreach($posts as $post):
                echo '<li><a href="#" rel="' . $post['ID'] . '"><span class="title">' . $post['title'] . '</span></a></li>';
            endforeach;
        endif;
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
            <div id="post-content-render"></div>
        </div>
    </div>
</section>

<div id="post-hidden-content">
<?php
if($posts):
    foreach($posts as $post):
        echo '<div id="post-'.$post['ID'].'">' . $post['content'] . '</div>';
    endforeach;
endif;
?>
</div>