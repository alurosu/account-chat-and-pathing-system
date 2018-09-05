<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");
if (!empty($_GET['session'])) {
	$session = $conn->real_escape_string($_GET['session']);
	$sql = "SELECT  
		s.x as x, 
		s.y as y 
		FROM users u, user_stats s 
		WHERE u.id = s.user_id AND session = '$session'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		
		$x = $row['x'];
		$y = $row['y'];
		$vision = 9;

		$resultSet = [];

		for ($j=$y-$vision; $j<=$y+$vision; $j++) {
			$cost = [];
			for ($i=$x-$vision; $i<=$x+$vision; $i++) {
				$cost[] = $i+$j;
			}
			$resultSet['map']['graph'][] = $cost;
		}
		$resultSet['map']['start']['x'] = $resultSet['map']['start']['y'] = $vision;

		$resultSet['draw']['x'] = 32*$x;
		$resultSet['draw']['y'] = 32*$y;
		$resultSet['x'] = $x;
		$resultSet['y'] = $y;
		
	} else $resultSet['login'] = 'true';
} else $resultSet['login'] = 'true';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
	else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
