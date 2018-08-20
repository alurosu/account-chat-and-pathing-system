var screenWidth, screenHeight;
$(document).ready(function(){
	console.log("1. main.js: loaded");	
	screenWidth = $(window).width();
	screenHeight = $(window).height();
	
	// data-hover
	$('body').on('mousemove', '[data-hover]', function(event){
		var text = $(event.currentTarget).find('.data-hover-content').html();
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
		// console.log("keydown: " + e.keyCode);
		
		if (!$('.chat').hasClass('selected')) {
			if(e.keyCode == 13) { // enter
				e.preventDefault();
				$('.chat').addClass('selected');
				$('.chat .send textarea').focus();
			} else if(e.keyCode == 109 || e.keyCode == 77) { // m or M
				$('.map').toggleClass('open');
			}			
		}
	});
});

function loadPart(path, callback, into) {
	var response;
	if (!into)
		into = '.dashboard';
	$.ajax({ type: "GET",   
		url: path,
		success : function(text) {
			$(into).append(text);
			if (callback)
				callback();
		}
	});
}

function server(path, callback) {
	path = "server/" + path;
	$.ajax({
		url: path,
		dataType: 'jsonp',
		success: function(dataWeGotViaJsonp){
			if (dataWeGotViaJsonp) {
				if (dataWeGotViaJsonp.login)
					window.location.replace("account.html");
				else
					callback(dataWeGotViaJsonp);
			} else console.log("The server returns empty data.");
		},
		error: function(xhr, ajaxOptions, thrownError){
			if (xhr.readyState == 0)
				callback({'error':"Connect to the internet and try again."});
			else if (xhr.status==404)
				callback({'error':"Invalid path or the server is offline."});
			else
				callback({'error':"Error: "+thrownError});
		}
	});
}

function floatText(text, target, position) {
	c = "#FFF";
	x = $(window).width()/2;
	y = $(window).height()/2;
	
	if (target) {
		c = target.css('background-color');
		var offset = target.offset();
		x = offset.left + target.width();
		y = offset.top - target.height();
		
		if (position && position == "right") {
			x = offset.left + target.parent().width() + 5;
			y = offset.top;
		}
	}
	
	$('.data-float')
		.css({left: x+"px", top: y+"px", color: c})
		.html(text)
		.fadeIn(0)
		.animate({top: (y-20)+"px"}, function(){
			$(this).fadeOut(0);
		});
}