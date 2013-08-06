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
    
    $title = $('#title');

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
    });
    
    
    if ($title.val()) {
        editor.focus();
    } else {
        $title.focus().select();
    }
    
});

$(window).resize(g.editor.height);
      

function containerHeight() {
    $container =   $('#container');
    $editor =   $('#editor');
    $main_height = $('main').height();
    $header_height = $('header').height();
    $footer_height = $('#post-tags').height();
    $container.height($main_height - $header_height).css({'top': $header_height + 'px'});
    
    $('.editor .editorwrap').height($container.height() - $header_height - (25) - $('#post-title').height()).css({ top: $('#post-title').height() + 'px'});
}

$(function() { containerHeight(); });
$(window).resize(containerHeight);
