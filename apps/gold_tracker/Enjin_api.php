<?php
	require('editor_cmds.php');
	database_connect();
	$url = "http://furychronicles.enjin.com"."/api/get-users"; 
	$response = file_get_contents($url);
	$json = json_decode($response, true);
	foreach ($json as $json) {
		$mysql_query = "CREATE TABLE `$json[username]` (
						`Index` int(4) NOT NULL AUTO_INCREMENT,
						`Action` varchar(1) COLLATE latin1_general_ci NOT NULL,
						`Gold` int(3) NOT NULL,
						`Silver` int(3) NOT NULL,
						`Copper` int(3) NOT NULL,
						PRIMARY KEY (`Index`))
						ENGINE=MyISAM  DEFAULT
						CHARSET=latin1
						COLLATE=latin1_general_ci
						AUTO_INCREMENT=1";
		mysql_send($mysql_query,$mysql_connect);

		$mysql_query = "INSERT INTO `$myarray[username]` VALUES(0, '', 0, 0, 0)";
		mysql_send($mysql_query,$mysql_connect);

		$mysql_query = "UPDATE `$myarray[username]` SET `Index`=0 WHERE `Index`=1 LIMIT 1";
		mysql_send($mysql_query,$mysql_connect);
  }
  mysql_close($mysql_connect);
?>