$(document).ready(function(){
	console.log("5. map.js: loaded");
	
	$('body').on('click', '.map .center', function(){
		console.log('toggle');
		$('.map .content').toggleClass('hideGrid');
	});
});

function getMapContent(callback) {
	var content = '';
	server('map/map.php', function(data){
		console.log(data);
		
		for (row = 0; row < data.map.length; row++) {
			content += '<div class="x">';
			for (col = 0; col < data.map[row].length; col++) {
				content += '<div class="y" data-hover="on">';
					content += '<div class="data-hover-content">';
						content += '<div class="header">Location: '+data.map[row][col].x+', '+data.map[row][col].y+'</div>';
					content += '</div>'
					if (data.map[row][col].center == true)
						content += '<div class="center shadow"></div>';
				content += '</div>';
			}
			content += '</div>';
		}
		
		$('.map .content').html(content);
		if (callback)
			drawMap(data.draw.x, data.draw.y, callback);
		else 
			drawMap(data.draw.x, data.draw.y);
	});
}

function drawMap(x, y, callback) {
	var dw = $(document).width();
	var dh = $(document).height();
	
	var c = document.createElement('canvas'),        
		ctx = c.getContext('2d'),
		cw = c.width = dw,
		ch = c.height = dh;
	
	var map = new Image();
	
	map.onload = function () {
		ctx.drawImage(map,
			x-dw/2+32, y-dh/2+32,
			dw, dh,
			0, 0,
			dw, dh);
		$('.map').css({background : 'url(' + c.toDataURL() + ')'});
		if (callback)
			callback();
	};
	map.src = 'data/img/map/map.png';
}