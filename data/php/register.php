<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("mysql/open.php");

if (!empty($_GET['email']) && !empty($_GET['user']) && !empty($_GET['pass']) && !empty($_GET['repass'])) {
	// check if email is valid
	$email = $conn->real_escape_string($_GET['email']);
	if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
		// check if email is registered
		$sql = "SELECT id FROM users WHERE email = '$email'";
		$result = $conn->query($sql);
		
		if ($result->num_rows == 0) {
			// check if user is registered
			$user = $conn->real_escape_string($_GET['user']);
			$sql = "SELECT id FROM users WHERE user = '$user'";
			$result = $conn->query($sql);
			
			if ($result->num_rows == 0) {
				// check if pass verification matches
				if ($_GET['pass'] == $_GET['repass']) {
					$pass = md5($conn->real_escape_string($_GET['pass']));
					$session = md5(time().mt_rand(1,1000));
					$sql = "INSERT INTO users (user, pass, email, session) VALUES ('$user', '$pass', '$email', '$session')";
					
					if ($conn->query($sql) === TRUE) {
						$resultSet['session'] = $session;
					} else $resultSet['error'] = 'Error updating record: ' . $conn->error;
				} else $resultSet['error'] = 'The password verification does not match.';
			} else $resultSet['error'] = 'This username is already registered.';
		} else $resultSet['error'] = 'This email is already registered.';
	} else $resultSet['error'] = 'Please enter a valid email address.';
} else $resultSet['error'] = 'All fields are required to create an account.';

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
else
	echo json_encode($resultSet);

include("mysql/close.php");
?>
