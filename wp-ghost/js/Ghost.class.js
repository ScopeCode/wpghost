var Ghost = function() {

    this.editor = {

    	values: function() {
    		console.log($('#editor').serialize());
			return $('#editor').serialize();
    	},

        height: function() {
            $('.editor .editorwrap').height($(window).height() - $('#post-tags').height() - $('#post-title').height()).css({ top: $('#post-title').height() + 'px'});
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

    } // end editor
}