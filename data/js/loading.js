var totalSteps = 3;
var currentStep = 0;
$(document).ready(function(){
	console.log('Loading game:');
	doLoading();
});

function updateLoadingBar() {
	currentStep++;
	var percent = currentStep/totalSteps*100;
	$('.loading .bar div').finish().animate({ width: percent+"%"}, 0, doLoading);
}

function doLoading() {
	switch(currentStep) {
		case 0:
			$('.loading .text').html('Loading profile');
			server('profile.php?session='+localStorage.session, function(data){
				console.log(data);
				$('.profile .username').html(data.user);
				$('.profile .level').html("Level: "+data.level);
				
				$('.xp .data-hover-content').html("Experience: " + data.xp + " / " + data.max_xp + " (" + 100*data.xp/data.max_xp + "%)");
				$('.xp .bar').css({width: (100*data.xp/data.max_xp+"%")});
				
				$('.profile .stats .hp .data-hover-content').html("Health: " + data.hp + " / " + data.max_hp);
				$('.profile .stats .hp .bar').css({width: (100*data.hp/data.max_hp+"%")});
				
				$('.profile .stats .energy .data-hover-content').html("Energy: " + data.energy + " / " + data.max_energy);
				$('.profile .stats .energy .bar').css({width: (100*data.energy/data.max_energy+"%")});
				
				$('.menu .location .x span').html(data.x);
				$('.menu .location .y span').html(data.y);
				
			});
			
			updateLoadingBar();
			break;
		case 1:
			$('.loading .text').html('Loading map');
			loadPart("data/part/map.html", function(){
				getMapContent(function(){
					console.log('map loaded');
					updateLoadingBar();
				});
			}, ".dashboard > .content");
			break;
		case 2:
			$('.loading .text').html('Loading chat');
			loadPart("data/part/chat.html", function(){
				addMessage('System', 'Welcome to the game. Type /help for more chat commands.', 'system');
				console.log('chat loaded');
				updateLoadingBar();
			});
			break;
		case 3:
			$('.loading').fadeOut(0);
			break;
	}
}