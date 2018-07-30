<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (!empty($_GET['session'])) {
	$session = $conn->real_escape_string($_GET['session']);
	$sql = "SELECT s.x as x, s.y as y, u.user as user 
		FROM users u, user_stats s 
		WHERE u.id = s.user_id AND session = '$session'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$user = $row['user'];
		$guild = '';
		$party = '';
		
		if (is_numeric($_GET['id'])) {
			$id = $conn->real_escape_string($_GET['id']);
		
			$local = $row['x'].$row['y'];
			$sql = "SELECT user, text, type, target FROM chat 
				WHERE id>'$id' AND 
					(type = 'global' 
					OR type = 'local' AND target = '$local' 
					OR type = 'party' AND target = '$party' 
					OR type = 'guild' AND target = '$guild') 
					AND user != '$user' 
				ORDER BY id ASC";
			
			$result = $conn->query($sql);
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc())
					$resultSet['messages'][] = $row;
			}
		}

		$result = $conn->query("SELECT MAX(id) as id FROM chat");
		$row = $result->fetch_assoc();
		$resultSet['id'] = $row['id'];
	} else $resultSet['login'] = 'true';
} else $resultSet['login'] = 'true';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
