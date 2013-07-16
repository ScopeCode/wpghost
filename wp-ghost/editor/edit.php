<?php
$args = array(
    'post_type' => 'post',
    'post_status' => 'any'
);
$post_id = 0;
if($_GET['edit']) {
    $post_id = $_GET['edit'];
    $args['post__in'] = array($post_id);
    $markdown = get_post_meta($post_id, 'markdown', true);
    $wp_query = new WP_Query( $args );
    $wp_post = $wp_query->post;
    if(!$markdown) $markdown = $wp_post->post_content;
}
?>
<form id="editor" autocomplete="off">
    <section id="post-title">
        <input type="text" id="title" name="title" placeholder="Your post title" autocomplete="off" value="<?php echo $wp_post->post_title?>" />
    </section>
    <section class="editor">
        <div class="editorwrap">
            <section class="entry-markdown">
                <header class="floatingheader">
                    Markdown 
                </header>
                <section class="entry-markdown-content">
                    <textarea id="entry-markdown" placeholder="Write something witty"><?php echo $markdown?></textarea>
                </section>
            </section>
            <section class="entry-preview active">
                <header class="floatingheader">
                  Preview <span id="entry-word-count" class="entry-word-count">0 words</span>
                </header>
                <section class="entry-preview-content">
                    <div id="rendered-markdown" class="rendered-markdown"></div>
                </section>
            </section>
        </div>
    </section>
    <section id="post-tags">
        <input type="hidden" name="save" value="1" />
        <input type="hidden" name="pid" value="<?php echo $post_id; ?>" />
        <input type="hidden" name="action" value="publish" />
        <div style="display: none"><textarea name="markdown" id="render-code"></textarea><textarea name="html" id="render-html"></textarea></div>
        <input type="button" id="publish" class="btn" value="Save" />
    </section>
</form>

<script src="js/codemirror.js" type="text/javascript"></script>
<script src="js/codemirror/xml.js" type="text/javascript"></script>
<script src="js/codemirror/markdown.js" type="text/javascript"></script>
<script src="js/showdown.min.js" type="text/javascript"></script>
<script src="js/video-resize.js" type="text/javascript"></script>
<script src="js/extensions/twitter.js" type="text/javascript"></script>
<script src="js/extensions/github.js" type="text/javascript"></script>
<script src="js/extensions/youtube.js" type="text/javascript"></script>

<script>
// Startup markdown convertor
var converter = new Showdown.converter({ extensions: ['twitter', 'github', 'youtube'] });

// Render markdown with CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById('entry-markdown'), {
  tabMode: 'indent',
  mode: "markdown",
  lineWrapping: !0
});

editor.on("change", updatePreview);

function updatePreview() {
    var markcode = editor.getValue();
    var markrender = converter.makeHtml(editor.getValue());
    $('#rendered-markdown').html(markrender);
    $('#render-code').val(markcode);
    $('#render-html').val(markrender);
    countWords();
    resizeVideo();
}

function countWords() {
    var e = $("#entry-word-count"),
        t = $('.CodeMirror-code').text().match(/\S+/g);
        if(t) e.html(t.length + ' words');
}

function savePost() {
    $submit = $('#publish');
    $submit.addClass('disabled').attr('disabled',true);
    $.post('./', $('#editor').serialize(),function() {
        $submit.val('Saved!');
        $submit.removeClass('disabled').attr('disabled',false).addClass('success');
        setTimeout(function() { $submit.removeClass('success').val('Save'); }, 1500);
    });
}

$(function () {
    
    $title = $('#title');
    
    updatePreview();
    
    $('#publish').click(savePost);

    // Auto scroll preview when scrolling on markdown code area    
    function t(t) {
        var n = $(t.target),
            r = $(".entry-preview-content"),
            i = $(".CodeMirror-sizer"),
            o = $(".rendered-markdown"),
            a = i.height() - n.height(),
            l = o.height() - r.height(),
            s = l / a,
            c = n.scrollTop() * s;
        r.scrollTop(c)
    }
    
    $(".CodeMirror-scroll").on("scroll", t), $(".CodeMirror-scroll").scroll(function () {
        $(".CodeMirror-scroll").scrollTop() > 10 ? $(".entry-markdown").addClass("scrolling") : $(".entry-markdown").removeClass("scrolling")
    }), $(".entry-preview-content").scroll(function () {
        $(".entry-preview-content").scrollTop() > 10 ? $(".entry-preview").addClass("scrolling") : $(".entry-preview").removeClass("scrolling")
    });
    
    
    if ($title.val()) {
        editor.focus();
    } else {
        $title.focus().select();
    }
    
});
      
</script>
