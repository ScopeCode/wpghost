<form id="editor" autocomplete="off">
    <section id="post-title">
        <input type="text" id="title" placeholder="Your post title" autocomplete="off" value="<?php echo $wp_post->post_title?>" />
    </section>
    <section class="editor">
        <div class="editorwrap">
            <section class="entry-markdown">
                <header class="floatingheader">
                    Markdown 
                </header>
                <section class="entry-markdown-content">
                    <textarea id="entry-markdown" placeholder="Write something witty"><?php echo $wp_post->post_content?></textarea>
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
        <input type="hidden" name="pid" value="<?php echo $_GET['edit'] || "0"; ?>" />
        <input type="hidden" name="action" value="publish" />
        <div style="display: none"><textarea name="markdown" id="render-code"></textarea><textarea name="html" id="render-html"></textarea></div>
        <input type="button" id="publish" class="btn" value="Publish" />
    </section>
</form>

<script src="js/Ghost.class.js" type="text/javascript"></script>
<script src="js/codemirror.js" type="text/javascript"></script>
<script src="js/codemirror/xml.js" type="text/javascript"></script>
<script src="js/codemirror/markdown.js" type="text/javascript"></script>
<script src="js/showdown.min.js" type="text/javascript"></script>
<script src="js/video-resize.js" type="text/javascript"></script>
<script src="js/extensions/twitter.js" type="text/javascript"></script>
<script src="js/extensions/github.js" type="text/javascript"></script>
<script src="js/extensions/youtube.js" type="text/javascript"></script>

<script>var g = new Ghost;

// Startup markdown convertor
var converter = new Showdown.converter({ extensions: ['twitter', 'github', 'youtube'] });

// Render markdown with CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById('entry-markdown'), {
  tabMode: 'indent',
  mode: "markdown",
  lineWrapping: !0
});

editor.on("change", g.editor.update);

function countWords() {
    var e = $("#entry-word-count"),
        t = $('.CodeMirror-code').text().match(/\S+/g);
        if(t) e.html(t.length + ' words');
}

$(function () {
    
    g.editor.height();
    g.editor.update();
    
    $('#publish').click(g.editor.save);

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
    })
});

$(window).resize(g.editor.height);
      
</script>
