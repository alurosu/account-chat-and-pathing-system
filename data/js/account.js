$(document).ready(function(){
	console.log('account.js: loaded');
	var page = getParameterByName('page');
	if (page != 'register' && page != 'forgot') 
		page = 'login';
	
	$("#"+page).addClass('active');
	
	// login
	$('#login').on('click', 'button', function(){
		if (!$(this).hasClass('loading')) {
			var btn = $(this);
			var path = 'login.php?user='+$('#login input[type=text]').val()+'&pass='+$('#login input[type=password]').val();
			showBtnLoader(btn);
			
			server(path, function(data){
				if (!data.error) {
					console.log(data);
					localStorage.session = data.session;
				} else {
					$('#login .error').html(data.error);
				}
				hideBtnLoader(btn);
			});
		}
	});
	
	// register
	$('#register').on('click', 'button', function(){
		if (!$(this).hasClass('loading')) {
			var btn = $(this);
			showBtnLoader(btn);
		}
	});
});

function showBtnLoader(btn) {
	btn
		.attr('data-html',btn.html())
		.html('')
		.addClass('loading')
		.parent().find('input').prop('disabled', true)
		.parent().find('.error').html('');
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