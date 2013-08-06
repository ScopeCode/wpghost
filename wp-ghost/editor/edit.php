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

