<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (!empty($_GET['user']) && !empty($_GET['text']) && !empty($_GET['type'])) {
	if (!empty($_GET['session'])) {
		$type = $conn->real_escape_string($_GET['type']);
		$session = $conn->real_escape_string($_GET['session']);
		
		$sql = "SELECT id, user FROM users WHERE session = '$session'";
		if ($type == 'local')
			$sql = "SELECT id, user, x, y FROM users WHERE session = '$session'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			$user = $conn->real_escape_string($_GET['user']);
			$text = $conn->real_escape_string($_GET['text']);
			$target = $conn->real_escape_string($_GET['target']);
			if ($type == 'local')
				$target = $row['x'].$row['y'];
			
			$sql = "INSERT INTO chat (user, text, type, target, time) VALUES ('$user', '$text', '$type', '$target', '".time()."')";
			if ($conn->query($sql) === TRUE) {
				$resultSet['noise'] = $session;
			} else $resultSet['error'] = 'Error updating record: ' . $conn->error;
		} else $resultSet['login'] = 'true';
	} else $resultSet['login'] = 'true';
} else $resultSet['error'] = '[user], [text] and [type] are required to send a message.';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
