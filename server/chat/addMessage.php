<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (!empty($_GET['text']) && !empty($_GET['type'])) {
	if (!empty($_GET['session'])) {
		$type = $conn->real_escape_string($_GET['type']);
		$session = $conn->real_escape_string($_GET['session']);
		
		$sql = "SELECT user FROM users WHERE session = '$session'";
		if ($type == 'local')
			$sql = "SELECT s.x as x, s.y as y, u.user as user 
				FROM users u, user_stats s 
				WHERE u.id = s.user_id AND session = '$session'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$text = $conn->real_escape_string($_GET['text']);
			
			$user = $row['user'];
			$target = '';
			if ($type == 'local')
				$target = $row['x'].$row['y'];
			
			$sql = "DELETE FROM chat WHERE time < ".(time()-60)."; ";
			$sql .= "INSERT INTO chat (user, text, type, target, time) VALUES ('$user', '$text', '$type', '$target', '".time()."')";
			if ($conn->multi_query($sql) === TRUE) {
				$resultSet['user'] = $user;
				$resultSet['text'] = $text;
				$resultSet['type'] = $type;
				$resultSet['target'] = $target;
			} else $resultSet['error'] = ' Error updating record: ' . $conn->error;
		} else $resultSet['login'] = 'true';
	} else $resultSet['login'] = 'true';
} else $resultSet['error'] = '[user], [text] and [type] are required to send a message.';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
