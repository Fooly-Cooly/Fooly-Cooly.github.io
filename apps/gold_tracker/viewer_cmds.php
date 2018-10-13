<?php
  function getUserName($userID)  {
	$response = file_get_contents("http://furychronicles.enjin.com/api/get-users");
	$users = json_decode($response, true);
	return $users[$userID]['username'];
  }
  
  function check_permission($userID) {
    $url = "http://furychronicles.enjin.com/api/get-tags/user/$userID";
  	$response = file_get_contents($url);
	$tags = json_decode($response, true);
	if($tags['460983'] == "Treasurer") {
		echo "<tr>
				<td colspan='4'>
					<a href='editor.php?userid=$userID'>Edit</a>
				</td>
			  </tr>";
	}
  }
    
  function load_vault() {
	mysql_connect("mysql4.000webhost.com","a6189725_Fury","17fury64");
	@mysql_select_db("a6189725_gbank") or die( "Database not found.");
	$mysql_table = getUserName($_GET['userid']);	
	$mysql_query = "SELECT * FROM `$mysql_table`";
	$mysql_result = mysql_query($mysql_query);
	@$mysql_result or die(mysql_error());
	$mysql_num = mysql_numrows($mysql_result);
	for($i=0;$i<$mysql_num;$i++) {
		$col[0] = mysql_result($mysql_result,$i,"Index");
		$col[1] = mysql_result($mysql_result,$i,"Action");
		$col[2] = mysql_result($mysql_result,$i,"Gold");
		$col[3] = mysql_result($mysql_result,$i,"Silver");
		$col[4] = mysql_result($mysql_result,$i,"Copper");
		if($i == 0) {
			$total = array($col[2],$col[3],$col[4]);
			continue;
		}
		echo "<tr>
				<td>$col[1]</td>
				<td>$col[2]</td>
				<td>$col[3]</td>
				<td>$col[4]</td>
			  </tr>";
	}
	echo "<tr>
			<td>=</td>
			<td>$total[0]</td>
			<td>$total[1]</td>
			<td>$total[2]</td>
		  </tr>";
	mysql_close();
  }
?>