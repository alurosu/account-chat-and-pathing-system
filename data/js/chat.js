$(document).ready(function(){
	console.log("chat.js: loaded");
	
	// highlight chat box on use
	$('body').on('click', '.chat', function(){
		$('.chat').addClass('selected');
	});
	$("body").mouseup(function(e) {
		// remove highlight when clicking anywhere else
        var subject = $(".chat");
        if(e.target.class != subject.attr('class') && !subject.has(e.target).length) {
			$('.chat').removeClass('selected');
        }
    });
	
	// select what channels to show
	$('body').on('click', '.chat .filters li', function(){
		$('.chat .filters li').removeClass('selected');
		$(this).addClass('selected');
		
		var show = $(this).attr('data-type');
		$('.chat .messages .message').fadeOut(0);
		$('.chat .to').val('local');
		
		if (!show)
			show = 'message';
		else if (show != 'private') $('.chat .to').val(show);
		
		$('.chat .messages .'+show).fadeIn(0);
	});
	
	// input interactions
	$('body').on('focus', '.chat .send textarea', function(){
		$('.chat').addClass('selected');
	});
	$('body').on('focusout', '.chat .send textarea', function(){
		$(this).val('');
	});
	var firstSpace = true;
	$('body').on('keydown',  '.chat .send textarea', function(e) {
		if(e.keyCode == 13) { // enter
			var text = $(this).val();
			if (!/\s/.test(text)) {
				proccessFirstWord(text, e);
			}
			
			sendMessage($(this).val(), $('.chat .to').val());
            e.preventDefault();	
		} else if (e.keyCode == 27) { // esc
            e.preventDefault();
			$(this).blur();
			$('.chat').removeClass('selected');
		} else if (e.keyCode == 32 && firstSpace) { // first time pressing space
			firstSpace = false;
			proccessFirstWord($(this).val(), e);
		}
	});
	$('body').on('change', '.chat .send .to', function(){
		var c = $(this).val();
		$('.chat .send textarea').focus();
		$('.chat .send').removeClass( "guild party private local global" ).addClass(c);
	});
});

function proccessFirstWord(text, e) {
	// switch target based on first word
	if (text == '/party' || text == '/guild' || text == '/global' || text == '/local') {
		$('.chat .send .to').val(text.substr(1));
		$('.chat .send textarea').val('');
		firstSpace = true;
		if (e)
			e.preventDefault();
	} else if (text == '/help') {
		addMessage('System', 'You can use /global, /local, /party and /guild to select different categories to write your message.', 'system');
		$('.chat .send textarea').val('');
		firstSpace = true;
		if (e)
			e.preventDefault();
	}
}

function sendMessage(msg, type) {
	if (msg) {
		var path = 'chat/addMessage.php?session='+localStorage.session
			+'&text='+$('.chat .send textarea').val()
			+'&type='+type;	
		$('.chat .send textarea').prop('disabled', true);
		server(path, function(data){
			if (!data.error) {
				addMessage(data.user, data.text, data.type);
				
				$('.chat .send textarea').val('');
				firstSpace = true;
			} else addMessage('System', data.error, 'system');
			
			$('.chat .send textarea').prop('disabled', false)
		});
	}
}

function addMessage(user, text, type) {
	var message = '';
	if (type != 'global' && type != 'private' && type != 'system' && type != 'guild' && type != 'party')
		type = 'lotypeal';
	type = ' '+type;
	
	message += '<div class="message'+type+'">';
		message += '<div class="user">'+user+'</div>';
		message += '<div class="text">'+text+'</div>';
	message += '</div>';
	$('.chat .messages').prepend(message);
}