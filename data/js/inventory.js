$(document).ready(function(){
	console.log("4. inventory.js: loaded");
	
	$('body').on('click', '.menu .toggle-inventory', function(){
		$('.dashboard .content .open').not('.inventory').removeClass('open');
		$('.inventory').toggleClass('open');
	});
});