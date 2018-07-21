$(document).ready(function(){
	console.log('account.js: loaded');
	var page = getParameterByName('page');
	if (page != 'register' && page != 'forgot') 
		page = 'login';
	
	$("#"+page).addClass('active');
	$("[data-hide="+page+"]").fadeOut(0);
	// document.title = page + " MMO";
	
	// login
	$('#login').on('click', 'button', function(){
		doLogin($(this));
	});
	$('#login input[type=password]').keydown(function(e) {
		if(e.keyCode == 13) {
			doLogin($('#login button'));
			e.preventDefault();
		}
	});
	
	// register
	$('#register').on('click', 'button', function(){
		doRegister($(this));
	});
	$('#register input[type=password]').keydown(function(e) {
		if(e.keyCode == 13) {
			doRegister($('#register button'));
			e.preventDefault();
		}
	});
});

function doLogin(btn) {
	if (!btn.hasClass('loading')) {
		var path = 'login.php?user='+$('#login input[type=text]').val()+'&pass='+$('#login input[type=password]').val();
		showBtnLoader(btn);
		
		server(path, function(data){
			if (!data.error) {
				localStorage.session = data.session;
				window.location.replace("index.html");
			} else {
				$('#login .error').html(data.error);
			}
			hideBtnLoader(btn);
		});
	}
}

function doRegister(btn) {
	if (!btn.hasClass('loading')) {
		var path = 'register.php?user='+$('#register input[type=text]').val()
			+'&email='+$('#register input[type=email]').val()
			+'&pass='+$('#register input[type=password]').val()
			+'&repass='+$('#register input[type=password]').last().val();
			console.log(path);
		showBtnLoader(btn);

		server(path, function(data){
			if (!data.error) {
				localStorage.session = data.session;
				window.location.replace("index.html");
			} else {
				$('#register .error').html(data.error);
			}
			hideBtnLoader(btn);
		});
	}
}

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