<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (is_numeric($_GET['x']) && is_numeric($_GET['y'])) {
	$targetX = $conn->real_escape_string($_GET['x']);
	$targetY = $conn->real_escape_string($_GET['y']);
	if (!empty($_GET['session'])) {
		$session = $conn->real_escape_string($_GET['session']);
		$sql = "SELECT  
			s.x as x, 
			s.y as y,
			s.hp as hp, 
			s.energy as energy 
			FROM users u, user_stats s 
			WHERE u.id = s.user_id AND session = '$session'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			
			$dX = $row['x'] - $targetX;
			$dY = $row['y'] - $targetY;
			$cost = 1;
			
			if ($dX+$dY == 1 || $dX+$dY == -1) {
				$resultSet['energy'] = $row['energy'];
			} else $resultSet['error'] = "Can't move more than 1 area at a time.";
		} else $resultSet['login'] = 'true';
	} else $resultSet['login'] = 'true';
} else $resultSet['error'] = 'Target coordinates [x] and [y] are required.';
if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
	else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
