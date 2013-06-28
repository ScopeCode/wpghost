<div id="editor">
    <textarea id="text-input" oninput="updateEditor()" rows="6" cols="60">Type **Markdown** here.</textarea>
    <div id="preview"> </div>
    <script src="js/markdown.js"></script>
    <script>
        function updateEditor() {
            var previewCode = markdown.toHTML( $('#text-input').val() );
            previewCode = previewCode.replace(/&amp;/gi, '&');
            $('#preview').html( previewCode );
        }
        $(function() { updateEditor(); });
    </script>
</div>