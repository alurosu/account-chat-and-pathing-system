<?PHP
$servername = "localhost";
$username = "alurosuc_test";
$password = "notrealpass";
$dbname = "alurosuc_mmo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	$resultSet['error'] = "Connection failed: " . $conn->connect_error;
}
?>