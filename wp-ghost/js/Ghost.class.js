require.config({
	baseUrl: 'js/lib',
		shim: {
		'backbone': {
	        deps: ['underscore'],
	        exports: 'Backbone'
	    },
	    'codemirror/xml': {
	    	deps: ['codemirror']
	    },
	    'codemirror/markdown': {
	    	deps: ['codemirror']
	    }
	}
});
require(["log", "jquery-1.8.2.min", "backbone"], function() {

	var Ghost = Backbone.Model.extend({

	    constructor: function() {
	        if($('#editor').length > 0) this.editor.init();
	        if($('#posts').length > 0) this.posts.init();
	        log('*Ghost* is _ready_');
	    },

	    global: {

	        header: {
	            height: $('header').height()
	        }

	    },

	    editor: {

			// Render markdown with CodeMirror
	    	textarea: false,

	        // Startup markdown convertor
	    	converter: false,

	        init: function() {

				var _editor = this;

	        	require(["codemirror/xml", "codemirror/markdown", "showdown.min"], function() {

					_editor.textarea = CodeMirror.fromTextArea(document.getElementById('entry-markdown'), {
					  tabMode: 'indent',
					  mode: "markdown",
					  lineWrapping: !0
					});

					_editor.textarea.on("change", function() { _editor.update(); });

					require(['extensions/twitter', 'extensions/github', 'extensions/youtube'], function() {
						_editor.converter = new Showdown.converter({ extensions: ['twitter', 'github', 'youtube'] });
						_editor.update();
					});

					_editor.checkHeight();

				    $title = $('#title');

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
				        _editor.textarea.focus();
				    } else {
				        $title.focus().select();
				    }

					$('#publish').click(_editor.save);

					$(window).resize(_editor.checkHeight);
				});

	        },

	        containerHeight: function() {
	        	$container =   $('#container');
			    $editor =   $('#editor');
			    $main_height = $('main').height();
			    $header_height = $('header').height();
			    $footer_height = $('#post-tags').height();
			    $container.height($main_height - $header_height).css({'top': $header_height + 'px'});
			    
			    $('.editor .editorwrap').height($container.height() - $header_height - (25) - $('#post-title').height()).css({ top: $('#post-title').height() + 'px'});

	        },

	        countwords: function() {
	            var e = $("#entry-word-count"),
	            t = $('.CodeMirror-code').text().match(/\S+/g);
	            if(t) e.html(t.length + ' words');
	        },

	    	values: function() {
				return $('#editor').serialize();
	    	},

	        checkHeight: function() {
	            $('.editor .editorwrap').height($(window).height() - $('#post-tags').height() - $('#post-title').height() - $('header').height()).css({ top: $('#post-title').height() + 'px'});
	            Ghost.prototype.editor.containerHeight();
	        },

	        update: function() {
	        	var _ghost = Ghost.prototype;
	        	var markcode = _ghost.editor.textarea.getValue();
			    var markrender = _ghost.editor.converter.makeHtml(_ghost.editor.textarea.getValue());
			    $('#rendered-markdown').html(markrender);
			    $('#render-code').val(markcode);
			    $('#render-html').val(markrender);
			    this.countwords();
			    //resizeVideo();
	        },

	        save: function() {
	        	var _ghost = Ghost.prototype;
		    	$.post('./editor/save.php', _ghost.editor.values(), function(data) {
		    		log(data);
		    	});
		    }

	    }, // end editor

	    posts: {

	        init: function() {
	            var _this = this;
	            var _default_option_text = $($('select option')[0]).text();
	            require(["jquery.minimalect.min"], function() {
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
	            $('section').css({ 'padding-top': $('header').height() })
	        }
	    }

	});
	window.ghost = new Ghost();
});