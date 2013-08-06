var Ghost = function() {

    this.global = {

        header: {
            height: $('header').height()
        }

    },

    this.editor = {

        init: function() {

        },

    	values: function() {
    		console.log($('#editor').serialize());
			return $('#editor').serialize();
    	},

        height: function() {
            $('.editor .editorwrap').height($(window).height() - $('#post-tags').height() - $('#post-title').height() - $('header').height()).css({ top: $('#post-title').height() + 'px'});
        },

        update: function() {
        	var markcode = editor.getValue();
		    var markrender = converter.makeHtml(editor.getValue());
		    $('#rendered-markdown').html(markrender);
		    $('#render-code').val(markcode);
		    $('#render-html').val(markrender);
		    countWords();
		    resizeVideo();
        },

        save: function() {
        	var _this = this;
	    	$.post('./editor/save.php', _this.values(), function(data) {
	    		console.log(data);
	    	});
	    }

    }, // end editor

    this.posts = {

        _global: this.global,

        init: function() {
            var _this = this;
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
                        _this.list();
                    });
                }
            });
            this.list();
            this.height();
            $('#edit').click(function() {
               window.location = '?edit=' + $(this).attr('rel');
               return false; 
            });
            $(window).resize(_this.height);
        },

        list: function() {
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
        },

        height: function() {
            $post_header_height = $('#post-list hgroup').height();
            $('#posts ul, #post-content').height($('section').height() - $('header').height());
            $('#posts ul').css({ 'top': $post_header_height + 'px'});
            $('section').css({ 'padding-top': this._global.header.height })
        }
    }

    console.log('Ghost');
    this.posts.init();

}