/*
* Youtube extension
* example:

^^http://www.youtube.com/watch?v=Lsg84NtJbmI

* credit for this extension: http://www.akravets.com/posts/showdown-extension-for-youtube-videos
*/
window.Showdown.extensions.youtube=function(e){return[{type:"lang",regex:"\\^\\^([\\S]+)",replace:function(e,t){var n,r,i;i=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;if(i.test(t)){n=t.match(i);if(n&&n[7].length===11){r=n[7];return'<iframe  src="http://www.youtube.com/embed/'+r+'?rel=0"\nframeborder="0" allowfullscreen></iframe>'}else{return e}}else{return e}}}]}