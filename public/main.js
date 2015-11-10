$(document).ready(function() {
	autosize($('textarea'));

	$('textarea').keydown(function(e) {
		if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey && $(this).val()) {
			$(this).closest('form').submit();
		}
	});

	$('pre').click(function() {
		var range = document.createRange();

		range.setStart(this.firstChild, 19);
		range.setEnd(this.firstChild, this.firstChild.textContent.length);

		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	});

	$('select#highlight').change(function(e) {
		location.hash = $(this).val();
	});

	$(window).on('hashchange', function() {
		var value = location.hash.slice(1);

		if ($('select#highlight option[value=' + value + ']').length) {
			$('select#highlight').val(value);
		} else {
			$('select#highlight').val('');
		}
	});

	$(window).trigger('hashchange');
});
