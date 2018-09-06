var graph;
var graphStart;
var graphEnd;

$(document).ready(function(){
	console.log("5. map.js: loaded");
	
	$('body').on('click', '.menu .toggle-map', function(e){
		$('.map .world').toggleClass('open');
	});
	
	$('body').on('click', '.map .center', function(e){
		$('.map .content').toggleClass('hideGrid');
		e.stopPropagation();
	});
	
	$('body').on('click', '.map .popup .close', function(){
		$('.map .popup').fadeOut(0);
	});
	
	$('body').on('click', '.map .y', function(){		
		// adjust position according to window so that the popup never overflows it
		var offset = $(this).offset();
		var top = offset.top - $(document).scrollTop()+16;
        var left = offset.left- $(document).scrollLeft();
		
		if (screenHeight/2 < top)
			top = top - $('.map .popup').outerHeight();
		
		if (screenWidth/2 > left)
			left = left - $('.map .popup').outerWidth()-8;
		else
			left += 40;
		$('.map .popup').css({top: top,left: left});
		
		$('.target').removeClass('target');
		$(this).addClass('target');
		var x = $(this).data('x')-$('.map .content').attr('data-x');
		var y = $(this).data('y')-$('.map .content').attr('data-y');
		
		graphEnd = graph.grid[y][x];
		var result = astar.search(graph, graphStart, graphEnd);
		drawMapPath(result);
	});
});

function getMapContent(callback) {
	var content = '';
	server('map/map.php?session='+localStorage.session, function(data){
		console.log(data);
		
		graph = new Graph(data.map.graph);
		graphStart = graph.grid[data.map.start.y][data.map.start.x];
		
		var minX = data.x - (data.map.graph.length-1)/2;
		var minY = data.y - (data.map.graph.length-1)/2;
		
		for (row = 0; row < data.map.graph.length; row++) {
			content += '<div class="x">';
			for (col = 0; col < data.map.graph[row].length; col++) {
				content += '<div class="y" data-x="'+(minX+col)+'" data-y="'+(minY+row)+'">';
				if (data.map.start.x == col && data.map.start.y == row) {
					content += '<div class="center shadow"></div>';
				}
				content += '</div>';
			}
			content += '</div>';
		}

		$('.map .content').attr('data-x', minX).attr('data-y', minY).html(content);
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

function drawMapPath(path) {
	var x = parseInt($('.map .content').attr('data-x'));
	var y = parseInt($('.map .content').attr('data-y'));
	var s = 0;
	$('.map .y').removeClass('path');
	for (i=0; i<path.length; i++) {
		$('.map [data-x="'+(x+path[i].y)+'"][data-y="'+(y+path[i].x)+'"]').addClass('path');
		s+= path[i].weight;
	}
	
	updateMapPopup(s);
}

function updateMapPopup(cost) {
	var x = $('.map .target').attr('data-x');
	var y = $('.map .target').attr('data-y');
	
	$('.map .popup .coord span').html(x+', '+y);
	$('.map .popup .cost span').html(cost);
	
	$('.map .popup').fadeIn(0);
}