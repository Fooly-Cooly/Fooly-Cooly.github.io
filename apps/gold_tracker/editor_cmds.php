<?php
  $mysql_database = "a6189725_gbank";

  function getUserName($userID)  {
	$response = file_get_contents("http://furychronicles.enjin.com/api/get-users");
	$users = json_decode($response, true);
	return $users[$userID]['username'];
  }
  
  switch ($_POST['table']) {
	case false: $mysql_table = getUserName($_GET['userid']); break;
	default: $mysql_table = $_POST['table'];
  }
    
  function database_connect() {
	global $mysql_connect, $mysql_database;
	$mysql_connect = mysql_connect("mysql4.000webhost.com","a6189725_Fury","17fury64");
	@mysql_select_db($mysql_database) or die( "Database not found.");
  }

  function mysql_send($mysql_query,$mysql_connect) {
	$mysql_result = mysql_query($mysql_query,$mysql_connect);
	@$mysql_result or die(mysql_error());
	return $mysql_result;
  }

  function read_database() {
	global $mysql_connect, $mysql_database, $mysql_table;
	
	$mysql_query  = "SHOW TABLES FROM $mysql_database";
	$mysql_result = mysql_send($mysql_query,$mysql_connect);

	while ($mysql_row = mysql_fetch_row($mysql_result)) {
		if($mysql_table == $mysql_row[0]) echo "<option selected>$mysql_row[0]";
		else echo "<option>$mysql_row[0]";
	}
  }
  
  function read_table() {
	global $mysql_connect, $mysql_table;
	$type = array("Gold","Silver","Copper");

	$mysql_query  = "SELECT * FROM `$mysql_table`";
	$mysql_result =	mysql_send($mysql_query,$mysql_connect);
	$mysql_num	  = mysql_numrows($mysql_result);

	for($i=1;$i<$mysql_num;$i++) {
		$coin[0] = mysql_result($mysql_result,$i,"Index");
		$coin[1] = mysql_result($mysql_result,$i,"Action");
		$coin[2] = mysql_result($mysql_result,$i,"Gold");
		$coin[3] = mysql_result($mysql_result,$i,"Silver");
		$coin[4] = mysql_result($mysql_result,$i,"Copper");
		echo "<tr>
				<td>$coin[1]</td>
				<td>$coin[2]</td>
				<td>$coin[3]</td>
				<td>$coin[4]</td>
				<td><button name='index' value='$coin[0]' onClick='this.form.submit();'></button></td>
			  </tr>";
	}
	for($i=0;$i<3;$i++) $total[$i] = mysql_result($mysql_result,0,$type[$i]);
	echo "<tr>
			<td>=</td>
			<td>$total[0]</td>
			<td>$total[1]</td>
			<td>$total[2]</td>
			<td></td>
		  </tr>";
  }

  function insert_row() {
	global $mysql_table, $mysql_connect;
	$type = array("Gold","Silver","Copper");
	$coin = array($_POST[gold],$_POST[silver],$_POST[copper],$_POST[action]);
		
	$mysql_query  = "INSERT INTO `$mysql_table` (Action,Gold,Silver,Copper) VALUES ('$coin[3]','$coin[0]','$coin[1]','$coin[2]')";
	mysql_send($mysql_query,$mysql_connect);
	
	$mysql_query  = "SELECT * FROM `$mysql_table` WHERE `Index` = 0";
	$mysql_result = mysql_send($mysql_query,$mysql_connect);
	
	for($i=0;$i<3;$i++) $total[$i] = mysql_result($mysql_result,0,$type[$i]);
	switch ($coin[3]) {
		case '-':
			$total[0] -= $coin[0];
			for($i=1;$i<3;$i++) {
				if ($total[$i] < $coin[$i]) {
					$total[$i-1] -= 1;
					$total[$i] = 100 - ($coin[$i] - $total[$i]);
				}
				else $total[$i] -= $coin[$i];
			}
			break;
		default:
			$total[0] += $coin[0];
			$total[1] += $coin[1];
			$total[2] += $coin[2];
			for($i=1;$i<3;$i++) {
				if ($total[$i] > 99) {
					$total[$i] -= 100;
					$total[$i-1] += 1;
				}
			}
	}
	$mysql_query  = "UPDATE `$mysql_table` SET `Gold`=$total[0], `Silver`=$total[1], `Copper`=$total[2] WHERE `Index`=0 LIMIT 1";
	mysql_send($mysql_query,$mysql_connect);
  }
  
  function delete_row() {
	global $mysql_connect, $mysql_table;
	$type = array("Index","Action","Gold","Silver","Copper");
	
	$mysql_query  = "SELECT * FROM `$mysql_table` WHERE `Index` = $_POST[index]";
	$mysql_result = mysql_send($mysql_query,$mysql_connect);
	for($i=1;$i<5;$i++) $coin[$i] = mysql_result($mysql_result,0,$type[$i]);

	$mysql_query  = "SELECT * FROM `$mysql_table` WHERE `Index` = 0";
	$mysql_result = mysql_send($mysql_query,$mysql_connect);
	for($i=2;$i<5;$i++) $total[$i] = mysql_result($mysql_result,0,$type[$i]);
	
	switch ($coin[1]) {
		case '+':
			$total[2] -= $coin[2];
			for($i=3;$i<5;$i++) {
				if ($total[$i] < $coin[$i]) {
					$total[$i-1] -= 1;
					$total[$i] = 100 - ($coin[$i] - $total[$i]);
				}
				else $total[$i] -= $coin[$i];
			}
			break;
		default:
			$total[2] += $coin[2];
			$total[3] += $coin[3];
			$total[4] += $coin[4];
			for($i=3;$i<5;$i++) {
				if ($total[$i] > 99) {
					$total[$i] -= 100;
					$total[$i-1] += 1;
				}
			}
	}
	$mysql_query = "DELETE FROM `$mysql_table` WHERE `Index` = $_POST[index]";
	mysql_send($mysql_query,$mysql_connect);
	
	$mysql_query  = "UPDATE `$mysql_table` SET `Gold`=$total[2], `Silver`=$total[3], `Copper`=$total[4] WHERE `Index`=0 LIMIT 1";
	mysql_send($mysql_query,$mysql_connect);
  }
?>