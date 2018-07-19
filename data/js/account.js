$(document).ready(function(){
	console.log('account.js: loaded');
	var page = getParameterByName('page');
	if (page != 'register' && page != 'forgot') 
		page = 'login';
	
	$("#"+page).addClass('active');
	
	// login
	$('#login').on('click', 'button', function(){
		if (!$(this).hasClass('loading')) {
			showBtnLoader($(this));
		} else hideBtnLoader($(this));
	});
	
	// register
	$('#register').on('click', 'button', function(){
		if (!$(this).hasClass('loading')) {
			showBtnLoader($(this));
		} else hideBtnLoader($(this));
	});
});

function showBtnLoader(btn) {
	btn
		.attr('data-html',btn.html())
		.html('')
		.addClass('loading')
		.parent().find('input').prop('disabled', true);
}
function hideBtnLoader(btn) {
	btn
		.html(btn.attr('data-html'))
		.removeClass('loading')
		.parent().find('input').prop('disabled', false);
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}