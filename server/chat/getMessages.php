<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (!empty($_GET['session'])) {
	$session = $conn->real_escape_string($_GET['session']);
	$sql = "SELECT user, x, y FROM users WHERE session = '$session'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		$user = $row['user'];
		$guild = '';
		$party = '';
		
		if (is_numeric($_GET['id'])) {
			$id = $conn->real_escape_string($_GET['id']);
		
			$local = $row['x'].$row['y'];
			$sql = "SELECT user, text, type, target FROM chat WHERE id>".$id;
			$sql .= " AND (type = 'global'";
				$sql .= " OR type = 'local' AND target = '$local'";
				$sql .= " OR type = 'party' AND target = '$party'";
				$sql .= " OR type = 'guild' AND target = '$guild')";
			$sql .= " AND user != '$user'";
			$sql .= " ORDER BY id ASC";
			
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
