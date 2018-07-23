<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");

if (!empty($_GET['pass']) && !empty($_GET['user'])) {
	$user = $conn->real_escape_string($_GET['user']);
	$sql = "SELECT id, pass FROM users WHERE user = '$user'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		
		if (md5($conn->real_escape_string($_GET['pass'])) == $row['pass']) {
			$session = md5(time().mt_rand(1,1000));
			
			$sql = "UPDATE users SET session='$session' WHERE id='".$row['id']."'";
			if ($conn->query($sql) === TRUE) {
				$resultSet['session'] = $session;
			} else $resultSet['error'] = 'Error updating record: ' . $conn->error;
		} else $resultSet['error'] = 'The username and password do not match.';
	} else $resultSet['error'] = 'The username does not exist.';
} else $resultSet['error'] = 'Please enter your username and password.';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
