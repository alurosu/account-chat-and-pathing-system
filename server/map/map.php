<?php
header('content-type: application/json; charset=utf-8');
header("access-control-allow-origin: *");

include("../mysql/open.php");
/*
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
$x = 49;
$y = 60;
$vision = 2;

$resultSet = [];

for ($j=$y-$vision; $j<=$y+$vision; $j++) {
	$row = [];
	for ($i=$x-$vision; $i<=$x+$vision; $i++) {
		$col = [];
		$col['x'] = $i;
		$col['y'] = $j;
		$row[] = $col;
	}
	$resultSet['map'][] = $row;
}

$resultSet['draw']['x'] = 32*$x;
$resultSet['draw']['y'] = 32*$y;

if (!empty($_GET['callback']))
	echo $_GET['callback'] . '(' .json_encode($resultSet) . ')';
	else
	echo json_encode($resultSet);

include("../mysql/close.php");
?>
