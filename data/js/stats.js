$(document).ready(function(){
	console.log("3. stats.js: loaded");
	
	$('body').on('click', '.menu .toggle-stats', function(){
		$('.dashboard .content .open').not('.stats').fadeOut(0);
		$('.stats').fadeToggle(0);
	});
});