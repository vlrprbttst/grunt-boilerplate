<script charset="utf-8">
	var cb = function() {
		var l = document.createElement('link');
		l.rel = 'stylesheet';
		l.href = 'css/main.css';
		var h = document.getElementsByTagName('head')[0].lastChild;
		h.parentNode.insertBefore(l, h);
	};
	var raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;
	if (raf)
		raf(cb);
	else
		window.addEventListener('load', cb);
</script>
<!-- JS scripts -->
<script src="js/build/production.min.js"></script>
