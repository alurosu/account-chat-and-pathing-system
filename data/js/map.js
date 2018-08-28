$(document).ready(function(){
	console.log("5. map.js: loaded");
});

function getMapContent(callback) {
	
	var dw = $(document).width();
	var dh = $(document).height();
	var content = '';
	server('map/map.php', function(data){
		console.log(data);
		var c = document.createElement('canvas'),        
			ctx = c.getContext('2d'),
			cw = c.width = dw,
			ch = c.height = dh;
		
		ctx.drawImage(document.getElementById("map"),
			data.draw.x-dw/2+32,
			data.draw.y-dh/2+32,
			dw,
			dh,
			0,
			0,
			dw,
			dh);
		
		for (row = 0; row < data.map.length; row++) {
			content += '<div class="x">';
			for (col = 0; col < data.map[row].length; col++) {
				content += '<div class="y" data-hover="on">';
					content += '<div class="data-hover-content">'+data.map[row][col].x+'-'+data.map[row][col].y+'</div>';
				content += '</div>';
			}
			content += '</div>';
		}
		
		$('.map').css({background : 'url(' + c.toDataURL() + ')'}).find('.content').html(content);
		if (callback)
			callback();
	});
}