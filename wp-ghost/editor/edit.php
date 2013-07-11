<div id="editor">
    <section id="post-title">
        <input type="text" id="title" value="" placeholder="Your post title" autocomplete="false" />
    </section>
    <section class="editor">
        <div class="editorwrap">
            <section class="entry-markdown">
                <header class="floatingheader">
                    Markdown 
                </header>
                <section class="entry-markdown-content">
                    <textarea id="entry-markdown" placeholder="Write something witty"></textarea>
                </section>
            </section>
            <section class="entry-preview active">
                <header class="floatingheader">
                  Preview <span class="entry-word-count">0 words</span>
                </header>
                <section class="entry-preview-content">
                    <div class="rendered-markdown"></div>
                </section>
            </section>
        </div>
    </section>
    <section id="post-tags">
        <input type="button" id="publish" class="btn" value="Publish" />
    </section>
</div>
<script src="js/markdown.js" type="text/javascript"></script>
<script>
function editorHeight() {
    $('.editor .editorwrap').height($(window).height() - $('#post-tags').height() - $('#post-title').height()).css({ top: $('#post-title').height() + 'px'});
}
$(function() { editorHeight(); });
$(window).resize(editorHeight);
</script>
