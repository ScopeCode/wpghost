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

<script>
function postList() {
    $('#posts ul li:first a').addClass('selected');
    $('#post-content-render').empty().html($('#post-hidden-content>div').html());
    $('#posts ul li a').unbind('click').click(function() {
       var _this = $(this);
       var _this_id = _this.attr('rel');
       $('#posts ul li a').removeClass('selected');
       _this.addClass('selected');
       $('#edit').attr('rel', _this_id);
       $('#post-content-render').html($('#post-' + _this_id).html());
       return false; 
    });
}
function postHeight() {
    $post_header_height = $('#post-list hgroup').height();
    $('#posts ul, #post-content').height($('section').height() - $('header').height());
    $('#posts ul').css({ 'top': $post_header_height + 'px'});
}
$(function() {
    var _default_option_text = $($('select option')[0]).text();
    $("select").minimalect({
        placeholder: _default_option_text,
        onchange: function(value,text) {
            $.post('./', 'fetchposts=1&status=' + value, function(data) {
                var results = $.parseJSON(data);
                var resultHTML = "", resultList = "";
                if (results.posts) {
                    $.each(results.posts, function(index, post) {
                        resultHTML += '<div id="post-'+post['ID']+'">'+post['content']+'</div>';
                        resultList += '<li><a href="#" rel="'+post['ID']+'"><span class="title">'+post['title']+'</span></a></li>';
                    });
                }
                $('#post-hidden-content').html(resultHTML);
                $('#posts ul').html(resultList);
                postList();
                //console.log(results);
            });
        }
    });
    postHeight();
    postList();
    $('#edit').click(function() {
       window.location = '?edit=' + $(this).attr('rel');
       return false; 
    });
});
$(window).resize(postHeight);
</script>