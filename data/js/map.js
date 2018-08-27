$(document).ready(function(){
	console.log("5. map.js: loaded");
	
	$('body').on('click', '.map .options .close', function(){
		$('.map').removeClass('open');
	});
	
	$('body').on('click', '.menu .toggle-map', function(){
		$('.dashboard .content .open').not('.map').removeClass('open');
		$('.map').toggleClass('open');
		getMapContent();
	});
});

function getMapContent(callback) {
	var content = '';
	server('map/map.php', function(data){
		console.log(data);
		var c = document.createElement('canvas'),        
			ctx = c.getContext('2d'),
			cw = c.width = data.draw.width,
			ch = c.height = data.draw.width;
		
		ctx.drawImage(document.getElementById("map"),
			data.draw.x,
			data.draw.y,
			data.draw.width,
			data.draw.width,
			0,
			0,
			data.draw.width,
			data.draw.width);
		
		for (row = 0; row < data.map.length; row++) {
			content += '<div class="x">';
			for (col = 0; col < data.map[row].length; col++) {
				content += '<div class="y" data-hover="on">';
					content += '<div class="data-hover-content">'+data.map[row][col].x+'-'+data.map[row][col].y+'</div>';
				content += '</div>';
			}
			content += '</div>';
		}
		
		$('.map .content').css({background : 'url(' + c.toDataURL() + ')'}).html(content);
		if (callback)
			callback();
	});
}