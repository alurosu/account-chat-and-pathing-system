<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("mysql/open.php");

if (isset($_POST['pass'], $_POST['user'])) {
	$pass = md5($conn->real_escape_string($_POST['pass']));
	$sql = "SELECT id, user FROM users WHERE pass = '$pass'";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		$row = $result->fetch_assoc();
		
		if ($conn->real_escape_string($_POST['user']) == $row['user']) {
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

include("mysql/close.php");
?>
