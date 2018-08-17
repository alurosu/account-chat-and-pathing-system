$(document).ready(function(){
	console.log("3. stats.js: loaded");
	
	$('body').on('click', '.menu .toggle-stats', function(){
		$('.dashboard .content .open').not('.stats').removeClass('open');
		$('.stats').toggleClass('open');
	});
});