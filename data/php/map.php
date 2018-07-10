<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");
/*
include("connection_open.php");

if (isset($_GET["user"]))
	$sql = "SELECT * FROM thankyou WHERE autor = '".$_GET["user"]."' ORDER BY RAND() LIMIT 0,1";
	else
	$sql = "SELECT * FROM thankyou ORDER BY RAND() LIMIT 0,1";
	
$query = mysqli_query($con, $sql);

$resultSet = array();
while($result = mysqli_fetch_array($query))
{
    $resultSet[] = $result;
}
*/

$resultSet = [
	[[x=>1,y=>1], [x=>1,y=>2], [x=>1,y=>3]],
	[[x=>1,y=>1], [x=>1,y=>2], [x=>1,y=>3]]
];

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
	else
	echo json_encode($resultSet);

//include("connection_close.php");
?>
