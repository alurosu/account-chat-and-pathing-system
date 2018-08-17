$(document).ready(function(){
	console.log("2. profile.js: loaded");
	
	// test buttons - delete later
	$('.add10xp').click(function(){
		updateXP(10);
	});
	$('.add10hp').click(function(){
		updateHP(10);
	});
	$('.remove10hp').click(function(){
		updateHP(-10);
	});
	$('.add2ene').click(function(){
		updateENE(2);
	});
	$('.remove2ene').click(function(){
		updateENE(-2);
	});
});

function data2profile(data) {
	console.log(data);
	
	$('.profile .username').html(data.user);
	$('.profile .level').html("Level: "+data.level);
	
	$('.xp .bar').attr('data-xp', data.xp);
	$('.xp .bar').attr('data-mxp', data.max_xp);
	refreshXP();
	
	$('.profile .hp .bar').attr('data-hp', data.hp);
	$('.profile .hp .bar').attr('data-mhp', data.max_hp);
	refreshHP();
	
	$('.profile .energy .bar').attr('data-ene', data.energy);
	$('.profile .energy .bar').attr('data-mene', data.max_energy);
	refreshENE();
	
	$('.menu .location .x span').html(data.x);
	$('.menu .location .y span').html(data.y);
}

function updateXP(diff) {
	$('.xp .bar').attr('data-xp', parseInt($('.xp .bar').attr('data-xp')) + diff);
	refreshXP();
}

function refreshXP() {
	var xp = $('.xp .bar').attr('data-xp');
	var mxp = $('.xp .bar').attr('data-mxp');
	
	$('.xp .data-hover-content').html("Experience: " + xp + " / " + mxp + " (" + 100*xp/mxp + "%)");
	$('.xp .bar').animate({width: (100*xp/mxp+"%")});
}

function updateHP(diff) {
	var result = parseInt($('.profile .hp .bar').attr('data-hp')) + diff;
	var mhp = parseInt($('.profile .hp .bar').attr('data-mhp'));
	
	if (result<=0) 
		result = 0;
	
	if (result > mhp)
		result = mhp;
	
	$('.profile .hp .bar').attr('data-hp', result);
	refreshHP();
}

function refreshHP() {
	var hp = $('.profile .hp .bar').attr('data-hp');
	var mhp = $('.profile .hp .bar').attr('data-mhp');
	
	$('.profile .hp .data-hover-content').html("Health: " + hp + " / " + mhp);
	$('.profile .hp .bar').animate({width: (100*hp/mhp+"%")});
}

function updateENE(diff) {
	console.log('da');
	var result = parseInt($('.profile .energy .bar').attr('data-ene')) + diff;
	var mene = parseInt($('.profile .energy .bar').attr('data-mene'));
	
	if (result<=0) 
		result = 0;
	
	if (result > mene)
		result = mene;
	
	$('.profile .energy .bar').attr('data-ene', result);
	refreshENE();
}

function refreshENE() {
	var ene = $('.profile .energy .bar').attr('data-ene');
	var mene = $('.profile .energy .bar').attr('data-mene');
	
	$('.profile .energy .data-hover-content').html("Energy: " + ene + " / " + mene);
	$('.profile .energy .bar').animate({width: (100*ene/mene+"%")});
}