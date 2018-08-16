var gmID;
var firstSpace = true;
$(document).ready(function(){
	console.log("chat.js: loaded");
	setInterval(getMessages, 1000);
	
	// highlight chat box on use
	$('body').on('click', '.chat', function(){
		$('.chat').addClass('selected');
	});
	
	// remove highlight when clicking anywhere else
	$("body").mouseup(function(e) {
        var subject = $(".chat");
        if(e.target.class != subject.attr('class') && !subject.has(e.target).length) {
			$('.chat').removeClass('selected');
        }
    });
	$("body").mouseup(function(e) {
        var subject = $(".to");
        if(e.target.class != subject.attr('class') && !subject.has(e.target).length) {
			$('.chat .to').removeClass('open');
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
		else if (show != 'private') setChatTo(show);
		
		$('.chat .messages .'+show).fadeIn(0);
	});
	
	// input interactions
	$('body').on('focus', '.chat .send textarea', function(){
		$('.chat').addClass('selected');
	});
	$('body').on('focusout', '.chat .send textarea', function(){
		$(this).val('');
	});
	$('body').on('keydown',  '.chat .send textarea', function(e) {
		if(e.keyCode == 13) { // enter
			var text = $(this).val();
			if (!/\s/.test(text)) {
				proccessFirstWord(text, e);
			}
			
			sendMessage($(this).val(), $('.chat .to .selected').attr('data-value'));
            e.preventDefault();	
		} else if (e.keyCode == 27) { // esc
            e.preventDefault();
			$(this).blur();
			$('.chat').removeClass('selected');
		} else if (e.keyCode == 32 && firstSpace) { // first time pressing space
			firstSpace = false;
			proccessFirstWord($(this).val(), e);
		} else if (e.keyCode == 8 || e.keyCode == 46) { // backspace or delete
			firstSpace = true;
		}
	});
	$('body').on('click', '.chat .send .to div', function(){
		if (!$(this).hasClass('selected')) {
			$('.chat .send .to div').removeClass('selected');
			
			var c = $(this).attr('data-value');
			$(this).addClass('selected');
			$('.chat .send textarea').focus();
			$('.chat .send').removeClass( "guild party private local global" ).addClass(c);
		} else $('.chat .send .to').addClass('open');
	});
	$('body').on('click', '.chat .send .to.open div', function(){
		$('.chat .send .to').removeClass('open');
	});
});

function setChatTo(value) {
	$('.chat .send .to div').removeClass('selected');
	$('.chat .send .to div[data-value="'+value+'"]').addClass('selected');
}

function proccessFirstWord(text, e) {
	// switch target based on first word
	if (text == '/global' || text == '/local') { // text == '/party' || text == '/guild' || 
		setChatTo(text.substr(1))
		$('.chat .send textarea').val('');
		firstSpace = true;
		if (e)
			e.preventDefault();
	} else if (text == '/help') {
		addMessage('System', 'You can use /global and /local to select different categories to write your message.', 'system');
		$('.chat .send textarea').val('');
		firstSpace = true;
		if (e)
			e.preventDefault();
	}
}

function sendMessage(msg, type) {
	if (msg) {
		var path = 'chat/addMessage.php?session='+localStorage.session
			+'&text='+encodeURIComponent($('.chat .send textarea').val())
			+'&type='+type;	
		$('.chat .send textarea').prop('disabled', true);
		server(path, function(data){
			if (!data.error) {
				addMessage(data.user, data.text, data.type);
				
				$('.chat .send textarea').val('');
				firstSpace = true;
			} else addMessage('System', data.error, 'system');
			
			$('.chat .send textarea').prop('disabled', false).focus();
		});
	}
}

function addMessage(user, text, type) {
	var message = '';
	if (type != 'global' && type != 'private' && type != 'system' && type != 'guild' && type != 'party')
		type = 'local';
	type = ' '+type;
	
	message += '<div class="message'+type+'">';
		message += '<div class="user">'+user+'</div>';
		message += '<div class="text">'+text+'</div>';
	message += '</div>';
	$('.chat .messages').prepend(message);
}

function getMessages() {
	server('chat/getMessages.php?session='+localStorage.session+'&id='+gmID, function(data){
		if (!data.error) {
			gmID = data.id;
			if (data.messages)
				for (i=0; i<data.messages.length; i++)
					addMessage(data.messages[i].user, data.messages[i].text, data.messages[i].type);
		} else addMessage('System', data.error, 'system');
	});
}
