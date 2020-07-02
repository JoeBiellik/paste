/* eslint-env browser */
/* global $ autosize */

$(function() {
	if (localStorage.getItem('expire-value') != null) $('input#expire').val(localStorage.getItem('expire-value'));
	if (localStorage.getItem('expire-multiplier') != null) $('#multiplier').val(localStorage.getItem('expire-multiplier'));

	$.fn.selectpicker.Constructor.BootstrapVersion = '4';

	autosize($('textarea'));

	$('select#highlight').removeClass('custom-select');
	$('input#expire').removeClass('mr-3');

	$('select#highlight').selectpicker();

	$('input#expire').TouchSpin({
		min: 1,
		max: 999,
		buttondown_class: 'btn text-dark border-gray',
		buttonup_class: 'btn text-dark border-gray'
	});

	$('textarea').on('keydown', function(e) {
		if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey && $(this).val()) {
			$(this).closest('form').submit();
		}
	});

	$('input#expire').on('change', function(e) {
		var value = $(e.target).val();

		$('#multiplier option').text(function(_, t) {
			var plural = t.substring(t.length - 1) == 's';

			if (value > 1) {
				if (!plural) {
					return t + 's';
				}
			} else {
				if (plural) {
					return t.slice(0, -1);
				}
			}

			return t;
		});

		localStorage.setItem('expire-value', value);
	});

	$('#multiplier').on('change', function(e) {
		localStorage.setItem('expire-multiplier', $(e.target).val());
	});

	$('select#highlight').on('change', function() {
		if ($(this).val() == '') {
			history.pushState({}, '', '/');
		} else {
			location.hash = $(this).val();
		}
	});

	$(window).on('hashchange', function() {
		var value = location.hash.slice(1);

		if (value && $('select#highlight option[value=' + value + ']').length) {
			$('select#highlight').selectpicker('val', value);
		} else {
			$('select#highlight').selectpicker('val', '');
		}
	});

	$(window).trigger('hashchange');
	$('input#expire').trigger('change');
});
