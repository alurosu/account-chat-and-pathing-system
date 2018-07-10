$(document).ready(function(){
	console.log("map.js: loaded");
	loadPart("data/part/map.html", function(){
		getMapContent();
	});
	
	$('body').on('click', '.map .options .close', function(){
		$('.map').fadeOut(0);
	});
	
	function getMapContent() {
		var content = '';
		server('map.php', function(map){
			for (row = 0; row < map.length; row++) {
				content += '<div class="x">';
				for (col = 0; col < map[row].length; col++) {
					bgx = - 64 * (map[row][col].x-1);
					bgy = - 64 * (map[row][col].y-1);
					content += '<div class="y" style="background-position: '+bgx+'px '+bgy+'px;">';
						content += '<div class="element" data-hover="on">';
							content += '<div class="data-hover-content">12 players</div>';
						content += '</div>';
					content += '</div>';
				}
				content += '</div>';
			}
			
			$('.map .content').html(content);
			console.log('map loaded');
		});
	}
});