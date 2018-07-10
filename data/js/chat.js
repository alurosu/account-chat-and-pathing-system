$(document).ready(function(){
	console.log("chat.js: loaded");
	loadPart("data/part/chat.html", function(){
		console.log('chat loaded');
		addMessage('System', 'Welcome to the game.', 'system');
	});
	
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
            e.preventDefault();
			if ($(this).val()) {
				addMessage('alurosu', $(this).val());
				$(this).val('');
			}				
		} else if (e.keyCode == 27) { // esc
            e.preventDefault();
			$(this).blur();
			$('.chat').removeClass('selected');
		}
	});
	
	function addMessage(user, text, c) {
		var message = '';
		if (c != 'global' && c != 'private' && c!= 'system' && c!= 'guild')
			c = 'nearby';
		c = ' '+c;
		
		message += '<div class="message'+c+'">';
			message += '<div class="user">'+user+'</div>';
			message += '<div class="text">'+text+'</div>';
		message += '</div>';
		$('.chat .messages').prepend(message);
	}
});