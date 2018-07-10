var screenWidth, screenHeight;
$(document).ready(function(){
	console.log("main.js: loaded");	
	screenWidth = $(window).width();
	screenHeight = $(window).height();
	
	// data-hover
	$('body').on('mousemove', '[data-hover]', function(event){
		var text = $(event.target).find('.data-hover-content').html();
        $('.data-hover').html(text);
		
		// adjust position according to window so that the popup never overflows it
		var left = event.pageX;
        var top = event.pageY;
		
		if (screenHeight/2 < top)
			top = top - $('.data-hover').outerHeight() - 3;
		else 
			top += 3;
		
		if (screenWidth/2 < left)
			left = left - $('.data-hover').outerWidth()- 3;
		else
			left += 3;
		
		$('.data-hover').css({top: top,left: left});
	});
	$('body').on('mouseout', '[data-hover]', function(e){
		$('.data-hover').css({top: screenWidth,left: screenHeight});
	});
	
	// binding keys
	$(document).keydown(function(e) {
		console.log("keydown: " + e.keyCode);
		
		if (!$('.chat').hasClass('selected')) {
			if(e.keyCode == 13) { // enter
				e.preventDefault();
				$('.chat').addClass('selected');
				$('.chat .send textarea').focus();
			} else if(e.keyCode == 109 || e.keyCode == 77) { // m or M
				$('.map').fadeToggle(0);
			}			
		}
	});
});

function loadPart(path, callback) {
	var response;
	$.ajax({ type: "GET",   
		url: path,
		success : function(text) {
			$('body').append(text);
			if (callback)
				callback();
		}
	});
}

function server(path, callback) {
	path = "data/php/" + path;
	$.ajax({
		url: path,
		dataType: 'jsonp',
		success: function(dataWeGotViaJsonp){
			callback(dataWeGotViaJsonp);
		},
		error: function(xhr, ajaxOptions, thrownError){
			if(xhr.status==404) {
				callback({'error':'invalid server path or offline'});
			}
		}
	});
}