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
