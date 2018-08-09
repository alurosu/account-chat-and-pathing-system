<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("mysql/open.php");

if (!empty($_GET['session'])) {
	$session = $conn->real_escape_string($_GET['session']);
	$sql = "SELECT 
		u.user as user, 
		s.level as level, 
		s.xp as xp, 
		s.max_xp as max_xp, 
		s.hp as hp, 
		s.max_hp as max_hp, 
		s.energy as energy, 
		s.max_energy as max_energy, 
		s.x as x, 
		s.y as y 
		FROM users u, user_stats s 
		WHERE u.id = s.user_id AND session = '$session'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		
		$resultSet = $row;
	} else $resultSet['login'] = 'true';
} else $resultSet['login'] = 'true';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("mysql/close.php");
?>
